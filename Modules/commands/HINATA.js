const fs = require("fs");
module.exports.config = {
	name: "ترحيب",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Long LTD", 
	description: "بدون بادئة",
	commandCategory: "النظام",
	usages: "هيناتا",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("هيناتا")==0 || (event.body.indexOf("هيناتا")==0 || (event.body.indexOf("HINATA")==0 || (event.body.indexOf("hinata")==0)))) {
		var msg = {
				body: "مرحبا! أنا هيناتا البوت \nأكتب *أوامر من أجل القائمة .",
				attachment: fs.createReadStream(__dirname + `/noprefix/HINATA.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

      }