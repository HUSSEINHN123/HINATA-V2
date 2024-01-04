module.exports.config = {
  name: "تشغيل_الكلمات",
  version: "2.0.4",
  hasPermssion: 0,
  credits: "Grey",
  description: "تشغيل أغاني مع كلمات",
  commandCategory: "وسائط",
  usages: "[العنوان]",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
    "request": "",
    "axios": "",
    "ytdl-core": "",
    "yt-search": ""
  }
};

module.exports.run = async ({ api, event }) => {
  const axios = require("axios");
  const fs = require("fs-extra");
  const ytdl = require("ytdl-core");
  const request = require("request");
  const yts = require("yt-search");

  const input = event.body;
  const text = input.substring(12);
  const data = input.split(" ");

  if (data.length < 2) {
    return api.sendMessage("أرجوك قم بإدخال إسم الأغنية", event.threadID);
  }

  data.shift();
  const song = data.join(" ");

  try {
    api.sendMessage(`⏱️ | جاري البحث عن الأغنية والكلمات ل "${song}". المرجو الإنتظار...`, event.threadID);

    const res = await axios.get(`https://api.heckerman06.repl.co/api/other/lyrics2?song=${encodeURIComponent(song)}`);
    const lyrics = res.data.lyrics || "لم يتم العثور عليه!";
    const title = res.data.title || "لم يتم العثور عليه!";
    const artist = res.data.artist || "لم يتم العثور عليه!";

    const searchResults = await yts(song);
    if (!searchResults.videos.length) {
      return api.sendMessage("خطأ❌: طلب غير صالح.", event.threadID, event.messageID);
    }

    const video = searchResults.videos[0];
    const videoUrl = video.url;

    const stream = ytdl(videoUrl, { filter: "audioonly" });

    const fileName = `${event.senderID}.mp3`;
    const filePath = __dirname + `/cache/${fileName}`;

    stream.pipe(fs.createWriteStream(filePath));

    stream.on('response', () => {
      console.info('[DOWNLOADER]', 'Starting download now!');
    });

    stream.on('info', (info) => {
      console.info('[DOWNLOADER]', `Downloading ${info.videoDetails.title} by ${info.videoDetails.author.name}`);
    });

    stream.on('end', () => {
      console.info('[DOWNLOADER] Downloaded');

      if (fs.statSync(filePath).size > 26214400) {
        fs.unlinkSync(filePath);
        return api.sendMessage('[⚠️] تعذر إرسال الملف لأن حجمه أكبر من 25 ميغابايت.', event.threadID);
      }

      const message = {
        body: `هاهي ذا أغنيتك مع الكلمات أرجوك إستمتع!🥰\n\nالعنوان: ${title}\nالفنان: ${artist}\n\nالكلمات: ${lyrics}`,
        attachment: fs.createReadStream(filePath)
      };

      api.sendMessage(message, event.threadID, () => {
        fs.unlinkSync(filePath);
      });
    });
  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage('حدث خطأ أثناء معالجة الأمر.', event.threadID);
  }
};