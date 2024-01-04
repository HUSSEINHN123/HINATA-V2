module.exports.config = {
	name: "لولي",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Bố Thịnh",
	description: "صور لولي",
	commandCategory: "صور",
	usages: "لولي",
	cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get('https://saikiapi.herokuapp.com/loli2').then(res => {
	//let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
	let callback = function () {
					api.setMessageReaction("😘", event.messageID, (err) => {}, true);
        api.sendMessage({
						body: `لولي 🥰`,
						attachment: fs.createReadStream(__dirname + `/cache/loli.png`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/loli.png`), event.messageID);
				};
				request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/loli.png`)).on("close", callback);
			})
      .catch(err => {
                     api.sendMessage("فشل في إنشاء الصورة", event.threadID, event.messageID);
    api.setMessageReaction("☹️", event.messageID, (err) => {}, true);
                  })     
                                 }
          