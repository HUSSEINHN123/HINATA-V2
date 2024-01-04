const fs = require("fs");
module.exports.config = {
  name: "حفلة",
    version: "1.0.1",
  hasPermssion: 0,
  credits: "Long LTD", 
  description: "بدون بادئة",
  commandCategory: "النظام",
  usages: "حفلة",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("حفلة")==0 || (event.body.indexOf("party")==0 || (event.body.indexOf("حفلة")==0 || (event.body.indexOf("حفلة")==0)))) {
    var msg = {
        body: "إستيقظو يا أصنام كفاكم نوما 🥳.",
        attachment: fs.createReadStream(__dirname + `/noprefix/party.mp4`)
      }
      api.sendMessage(msg, threadID, messageID);
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

      }