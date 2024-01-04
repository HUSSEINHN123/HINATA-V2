module.exports.config = {
	name: "مقطع_إديت",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Jonell Magallanes",
	description: "مجموعة من المقاطع من التيك توك المعدلة",
	commandCategory: "وسائط",
	cooldowns: 20,
	dependencies: {
		"axios": ""
	}
};

const axios = require("axios");
const fs = require("fs");

module.exports.run = async function({ api, event, args, client, __GLOBAL }) {
 
  api.sendMessage("⏱️ | جاري إرسال مقطع إديت ، يرجى الإنتظار...", event.threadID, event.messageID); api.setMessageReaction("⏱️", event.messageID, () => { }, true);
  const response = await axios.get('https://basta-ganon.jonellmagallan1.repl.co/randomedit', {
		responseType: 'arraybuffer'
	}).catch(error => {
		api.sendMessage("خطأ في إرسال الفيديو.", event.threadID, event.messageID);
		console.error(error);
		return;
	});
  
	if (response && response.status === 200) {
		const filePath = __dirname + "/cache/randomedit.mp4";
		fs.writeFileSync(filePath, Buffer.from(response.data, 'binary'), "binary"); api.setMessageReaction("✅", event.messageID, () => { }, true);
    const tid = event.threadID
		api.sendMessage({
			body: `إليك مقطع إديت اللذي طلبت 🌟\n\nآيدي:${tid}`,
			attachment: fs.createReadStream(filePath)
		}, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
	} else {
		api.sendMessage("فشل استرداد الفيديو.", event.threadID, event.messageID); api.setMessageReaction("🔭", event.messageID, () => { }, true);
	}
};