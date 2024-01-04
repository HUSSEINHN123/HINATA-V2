const fs = require("fs");
module.exports.config = {
	name: "كيوت_ڤويس",
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
	if (event.body.indexOf("أرا أرا")==0 || (event.body.indexOf("أرا")==0 || (event.body.indexOf("Ara")==0 || (event.body.indexOf("ara")==0)))) {
		var msg = {
				body: "Ara ara~~",
				attachment: fs.createReadStream(__dirname + `/noprefix/ara.mp3`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😸", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

      }