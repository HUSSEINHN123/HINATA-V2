module.exports.config = {
	name: "طرد",
	version: "1.0.1", 
	hasPermssion: 1,
	credits: "Mirai Team",
	description: "قم بطرد الشخص اللذي تريده عن طريق إستخدام الأمر 'طرد'",
	commandCategory: "النظام", 
	usages: "[tag]", 
	cooldowns: 0,
};

module.exports.languages = {
	"vi": {
		"error": "Đã có lỗi xảy ra, vui lòng thử lại sau",
		"needPermssion": "Cần quyền quản trị viên nhóm\nVui lòng thêm và thử lại!",
		"missingTag": "Bạn phải tag người cần kick"
	},
	"en": {
		"error": "خطأ! حدث خطأ. الرجاء معاودة المحاولة في وقت لاحق!",
		"needPermssion": "أحتاج إلى أن أكون مشرفة في المجموعة 🥺\nقم بدعوتي كمشرفة في المجموعة وأعد المحاولة",
		"missingTag": "عليك أن ترد على رسالة الشخص أو عمل منشن للطرده من المجموعة"
	}
}

module.exports.run = async function({ api, event, getText, Threads }) {
	var mention = Object.keys(event.mentions);
	try {
		let dataThread = (await Threads.getData(event.threadID)).threadInfo;
		if (!dataThread.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage(getText("needPermssion"), event.threadID, event.messageID);
		if(!mention[0]) return api.sendMessage("تحتاج أن تعمل تاغ للشخص اللذي تريد طرده من المجموعة",event.threadID);
		if (dataThread.adminIDs.some(item => item.id == event.senderID)) {
			for (const o in mention) {
				setTimeout(() => {
					api.removeUserFromGroup(mention[o],event.threadID) 
				},3000)
			}
		}
	} catch { return api.sendMessage(getText("error"),event.threadID) }
}