module.exports.config = {
	name: "تشغيل",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "HTHB",
	description: "تشغيل البوت",
	commandCategory: "المالك",
	cooldowns: 0
        };
module.exports.run = ({event, api}) =>api.sendMessage(" ✅  | تم تشغيل البوت",event.threadID, () =>process.enter(0))