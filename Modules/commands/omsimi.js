const fs = require("fs");
module.exports.config = {
  name: "لحن الموت",
    version: "1.0.1",
  hasPermssion: 0,
  credits: "Long LTD", 
  description: "بدون بادئة",
  commandCategory: "النظام",
  usages: "أومزيم",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("أومزيم")==0 || (event.body.indexOf("أومزي")==0 || (event.body.indexOf("omzi")==0 || (event.body.indexOf("omsim")==0)))) {
    var msg = {
        body: "هاسي بارادي .....🎼🎶💀",
        attachment: fs.createReadStream(__dirname + `/noprefix/omsim.mp4`)
      }
      api.sendMessage(msg, threadID, messageID);
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

      }