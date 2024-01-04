const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
  name: "إنستغرام",
  version: "1.0.",
  hasPermssion: 0,
  credits: "shiki",
  description: "قم بتحميل فيديوهات من إنستغرام",
  commandCategory: "وسائط",
  usages: "رابط إنستغرام",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args }) {
  const link = args[0];

  if (!link || !link.startsWith("https://www.instagram.com/")) {
    api.sendMessage("يرجى تقديم رابط صالح لأنستغرام.", event.threadID, event.messageID);
    return;
  }

  api.sendMessage(" ⏱️ | جاري تحميل الفيديو المرحو الإنتظار بضع ثواني...", event.threadID, event.messageID);

  try {
    const response = await axios.get(`https://instagramdl.hayih59124.repl.co/instagram?url=${encodeURIComponent(link)}`);
    const result = response.data.result[0];
    const videoURL = result._url;
    const path = __dirname + `/cache/instagram_video.mp4`;

    const videoData = (await axios.get(videoURL, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(path, Buffer.from(videoData, 'utf-8'));

    api.sendMessage({
      body: "إليك الفيديو الخاص بك\n\nإستمتع🥳",
      attachment: fs.createReadStream(path)
    }, event.threadID, () => fs.unlinkSync(path), event.messageID);
  } catch (error) {
    api.sendMessage(`حدث خطأ أثناء جلب فيديو إنستغرام: ${error}`, event.threadID, event.messageID);
  }
};