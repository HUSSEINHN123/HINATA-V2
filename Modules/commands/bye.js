const fs = require("fs");
module.exports.config = {
	name: "وداعا",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Long LTD", 
	description: "بدون بادئة",
	commandCategory: "النظام",
	usages: "وداعا",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("وداعا")==0 || (event.body.indexOf("إلى اللقاء")==0 || (event.body.indexOf("باي")==0 || (event.body.indexOf("Bye")==0)))) {
		var msg = {
				body: "وداعا مع السلامه.",
				attachment: fs.createReadStream(__dirname + `/noprefix/by.gif`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

      }