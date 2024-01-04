module.exports.config = {
	name: "ويكيبيديا",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "ZiaReinn",
	description: "البحث في ويكيبيديا",
	commandCategory: "خدمات",
	usages: "[ar] [معلومات للبحث عنها]",
	cooldowns: 1,
	dependencies: {
        "wikijs": ""
    }
}

module.exports.languages = {
    "en": {
        "missingInput": ` ⚠️ |أدخل ما تريد البحث عنه\n\nكيفية الإستعمال \n${global.config.PREFIX}ويكيبيديا <بجث>\n\nمثال:\n${global.config.PREFIX} ويكيبيديا اليابان\n\nتم التعديل من طرف: حسين يعقوبي`,
        "returnNotFound": " ❌ |لا يمكن إيجاد معلومات حول %1"
    }
}

module.exports.run = ({ event, args, api, getText }) => {
    const wiki = (global.nodemodule["wikijs"]).default;
    let content = args.join(" ");
    let url = 'https://ar.wikipedia.org/w/api.php';
    if (args[0] == "ar") {
        url = 'https://ar.wikipedia.org/w/api.php'; 
        content = args.slice(1, args.length);
    }
    if (!content) return api.sendMessage(getText("missingInput"), event.threadID, event.messageID);
    return wiki({ apiUrl: url }).page(content).catch(() => api.sendMessage(getText("returnNotFound", content), event.threadID, event.messageID)).then(page => (typeof page != 'undefined') ? Promise.resolve(page.summary()).then(val => api.sendMessage(val, event.threadID, event.messageID)) : '');

  }