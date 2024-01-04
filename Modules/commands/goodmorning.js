const fs = require("fs");
module.exports.config = {
	name: "الصباح",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Ralph", 
	description: "تستقبلك هيناتا بإفتتاتحية الصباح",
	commandCategory: "بدون بادئة",
	usages: "...",
    cooldowns: 1, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("صباح الخير ")==0 || (event.body.indexOf("صباح الخير")==0 || (event.body.indexOf("morning")==0 || (event.body.indexOf("gomo")==0)))) {
		var msg = {
				body: "صباح النور والسرور ☺️",
				attachment: fs.createReadStream(__dirname + `/noprefix/coffee.gif`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }