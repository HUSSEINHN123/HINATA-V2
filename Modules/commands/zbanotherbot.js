module.exports.config = {
  name: "حظر_البوتات",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Vegito",
  description: "حظر البوتات",
  commandCategory: "النظام",
  cooldowns: 0
};
module.exports.handleEvent = async ({
	event: o,
	api: t,
	Users: n
}) => {
	var {
		threadID: e,
		messageID: a,
		body: b,
		senderID: s,
		reason: d
	} = o;
	const i = require("moment-timezone").tz("Africa/Casablanca").format("HH:MM:ss L");
	if (s == t.getCurrentUserID()) return;
	let c = await n.getNameUser(o.senderID);
	var h = {
		body: `${c}\n ⚠️ | تم إكتشاف من طريقة كلامك أنك بوت و سيتم حظرك تلقائيا من أجل تجنب السبام و إرسال رسائل كثيرة بوتيرة كبيرة `
	};
    //Add curse words without capital letters
	["تم إكتشاف بوتات | 🔎"].forEach((a => { 
		
        const s = o.senderID;
    let haha = o.body;
	if (haha.includes("لقد تم إرتفاع مستواك إلى مشتوى") || haha.includes("هذا الأمر غير موجود هل هذا أم ماذا") || haha.includes("الأمر اللذي تستخدمه غير صحيح") || haha.includes("قم بعمل تاغ") || haha.includes("لقد قام بحذف رسالة") || haha.includes("ليس لديك الصلاحية لإستخدام الأمر") || haha.includes("»» إشعار المجموعة «« تم تغيير اللقب إلى") || haha.includes("تم تغيير إشم المجموعة إلى") || haha.includes("تعالو شوفو إيش حذف") || haha.includes("كبروك حصلت على فلوس الحظ") || haha.includes("هذه هي البادئة الخاصة بس") || haha.includes("قام بحذف مرفق.") || haha.includes("غير  قادر على إعادة إضافته إلى المجموعة")) {
			modules = "[ إكتشاف بوتات أخرى | 🔎 ]", console.log(c, modules, a);
			const o = n .getData(s).data || {};
			n.setData(s, {
				data: o
			}), o.banned = 1, o.reason = a || null, o.dateAdded = i, global.data.userBanned.set(s, {
				reason: o.reason,
				dateAdded: o.dateAdded
			}), t.sendMessage(h, e, (() => {
				const o = global.config.ADMINBOT;
				var n = o;
				for (var n of o) t.sendMessage(` ⚠️ | إسم البوت: ${c}\nآيدي البوت: ${s}\n\nلقد تم إكتشاف أن هذا الحساب هو بوت لذالك سبتم حظره تلقائيا تفادي لسبام و خرق شروط و احكام فيسبوك`, n)
			}))
		} 
	})) 
}, module.exports.run = async ({
	event: o,
	api: t
}) => t.sendMessage(" 🚫 |يُستخدم هذا الأمر لاكتشاف البوتات الأخرى وحظرها على الفور لتجنب السبام و إرسال البريد العشوائي ", o.threadID);