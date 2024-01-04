const fs = require('fs');
const ytdl = require('ytdl-core');
const { resolve } = require('path');
const axios = require('axios')
async function downloadMusicFromYoutube(link, path) {
  var timestart = Date.now();
  if(!link) return 'رابط مفقود'
  var resolveFunc = function () { };
  var rejectFunc = function () { };
  var returnPromise = new Promise(function (resolve, reject) {
    resolveFunc = resolve;
    rejectFunc = reject;
  });
    ytdl(link, {
            filter: format =>
                format.quality == 'tiny' && format.audioBitrate == 48 && format.hasAudio == true
        }).pipe(fs.createWriteStream(path))
        .on("close", async () => {
            var data = await ytdl.getInfo(link)
            var result = {
                title: data.videoDetails.title,
                dur: Number(data.videoDetails.lengthSeconds),
                viewCount: data.videoDetails.viewCount,
                likes: data.videoDetails.likes,
                author: data.videoDetails.author.name,
                timestart: timestart
            }
            resolveFunc(result)
        })
  return returnPromise
}
module.exports.convertHMS = function(value) {
    const sec = parseInt(value, 10); 
    let hours   = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60); 
    let seconds = sec - (hours * 3600) - (minutes * 60); 
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return (hours != '00' ? hours +':': '') + minutes+':'+seconds;
}
module.exports.config = {
    name: "موسيقى",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "قم بتشغيل الموسيقى عبر رابط يوتيوب أو كلمة البحث الأساسية",
    commandCategory: "وسائط",
    usages: "[كلمة البحث]",
    cooldowns: 0,
     envConfig: {
		"YOUTUBE_API": "AIzaSyAwzbcb-6QAzgZtl4qf3Z2GhQ3mqrbbMR8"
	}
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
    const axios = require('axios')
    const { createReadStream, unlinkSync, statSync } = require("fs-extra")
    try {
        var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
        var data = await downloadMusicFromYoutube('https://www.youtube.com/watch?v=' + handleReply.link[event.body -1], path);
        if (fs.statSync(path).size > 26214400) return api.sendMessage('لا يمكن إرسال الملف لأن حجمه أكبر من 25 ميجابايت.', event.threadID, () => fs.unlinkSync(path), event.messageID);
        api.unsendMessage(handleReply.messageID)
        return api.sendMessage({ 
            body: `🎶=====「 الأغنية 」=====️🎶\n\n[📌] → العنوان: ${data.title}\n[📻] → القناة: ${data.author}\n[⏱️] → المدة: ${this.convertHMS(data.dur)}\n[👁️‍🗨️] → عدد المشاهدات: ${data.viewCount} مشاهدة\n[❤️] → عدد اللايكات: ${data.likes} لايك\n[⏱️] → وفت البدأ: ${Math.floor((Date.now()- data.timestart)/1000)} ثانية\n\n[ إستمتع بالأغنية مع هيناتا ☺️ ]\n⇆ㅤㅤㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤㅤㅤ↻`,
            attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
         event.messageID)
            
    }
    catch (e) { return console.log(e) }
}
module.exports.run = async function ({ api, event, args }) {
  const YouTubeAPI = global.nodemodule["simple-youtube-api"];
  const youtube = new YouTubeAPI(global.configModule[this.config.name].YOUTUBE_API);
    if (args.length == 0 || !args) return api.sendMessage('» لا يمكن ترك حقل البحث فارغا!', event.threadID, event.messageID);
    const keywordSearch = args.join(" ");
    var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
    if (fs.existsSync(path)) { 
        fs.unlinkSync(path)
    }
    if (args.join(" ").indexOf("https://") == 0) {
        try {
            var data = await downloadMusicFromYoutube(args.join(" "), path);
            if (fs.statSync(path).size > 26214400) return api.sendMessage('لا يمكن إرسال الملف لأن حجمه أكبر من 25 ميجابايت.', event.threadID, () => fs.unlinkSync(path), event.messageID);
            return api.sendMessage({ 
                body: `🎶=====「 الأغنية 」=====️🎶\n\n[📌] → العموان: ${data.title}\n[📻] → القناة: ${data.author}\n[⏱️] → المدة: ${this.convertHMS(data.dur)}\n[👁️‍🗨️] → عدد المشاهدات: ${data.viewCount} مشاهدة\n[❤️] → عدد اللايكات: ${data.likes} لايك\n[⏱️] → وقت البدأ: ${Math.floor((Date.now()- data.timestart)/1000)} ثانية\n\n[ إستمتع بموسيقاك مع هيناتا ☺️ ]\n⇆ㅤㅤㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤㅤㅤ↻`,
                attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
            event.messageID)
            
        }
        catch (e) { return console.log(e) }
    } else {
          try {
           var link = [], msg = "", num = 1, l = [];
			let results = await youtube.searchVideos(keywordSearch, 10);
			for (const value of results) {
				if (typeof value.id !== 'undefined') {;
					link.push(value.id);
					msg += (`${num++}. ${value.title}\n`);
          const t = (await axios.get(`${value.thumbnails.high.url}`, {
        responseType: "stream"
      })).data;
    l.push(t)
				}
			}
            var body = `»🔎  ${link.length} نتيجة تطابق كلمة عن الأغنية اللتي طلبت:\n\n${msg}\n» قم بالرد على أحد الإختيارات بالرقم من أجل تحميل الأغنية اللتي تريدها`
            return api.sendMessage({
              body: body,
              attachment: l
            }, event.threadID, (error, info) => global.client.handleReply.push({
              type: 'reply',
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              link
            }), event.messageID);
          } catch(e) {
            return api.sendMessage('حدث خطأ، يرجى المحاولة مرة أخرى قريبا!!\n' + e, event.threadID, event.messageID);
        }
    }
      }