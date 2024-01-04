const fs = require("fs");
module.exports.config = {
  name: "كابور",
    version: "1.0.1",
  hasPermssion: 0,
  credits: "VanHung - Fixed by LTD", 
  description: "أغنية كابوري",
  commandCategory: "بدون بادئة",
  usages: "😽/😻/😼/كابوري",
   usePrefix:true,
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("كابوري")==0 || event.body.indexOf("😁")==0 || event.body.indexOf("🥰")==0 || event.body.indexOf("kaburi")==0) {
    var msg = {
        body: "كابور....🎶🎵ي",
        attachment: fs.createReadStream(__dirname + `/noprefix/kaburi.mp3`)
      }
      api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction("😘", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

                           }