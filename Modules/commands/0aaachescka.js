module.exports.config = {
name: "شيسكا",
version: "1.0.0",
hasPermssion: 0,
credits: "Prince Sanel/LiANE for ChescaAI",
description: "شيسكا الذكاء الاصطناعي",
price: 0,
commandCategory: "الذكاء الإصطناعي",
cooldowns: 3,
};
module.exports.run = async function ({ api, args, event, permssion, Currencies }) {
	const { threadID, messageID, senderID } = event;
	const axios = require("axios");
	try {
		const req = args.join(" ");
    const { getData, increaseMoney, decreaseMoney } = Currencies;
    const moneyUser = (await getData(senderID)).money;
    if (this.config.price > moneyUser) {
    return api.sendMessage(" ⚠️ |أموالك ليست كافية للقيام بهذا الطلب. يرجى التحقق من رصيدك قبل استخدام هذا الأمر.", threadID, messageID);
    }
		if (!req) return api.sendMessage("[!] | أرجوك قم بإدخال سؤال.", threadID, messageID);
    api.sendMessage(" ⏱️ | جاري البحث عن أجوبة , يرجى الإنتظار....... ", threadID, messageID);
    await decreaseMoney(senderID, parseInt(this.config.price));
		const res = await axios.get(`https://school-project-lianefca.bene-edu-ph.repl.co/ask/chesca?query=${encodeURIComponent(req)}`);
		api.sendMessage(res.data.message, threadID, messageID);
	} catch {
		api.sendMessage(" ❌ |حدث خطأ أثناء جلب واجهة برمجة التطبيقات.", threadID, messageID);
	}
}