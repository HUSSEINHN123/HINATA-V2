const fs = require("fs");
module.exports.config = {
	name: "سبيدرمان",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Long LTD", 
	description: "بدون بادئة",
	commandCategory: "النظام",
	usages: "سيجي",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("زينجي سبيدرمات")==0 || (event.body.indexOf("سيجي سبيدرمان")==0 || (event.body.indexOf("سبيدرمان")==0 || (event.body.indexOf("cj")==0)))) {
		var msg = {
				body: "سيجي سبيدرمان 😎",
				attachment: fs.createReadStream(__dirname + `/noprefix/cjspiderman.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

    }