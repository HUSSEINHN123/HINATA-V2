module.exports.config = {
  name: "تيك",
  version: "1.0.0",
  hasPermssion: "0",
  credits: "Kim Joseph DG Bien",
  description: "قم بالبحث عن فيديو في التيك توك",
  commandCategory: "وسائط",
  usage: "[تيك <إسم البحث>]",
  cooldowns: 5,
};

const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.run = async function({ api, event, args }) {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      api.sendMessage("الإستخدام: تيك <نص البحث>", event.threadID);
      return;
    }
    
    api.sendMessage(" ⏱️ | جاري البحث المرجو الإنتظار...", event.threadID);
    
    const response = await axios.get(`https://api-1.kimjosephdgbien.repl.co/tiktok/searchvideov2?keywords=${encodeURIComponent(searchQuery)}`);
    const videos = response.data.data.videos;
    
    if (!videos || videos.length === 0) {
      api.sendMessage("لم يتم العثور على مقاطع فيديو لما قمت بإدخاله .", event.threadID);
      return;
    }

    const videoData = videos[0];
    const videoUrl = videoData.play;
    
    const message = `نتيجة التيك توم:\n\nتم النشر من طرف: ${videoData.author.nickname}\nالمستخدم: ${videoData.author.unique_id}\n\nالعنوان: ${videoData.title}`;
    
    const filePath = path.join(__dirname, `/cache/tiktok_video.mp4`);
    const writer = fs.createWriteStream(filePath);

    const videoResponse = await axios({
      method: 'get',
      url: videoUrl,
      responseType: 'stream'
    });

    videoResponse.data.pipe(writer);

    writer.on('finish', () => {
      api.sendMessage(
        { body: message, attachment: fs.createReadStream(filePath) },
        event.threadID,
        () => fs.unlinkSync(filePath)
      );
    });
  } catch (error) {
    console.error('Error:', error);
    api.sendMessage("حدث خطأ أثناء معالجة الطلب.", event.threadID);
  }
};