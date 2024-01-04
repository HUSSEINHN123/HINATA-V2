module.exports.config = {
	name: "إعادة_التشغيل",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "manhIT",
	description: "إعادة تشغيل البوت",
	commandCategory: "النظام",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;
	return api.sendMessage(`${global.config.BOTNAME} ⏳ | جاري إعادة التشغيل...\n ⏱️| المرجو الإنتظار....🔄`, threadID, () => process.exit(1));
}