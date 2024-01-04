module.exports.config = {
	name: "إعادة_التحميل",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "D-Jukie",
	description: "إعادة تحميل بيانات ملف التكوين",
	commandCategory: "المالك",
	usages: "[]",
	cooldowns: 30
};
module.exports.run = async function({ api, event, args,Threads, Users }) {
delete require.cache[require.resolve(global.client.configPath)];
global.config = require(global.client.configPath);
return api.sendMessage("[حسنا]\n ⏱️  | جاري إعادة تحميل بيانات البوت...", event.threadID, event.messageID);    
} 