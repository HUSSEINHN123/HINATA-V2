const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
  name: "خلفيات",
  credits: "kshitiz | Cyril Matt",
  version: "2.0",
  cooldowns: 5,
  hasPermission: 0,
  description: "قم بالبحث عن صور خلفيات معتمدا على كلمات البحث.",
  usePrefix: false,
  commandCategory: "صور",
  usage: "{p}خلفيات <كلمة> [الكمية]\nمثال: {p}خلفيات ناروتو 3",
};

module.exports.run = async function ({ api, event, args }) {
  if (args.length < 1) {
    api.sendMessage(' ⚠️ |أرحوك قم بإدخال كلمة البحث من أجل العثور على الصور.', event.threadID, event.messageID);
    return;
  }

  const keyword = args[0];
  let amount = args[1] || 1;

  amount = parseInt(amount);

  if (isNaN(amount) || amount <= 0) {
    api.sendMessage(' ⚠️ |يرجى تقديم عدد صحيح موجب صالح للبحث.', event.threadID, event.messageID);
    return;
  }

  try {
    const response = await axios.get(`https://antr4x.onrender.com/get/searchwallpaper?keyword=${keyword}`);

    if (response.data.status && response.data.img.length > 0) {
      amount = Math.min(amount, response.data.img.length);
      const imgData = [];

      for (let i = 0; i < amount; i++) {
        const image = response.data.img[i];
        const imageName = `wallpaper_${i + 1}.jpg`;
        const imagePath = path.join('cache', imageName);

        try {
          const imageResponse = await axios.get(image, { responseType: 'arraybuffer' });
          await fs.writeFile(imagePath, Buffer.from(imageResponse.data, 'binary'));
          imgData.push(imagePath);
        } catch (error) {
          console.error("Error downloading image:", error);
        }
      }

      api.sendMessage({
        attachment: imgData.map(imgPath => fs.createReadStream(imgPath)),
        body: `صور خلفيات معتمدة على  الكلمة  [${keyword}] 🌟`,
      }, event.threadID, (err) => {
        if (err) console.error("Error sending images:", err);

        imgData.forEach(imgPath => {
          fs.unlinkSync(imgPath);
        });
      });
    } else {
      api.sendMessage(' ❌ |لم يتم العثور على أي خلفيات .', event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('Error fetching wallpaper images:', error);
    api.sendMessage(' ❌ |حدث خطأ أثناء جلب صور الخلفية.', event.threadID, event.messageID);
  }
};