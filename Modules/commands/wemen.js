const fs = require("fs");
module.exports.config = {
	name: "نساء",
    version: "1.0.2",
	hasPermssion: 0,
	credits: "Cjas",
	description: "بدون بادئة",
	commandCategory: "ون بادئة",
	usages: "wemen",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("women")==0 || (event.body.indexOf("Women")==0 || (event.body.indexOf("نساء")==0 || (event.body.indexOf("نساء")==0)))) {
		var msg = {
				body: "☕wemen☕",
				attachment: fs.createReadStream(__dirname + `/noprefix/women.mp3`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("☕", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }