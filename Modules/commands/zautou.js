var configCommand = {
    name: 'تحميل_تلقائي',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'يتم التنزيل تلقائيًا عند اكتشاف الارتباط',
    commandCategory: 'النظام',
    usages: '[]',
   usePrefix:true,
    cooldowns: 3
},
    axios = require('axios'),
    downloader = require('image-downloader'),
    fse = require('fs-extra'),
  toolsFb = require('tools-fb'),
    path = __dirname + '/cache/statusAuto.json';

async function streamURL(url, mime) {
     const dest = `${__dirname}/cache/${Date.now()}.${mime}`;
    const name = global.utils.randomString(5) + '.' + mime;
     await downloader.image({
         url, dest
     });
     setTimeout(j => fse.unlinkSync(j), 60 * 1000, dest);
     return fse.createReadStream(dest);
    const res = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    res.data.path = name;
    return res.data;
};

function onLoad() {
    if (!fse.existsSync(path)) fse.writeFileSync(path, '{}');
};

async function noprefix(arg) {
    const s = JSON.parse(fse.readFileSync(path));
    if (arg.event.senderID == (global.botID || arg.api.getCurrentUserID())) return;
    if ((typeof s[arg.event.threadID] == 'boolean' && !s[arg.event.threadID])) return;

    const out = (a, b, c, d) => arg.api.sendMessage(a, b ? b : arg.event.threadID, c ? c : null, d ? d : arg.event.messageID),
        arr = arg.event.args,
        regEx_tiktok = /(^https:\/\/)((vm|vt|www|v)\.)?(tiktok|douyin)\.com\//,
        regEx_youtube = /(^https:\/\/)((www)\.)?(youtube|youtu)(PP)*\.(com|be)\//,
        regEx_facebook = /(^https:\/\/)(\w+\.)?(facebook|fb)\.(com|watch)\/\w+\/\w?(\/)?/,
        regEx_instagram = /^\u0068\u0074\u0074\u0070\u0073\u003a\/\/(www\.)?instagram\.com\/(reel|p)\/\w+\/\w*/

    for (const el of arr) {
        /* TỰ ĐỘNG TẢI VIDEO TIKTOK */
        if (regEx_tiktok.test(el)) {
            const data = (await axios.post(`https://www.tikwm.com/api/`, {
                url: el
            })).data.data;
            out({
                body: `====『 فيديو من تيكوك 』====\n━━━━━━━━━━━━━━━━━━━━\n🕵️  إسم الناشر: ${data.author.nickname}\n🆔 آيدي: ${data.author.unique_id}\n🌐 الدولة: ${data.region}\n📌 العنوان: ${data.title}\n❤️ عدد اللايكات: ${data.digg_count}\n💬 عدد التعليقات: ${data.comment_count}\n🌐 عدد المشاركات: ${data.share_count}\n⬇️ عدد التنزيلات: ${data.download_count}\n⏳ مدة الفيديو: ${data.duration} \n━━━━━━━━━━━━━━━━━━━━\n✿إستمتع بالفيديو 😉 "🐧"     ✿`, attachment: await streamURL(data.play, 'mp4')
            }, '', (err, dataMsg) => global.client.handleReaction.push({
                name: 'autodownurl', messageID: dataMsg.messageID, url_audio: data.music
            })); // Video không logo thì sửa "wmplay" -> "play";
        };
        /* END */

        /* TỰ DỘNG TẢI VIDEO YOUTUBE */
        if (regEx_youtube.test(el)) {
            const data = (await axios.get(`https://api.naht-fus.repl.co/youtube?dlvideo=${el}`)).data.data,
                info = (a, b) => `===『 فيديو من يوتيوب 』===\n━━━━━━━━━━━━━━━━━━━━\n📌 العنوان: ${a.title}\n⌛ مدة الفيديو ${a.lengthSeconds}`;
            if (data.indexRange.contentLength < 26214400) out({
                body: (info(data, data.indexRange.contentLength)) + '\n━━━━━━━━━━━━━━━━━━━━\n✿ إستماع بالفيديو  "🐧" من يوتيوب ✿' + `\n`, attachment: await streamURL(data.dataDownload.url, 'mp4')
            }, '', (err, datMsg) => global.client.handleReaction.push({
                name: 'autodownurl', messageID: datMsg.messageID, url_audio: data.dataDownload.url
            })); else if (data.indexRange.contentLength < 26214400) out({
                body: (info(data)) + `\n`, attachment: await streamURL(data.dataDownload.url, 'mp3')
            });
        };
        /* END */

        /* TỰ ĐỘNG TẢI VIDEO FACEBOOK */
            if (regEx_facebook.test(el)) out({
            attachment: await streamURL((fdl = (await axios.get(`https://api.naht-fus.repl.co/facebook/download?url=${el}`)).data.data, fdl.videos.hd), 'mp4'), body: `===『 فيديو من فيسبوك 』===\n━━━━━━━━━━━━━━━━━━`
        }, '', (err, dataMsg) => global.client.handleReaction.push({
                name: configCommand.name, messageID: dataMsg.messageID, url: fdl.videos.sd
            }));    
        /* END */

        if (regEx_instagram.test(el))out({
            attachment: await streamURL((idl = (await axios.get(`https://api.naht-fus.repl.co/Instagram/videodl?url=${el}`)).data.video_versions.url, idl[((irx = /\/p\//.test(el))?'display': 'video')+'_url']), irx?'jpg': 'mp4'), body: !irx?'→ إستماع بالفيديو 🐧 من فيسبوك 😉.':''
        }, '', !irx?(err, dataMsg) => global.client.handleReaction.push({
                name: configCommand.name, messageID: dataMsg.messageID, url: idl.video_versions.url
            }): '');
    };
};
/* End Instagram Donwload*/
async function reactionMsg(arg) {
    if (arg.event.reaction == '🐧') // code
    {
        const out = (a, b, c, d) => arg.api.sendMessage(a, b ? b : arg.event.threadID, c ? c : null, d),
            _ = arg.handleReaction;
        if ('url_audio' in _) out({
            body: `『 صوت 』`, attachment: await streamURL(_.url_audio, 'mp3')
        }, '', '', _.messageID);
    }
};
function runCommand(arg) {
    const out = (a, b, c, d) => arg.api.sendMessage(a, b ? b : arg.event.threadID, c ? c : null, d ? d : arg.event.messageID);
    const data = JSON.parse(fse.readFileSync(path));
    s = data[arg.event.threadID] = typeof data[arg.event.threadID] != 'boolean' || !!data[arg.event.threadID] ? false : true;
    fse.writeFileSync(path, JSON.stringify(data, 0, 4));
    out((s ? '『تحميل الروابط تلقائيا 』 ' : '『 تحميل من الروابط تلقائيا 』 ') + ' ' + configCommand.name);
};

module.exports = {
    config: configCommand,
    onLoad,
    run: runCommand,
    handleEvent: noprefix,
    handleReaction: reactionMsg
};