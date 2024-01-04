const request = require('request');
const fs = require('fs');

module.exports.config = {
	name: "آيدي_المجموعة",
	version: "1.0.5",
	hasPermssion: 0,
	credits: "NTKhang & Yan Maglinte", // Added a function to get ThreadImage
	description: "قم بالحصول على آيدي المجموعة مرفقة مع صورة",
	usePrefix: true,
	commandCategory: "مجموعة",
	usages: "آيدي_المجموعة",
	cooldowns: 5
};

module.exports.run = async function({ api, event }) {
	let threadInfo = await api.getThreadInfo(event.threadID);
	let { threadName, participantIDs, imageSrc } = threadInfo;

	if (imageSrc) {
		let callback = async function() {
			api.sendMessage(
				{
					body: `❯ آيدي المجموعة: ${event.threadID}\n\n❯ صورة المجموعة:`,
					attachment: fs.createReadStream(__dirname + '/cache/thread.png')
				},
				event.threadID,
				() => {
					fs.unlinkSync(__dirname + '/cache/thread.png');
				}
			);
		};

		request(imageSrc)
			.pipe(fs.createWriteStream(__dirname + '/cache/thread.png'))
			.on('close', callback);
	} else {
		api.sendMessage(
			`❯ آيدي المجموعة: ${event.threadID}\n\n❯ هذه المجموعة لم تقم بوضع صورة بعد .`,
			event.threadID
		);
	}
};
    