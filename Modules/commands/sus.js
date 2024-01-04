const fs = require("fs");
module.exports.config = {
	name: "أمونج_أوس",
    version: "1.0.2",
	hasPermssion: 0,
	credits: "Cjas",
	description: "بدون بادئة",
	commandCategory: "بدون بادئة",
	usages: "Yo Yo",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("أمونج أوس")==0 || (event.body.indexOf("ششش")==0 || (event.body.indexOf("amongus")==0 || (event.body.indexOf("sus")==0)))) {
		var msg = {
				body: "ඞ",
				attachment: fs.createReadStream(__dirname + `/noprefix/sus.mp3`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }