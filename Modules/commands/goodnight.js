const fs = require("fs");
module.exports.config = {
	name: "المساء",
    version: "1.0.0",
	hasPermssion: 0,
	credits: "Ralph", 
	description: "هيناتا تتمنى لك مساء سعيد",
	commandCategory: "بدون بادئة",
	usages: "مساء الخير
    ",
    cooldowns: 1, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("مساء الخير")==0 || (event.body.indexOf("مساء الخير")==0 || (event.body.indexOf("night")==0 || (event.body.indexOf("tulog")==0)))) {
		var msg = {
				body: "مساء النور 💗.",
				attachment: fs.createReadStream(__dirname + `/noprefix/goodafternoon.gif`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }