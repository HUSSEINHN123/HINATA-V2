module.exports.config = {
	name: "زوجة",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Prince Sanel",
	description: "مجموعة من صور فتيات من الأنمي",
	commandCategory: "صور",
	usages: "[زوجة]",
	cooldowns: 5,
	
	}; // credit for api: Prince Sanel
			
module.exports.run = async ({ api, event, args }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	try {
	axios.get(`https://mainapi.princemc166.repl.co/api/waifu`).then(res => {
	let callback = function () {
					api.sendMessage({
						body:`زوجة 💖💞❣️:`,
						attachment: fs.createReadStream(__dirname + `/cache/waifu.png`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/waifu.png`), event.messageID);
				};
				request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/waifu.png`)).on("close", callback);
			})
	} catch (error) {
		api.sendMessage(" ❌ |حدث خطأ أثناء جلب الصور من واجهة برمجة التطبيقات", event.threadID, event.messageID);
	}
  }