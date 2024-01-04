module.exports.config = {
  name: "كورامي",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kadeer",
  description: "صور كورامي",
  commandCategory: "صور",
  usages: "كوراي",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('https://apikurumi.khoahoang3.repl.co').then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let callback = function () {
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
          api.sendMessage({
            body: `Kurumi-chan!🖤\nPhotos Available: ${count}`,
            attachment: fs.createReadStream(__dirname + `/cache/kurumi.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/kurumi.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/kurumi.${ext}`)).on("close", callback);
      })
}