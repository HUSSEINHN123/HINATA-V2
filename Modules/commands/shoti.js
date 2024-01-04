module.exports.config = {
  name: "شوتي",
  version: "1.0.0",
  credits: "shoti-api",
  description: "إنشاء مقاطع فيديو عشوائية لفتاة من تيك توك",
  hasPermssion: 0,
  commandCategory: "متعة",
  usage: "[شوتي]",
  cooldowns: 5,
  dependencies: [],
  usePrefix: "true",
};

module.exports.run = async function ({ api, event }) {
  try {
    const axios = require("axios");
    const request = require("request");
    const fs = require("fs");
    let response = await axios.post(
      "https://api--v1-shoti.vercel.app/api/v1/get",
      {
        apikey: "$shoti-1hef0rl2fhjok3lro",
      },
    );
    var file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");
    var rqs = request(encodeURI(response.data.data.url));
    rqs.pipe(file);
    file.on("finish", () => {
      return api.sendMessage(
        {
          body: `@${response.data.data.user.username}`,
          attachment: fs.createReadStream(__dirname + "/cache/shoti.mp4"),
        },
        event.threadID,
        event.messageID,
      );
    });
    file.on("error", (err) => {
      api.sendMessage(` ❌ | شوتي خطأ: ${err}`, event.threadID, event.messageID);
    });
  } catch (error) {
    api.sendMessage(
      " ❌ |حدث خطأ أثناء إنشاء الفيديو:" + error,
      event.threadID,
      event.messageID,
    );
  }
};