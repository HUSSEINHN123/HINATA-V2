const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
  name: "ميتا",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "JARiF",
  description: "Meta AI Image Generator.",
  commandCategory: "الذكاء الإصطناعي",
  cooldowns: 5
};

module.exports.run = async function ({ args, event, api }) {
  try {
    const prompt = args.join(" ");

    const waitingMessage = await api.sendMessage(" ⏱️ | أرجوك إنتظر...", event.threadID);

    const url = `https://project-meta.onrender.com/meta?prompt=${encodeURIComponent(prompt)}`;

    const response = await axios.get(url);
    const data = response.data;

    if (!data || data.length === 0) {
      throw new Error(" ⛔ |فارغ أو إجابات مجهولة.");
    }

    const imgData = [];

    for (let i = 0; i < data.length; i++) {
      const imgUrl = data[i];
      const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
      const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
      await fs.outputFile(imgPath, imgResponse.data);
      imgData.push(fs.createReadStream(imgPath));
    }

    await api.sendMessage({
      body: `✅ | تم التوليد بنجاح`,
      attachment: imgData
    }, event.threadID);

  } catch (error) {
    console.error(error);
    await api.sendMessage(` ❌ |التوليد فشل مع أخطاء: ${error.message}`, event.threadID);
  }
};