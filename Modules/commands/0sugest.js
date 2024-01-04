module.exports.config = {
	name: "إقتراح",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "متطلبات الوظيفة/التعليقات",
	commandCategory: "المالك",
	usages: "[إضافة/قائمة/إزالة] [مدخلاتك]",
	cooldowns: 5
};

module.exports.onLoad = function () {
	const fs = require("fs-extra");

	if (!fs.existsSync(__dirname + "/cache/requestList.json")) {
		const requestList = [];
		fs.writeFileSync(__dirname + "/cache/requestList.json", JSON.stringify(requestList));
	}
}

module.exports.run = function({ api, event, args, permssion }) {
	const fs = require("fs-extra");
	const content = args.slice(1, args.length);
	const dirFile = __dirname + "/cache/requestList.json";

	var getList = fs.readFileSync(dirFile);
	var getData = JSON.parse(getList);

	switch (args[0]) {
		case "إضافة": {
			const suggest = `[ ${event.senderID} ] ${content.join(" ")}`
			getData.push(suggest);
			fs.writeFileSync(dirFile, JSON.stringify(getData));
			return api.sendMessage(` ✅ |لقد قمت بإضافة اقتراح جديد بنجاح`, event.threadID, event.messageID);
		}
		case "قائمة":
		case "المجموع": {
			if (getData.length == 0) return api.sendMessage(` ⚠️ |لا يوجد حاليا أي اقتراحات لعرضها!`, event.threadID, event.messageID);
			var workList = "";
			getData.map(item => workList += `\n- ${item}`);
			return api.sendMessage(` 📜 | إليك الإقتراحات المتوفرة : ${workList}`, event.threadID, event.messageID);
		}

		case "إزالة":
		case "حذف": {
			if (permssion !== 2) return api.sendMessage(" ⚠️ |ليس لديك الأذن لإستخدام حذف أو إزالة فقط حسين يعقوبي يمكنه ذالك!", event.threadID, event.messageID);
			if (getData.length == 0) return api.sendMessage(`حاليا لا توجد اقتراحات للحذف!`, event.threadID, event.messageID);
			if (content.length == 0) return api.sendMessage(` ⚠️ |تحتاج إلى تحديد العنصر المراد حذفه`, event.threadID, event.messageID);
			if (isNaN(content)) return api.sendMessage(` ⚠️ |تحتاج إلى تحديد العنصر المطلوب`, event.threadID, event.messageID);
			getData.splice((parseInt(content) - 1), 1);
			fs.writeFileSync(dirFile, JSON.stringify(getData));
			return api.sendMessage(`تم حذف العنصر الذي يحتوي على الإقتراح التالي : ${content} بنجاح ✅`, event.threadID, event.messageID);
		}
		default:
			global.utils.throwError("suggest", event.threadID, event.messageID);
		break;
	}
}