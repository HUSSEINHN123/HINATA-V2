const fs = require("fs");
module.exports.config = {
  name: "أصنام",
    version: "1.0.1",
  hasPermssion: 0,
  credits: "Long LTD", 
  description: "بدون بادئة",
  commandCategory: "النظام",
  usages: "أصنام",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("أصنام")==0 || (event.body.indexOf("أصنام")==0 || (event.body.indexOf("صمت")==0 || (event.body.indexOf("هدوء")==0)))) {
    var msg = {
        body: "هيا يا أصنام قولو شيئا🥱",
        attachment: fs.createReadStream(__dirname + `/noprefix/box.mp4`)
      }
      api.sendMessage(msg, threadID, messageID);
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

      }