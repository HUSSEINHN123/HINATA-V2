module.exports.config = {
  name: "تيك_توك2",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Eugene Aguilar",
  description: "تحميل فيديوهات من التيك توم",
  commandCategory: "وسائط",
  usage: `${global.config.PREFIX}تيك_توك2 <رابط>`,
  cooldowns: 5,
};

const axios = require("axios");
const fs = require("fs");
const path = require("path");


module.exports.run = async function({ api, event, args }) {
  try {
	 const link = args[0];
	 if (!link) {
		api.sendMessage("كيفية الإستخدام: *تبك_توك2 <رابط>", event.threadID);
		return;
	 }
	 api.sendMessage(` ⏱️ | جاري تنزيل الفيو يرجى الإنتظار...`, event.threadID);

	 const response = await axios.get(`https://tik-dl-api.diciper09.repl.co/tiktokdl?url=${encodeURIComponent(link)}`);

	 const videoUrl = response.data.data.play;
	 const userName = response.data.data.author.unique_id;

	 if (!videoUrl) {
		api.sendMessage(" ⚠️ | لم يتم إيجاد أي فيديو بالنسبة اهذا الرابط.", event.threadID);
		return;
	 }

	 const videoResponse = await axios({
		method: "get",
		url: videoUrl,
		responseType: "stream",
	 });

	 const filePath = path.join(__dirname, "cache", "tiktok_video.mp4");
	 videoResponse.data.pipe(fs.createWriteStream(filePath));

	 videoResponse.data.on("end", () => {
		api.sendMessage(
		  {
			 attachment: fs.createReadStream(filePath),
			 body: `تم التحميل بنجاح ✅.\nالمستخدم: @${userName}`,
		  },
		  event.threadID,
		  () => fs.unlinkSync(filePath)
		);
	 });
  } catch (error) {
	 console.error("Error:", error);
	 api.sendMessage(" ❌ | خطأ أثناء معالجة الطلب.", event.threadID);
  }
};