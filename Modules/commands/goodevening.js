const fs = require("fs");
module.exports.config = {
	name: "النوم",
    version: "1.0.0",
	hasPermssion: 0,
	credits: "Ralph", 
	description: "تتمنى لك هيناتا نوما هانئا",
	commandCategory: "بدون بادئة",
	usages: "",
    cooldowns: 1, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("تصبح على خير")==0 || (event.body.indexOf("تصبحين على خير")==0 || (event.body.indexOf("تصبحون على خير")==0 || (event.body.indexOf("tulog")==0)))) {
		var msg = {
				body: "وأنت من أهله و أتمنى اك أحلاما هنيئة ☺️.",
				attachment: fs.createReadStream(__dirname + `/noprefix/goodnight.gif`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }