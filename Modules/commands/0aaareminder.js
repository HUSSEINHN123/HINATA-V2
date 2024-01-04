module.exports.config = {
	name: "مذكر",
	version: "0.0.1-beta",
	hasPermssion: 0,
	credits: "Zia_Rein",
	description: "تذكير بالقيام بفعل شيء ما",
	commandCategory: "خدمات",
	usages: "[وقت] [نص] ",
	cooldowns: 5
};

module.exports.run = async function({ api, event, args, Users }) {
  
	const time = args[0];
	const text = args.join(" ").replace(time, "");
	if (isNaN(time)) return api.sendMessage(` ❓ | كيفية الإستخدام ؟\n${global.config.PREFIX}مذكر <الوقت> <نص>\n\nمثال:\n${global.config.PREFIX}\n\n⚠️ملاحظة⚠️:\n 60 تساوي دقيقة إذا أردت إستخدام الدقائق تحقق من كتابة أرقام طويلة مثال :\n${global.config.PREFIX}مذكر 99999 <نص>\n99999 يساوي 16 دقيقة\n\nتم التعديل من طرف حسين يعقوبي`, event.threadID, event.messageID);
	const display = time > 59 ? `${time / 60} دقيقة` : `${time} ثانية`;
	api.sendMessage(`سأقوم بتذكيرك لاحقا 😁\n ${display}`, event.threadID, event.messageID);
	await new Promise(resolve => setTimeout(resolve, time * 1000));
	var value = await api.getThreadInfo(event.threadID);
	if (!(value.nicknames)[event.userID]) value = (await Users.getInfo(event.senderID)).name;
	else value = (value.nicknames)[event.senderID];
	return api.sendMessage({
	body: `${(text) ? value + ", \n\n[⚠️]:\n" + text : value + "أظن أنك طلبت مني أن أذكرك بالقيام بشيء ما ، أليس كذالك ؟"}`,
		mentions: [{
			tag: value,
			id: event.senderID
		}]
	}, event.threadID, event.messageID);
}