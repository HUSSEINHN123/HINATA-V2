module.exports.config = {
	name: "إطفاء",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "HTHB",
	description: "أجفئ البوت عند.الحاجة",
	commandCategory: "النظام",
	cooldowns: 0
        };
module.exports.run = ({event, api}) =>{
    const permission = [`100076269693499`,``];
	if (!permission.includes(event.senderID)) return api.sendMessage(" ⚠️ | ليس لديك الإذن لإيتخدام هذا الأمر فقط حسين يعقوبي يمكنه ذالك.", event.threadID, event.messageID);
  api.sendMessage(`[✓]\nتم إطفاء البوت بنجاح`,event.threadID, () =>process.exit(0))
}