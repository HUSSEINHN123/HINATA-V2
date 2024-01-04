module.exports.config = {
	name: "تطقيم2",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "حسين",
	description: "مجموعة من التطقيمات للفتيات و الأولاد",
	commandCategory: "متعة",
	usages: "[تطقيم2]",
	cooldowns: 1,
	
	}; // Credits fot the api:chard api

module.exports.run = async ({ api, event, args }) => {
	const axios = require("axios");
	const fs = require("fs");
	const request = require("request");
	try {
	axios.get(`https://nguyen-chard-api.joshuag06.repl.co/api/randomgambar/couplepp`).then(res => {
		let callback = function () {
					api.sendMessage({
						body: `فتى 👱:`,
						attachment: fs.createReadStream(__dirname + `/cache/cdp.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/cdp.jpg`), event.messageID);
				};
				request(res.data.result.male).pipe(fs.createWriteStream(__dirname + `/cache/cdp.jpg`)).on("close", callback);
		let callback = function () {
					api.sendMessage({
						body: `فتاة 👩‍🦰:`,
						attachment: fs.createReadStream(__dirname + `/cache/cdp1.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/cdp1.jpg`), event.messageID);
				};
				request(res.data.result.female).pipe(fs.createWriteStream(__dirname + `/cache/cdp1.jpg`)).on("close", callback);
			})
	} catch (error) return api.sendMessage(" ❌ |حدث خطأ أثناء جلب واجهة برمجة التطبيقات", event.threadID, event.messageID);
                                            }