const axios = require("axios");
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "ألبوم",
  version: "1.0.0",
  hasPermssion: 0, //1 admin default note: you make it 0 
  credits: ":EASY API",
  description: "",
  usePrefix: false,
  commandCategory: "خلفيات",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args, commandModules, prefix }) {
  const query = args.join(" ");

  if (!query) {
    api.sendMessage(" ⚠️ |أرجوك قم بإدخال إسم للصورة", event.threadID, event.messageID);
    return;
  }

  api.sendMessage(" ⏱️ | جاري البحث عن الصور ، المرجو الإنتظار ......", event.threadID).then(async (messageInfo) => {
    try {
      const res = await axios.get(`https://api.easy0.repl.co/api/zedge?s=${query}`);
      const imgUrls = res.data.data;
      const imgCount = imgUrls.length;

      if (imgCount === 0) {
        api.sendMessage(` ❌ | لم يتم أيجاد أي صور ل "${query}"`, event.threadID, event.messageID);
        return;
      }

      const randomIndices = getRandomIndices(imgCount, Math.min(10, imgCount));
      const attachments = [];

      for (let i = 0; i < randomIndices.length; i++) {
        const index = randomIndices[i];
        const url = imgUrls[index];
        const imageResponse = await axios.get(url, { responseType: "arraybuffer" });
        const imagePath = path.join(__dirname, 'cache', `zedge_${i}.png`);
        fs.writeFileSync(imagePath, Buffer.from(imageResponse.data));
        attachments.push(fs.createReadStream(imagePath));
      }

      api.sendMessage({
        body: ` ✅ | تفضل إليك  ${imgCount} صور ل ${query}`,
        attachment: attachments,
      }, event.threadID, (err, msgInfo) => {
        if (!err) {
          api.unsendMessage(messageInfo.messageID);
        } else {
          console.error(err);
        }
      });
    } catch (error) {
      console.error(error);
    }
  });
};
function getRandomIndices(max, count) {
  const indices = Array.from({ length: max }, (_, i) => i);
  for (let i = max - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count);
}