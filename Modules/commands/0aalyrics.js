const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
  name: "كلمات",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Rishad",
  description: "جلب كلمات الأغنية",
  commandCategory: "وسائط",
  usages: "كلمات أغنية إسمها",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const query = args.join(" ");
    const response = await axios.get(`https://for-devs.rishadapis.repl.co/api/lyrics/get?apikey=fuck&query=${encodeURIComponent(query)}`);
    const data = response.data;

    const imageResponse = await axios.get(data.image, { responseType: 'arraybuffer' });
    fs.writeFileSync(__dirname + '/cache/lyrics.png', Buffer.from(imageResponse.data));

    const formattedResponse = `❏ العنوان📙: ${data.title}\n❏ الفنان🎭: ${data.artist}\n\n❏ الكلمات:\n\n${data.lyrics}`;

    return api.sendMessage({
      body: formattedResponse,
      attachment: fs.createReadStream(__dirname + '/cache/lyrics.png')
    }, event.threadID);
  } catch (err) {
    console.error(err);
    return api.sendMessage(' ❌ | لم أتمكن من جلب الكلمات 😞\nأشعر أنني فاشلة حقا ومحرجة منكم 🥺', event.threadID);
  }
};