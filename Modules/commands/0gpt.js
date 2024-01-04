const axios = require('axios');
const fs = require('fs');
const gtts = require('gtts');

module.exports.config = {
  name: "هيناتا",
  version: "2.1.3",
  hasPermission: 0,
  credits: "Hazeyy",
  description: "( يقوم بالإجابة على الأسئلة و هو يدعم الرد على الصور مع إجابات صوتية )",
  commandCategory: "الذكاء الإصطناعي",
  usages: "( هيناتا)",
  cooldowns: 3,
};

function formatFont(text) {
  const fontMapping = {
    a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂", j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆",
    n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",
    A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬",
    N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹"
  };

  let formattedText = "";
  for (const char of text) {
    if (char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }

  return formattedText;
}

async function convertImageToText(imageURL) {
  try {
    const response = await axios.get(`https://hazeyy-api-img2text.kyrinwu.repl.co/api/recognition/image2text?input=${encodeURIComponent(imageURL)}`);
    return response.data.extractedText;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports.handleEvent = async function ({ api, event }) {
  if (!(event.body.startsWith("هيوجا") || event.body.startsWith("Demo"))) return;

  const { threadID, messageID, type, messageReply, body } = event;

  let question = '';
  let hasImage = false;

  if (type === 'message_reply') {
    if (messageReply?.attachments[0]?.type === 'photo') {
      hasImage = true;
      const attachment = messageReply.attachments[0];
      const imageURL = attachment.url;
      question = await convertImageToText(imageURL);

      if (!question) {
        api.sendMessage('❗ فشل معالجة الصورة المرجو إرسال صورة أوضح.', threadID, messageID);
        return;
      }
    } else {
      question = messageReply?.body?.trim() || '';
    }
  } else { 
    question = body.slice(5).trim();
  }

  if (!question) {
    api.sendMessage("مرحبا أنا هيناتا. \n\nكيف يمكنني مساعدتك اليوم ؟", event.threadID);
    return;
  }

  try {
    api.sendTypingIndicator(event.threadID);

    api.sendMessage('🗨️ | جاري التفكير يرجى الإنتظار......', event.threadID);

    const response = await axios.get(`https://hazeyy-gpt4-api.kyrinwu.repl.co/api/gpt4/v-3beta?content=${encodeURIComponent(question)}`);

    const reply = response.data.reply;

    if (reply.trim() !== "") {
      const formattedReply = formatFont(reply);

      const gttsService = new gtts(formattedReply, 'ar');
      gttsService.save('gpt4_response.mp3', function () {
        api.sendMessage(`🤖هيناتا\n\n🗨️: ${formattedReply}\n\n𝖨 آمل أن تساعد ✨`, event.threadID);

        api.sendMessage(
          {
            attachment: fs.createReadStream('gpt4_response.mp3'),
            body: '🔊 ريم ( الصوت )',
            mentions: [
              {
                tag: 'GPT-4 Response',
                id: api.getCurrentUserID(),
              },
            ],
          },
          event.threadID
        );
      });
    } else {
      api.sendMessage("🤖 فشل البحث عن سؤوالك و الإجابة عنه المرحو المحاولة لاحقا.", event.threadID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("🔴 حدث خطأ أعد المحاولة لاحقا.", event.threadID);
  }
};

module.exports.run = async function ({ api, event }) {};