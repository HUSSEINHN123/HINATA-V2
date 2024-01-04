const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "هيناتا",
  version: "1",
  usePrefix: true,
  hasPermission: 0,
  credits: "Arjhil",
  description: "قم بسؤال هيناتا و هي ستجيبك",
  usePrefix: true,
  commandCategory: "الذكاء الإصطناعي",
  usages: "<إسأل>",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, type, messageReply, body } = event;

  let question = "";

  if (type === "message_reply" && messageReply.attachments[0]?.type === "photo") {
    const attachment = messageReply.attachments[0];
    const imageURL = attachment.url;
    question = await convertImageToText(imageURL);

    if (!question) {
      api.sendMessage(
        " ❌ | فشل تحويل الصورة إلى نص .",
        threadID,
        messageID
      );
      return;
    }
  } else {
    question = body.slice(5).trim();

    if (!question) {
      api.sendMessage(" ⚠️ | أرجوك قم بإدخال سؤال من أجل البحث عن إجابة", threadID, messageID);
      return;
    }
  }

  api.sendMessage(" ⏱️ | أبحث عن إجابة أرجوك إنتظر...🔎", threadID, messageID);

  try {
    const res = await axios.get(
      `https://bard-ai.arjhilbard.repl.co/bard?ask=${encodeURIComponent(question)}`
    );

    const respond = res.data.message;
    const imageUrls = res.data.imageUrls;

    if (Array.isArray(imageUrls) && imageUrls.length > 0) {
      const attachments = [];

      if (!fs.existsSync("cache")) {
        fs.mkdirSync("cache");
      }

      for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        const imagePath = `cache/image${i + 1}.png`;

        try {
          const imageResponse = await axios.get(url, { responseType: "arraybuffer" });
          fs.writeFileSync(imagePath, imageResponse.data);

          attachments.push(fs.createReadStream(imagePath));
        } catch (error) {
          console.error("حدث خطأ أثناء تحميل الصورة", error);
        }
      }

      api.sendMessage(
        {
          attachment: attachments,
          body: respond,
        },
        threadID,
        messageID
      );
    } else {
      api.sendMessage(respond, threadID, messageID);
    }
  } catch (error) {
    console.error("حدث خطأ أثناء جلب البيانات من واجهة برمجة التطبيقات ل بارد:", error);
    api.sendMessage(" ❌ |حدث خطأ أثناء جلب البيانات. الرجاء معاودة المحاولة في وقت لاحق.", threadID, messageID);
  }
};

async function convertImageToText(imageURL) {
  const response = await axios.get(
    `https://bard-ai.arjhilbard.repl.co/api/other/img2text?input=${encodeURIComponent(imageURL)}`
  );
  return response.data.extractedText;
}