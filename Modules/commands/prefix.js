const fs = require("fs");
module.exports.config = {
    name: "بريفكس",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "jeka",
    description: "يرسل رمز البوت بالنسبة للمستخدمين الجدد",
    commandCategory: "الإرشاد",
    usages: "prefix",
    cooldowns: 1,
};

module.exports.handleEvent = function ({ api, event, client, __GLOBAL }) {
    var { threadID, messageID, senderID } = event;
    var senderName = "";
    api.getUserInfo(senderID, (err, result) => {
        if (err) {
            console.error(err);
            senderName = "";
        } else {
            senderName = result[senderID].name;
        }
        if (
            event.body.indexOf("prefix") == 0 ||
            event.body.indexOf("Prefix") == 0 ||
            event.body.indexOf("PREFIX") == 0 ||
            event.body.indexOf("prefi") == 0
        ) {
            // Send text message with prefix information
            api.sendMessage(
                {
                    body: `مرحبا هاهي ذي البادئة الخاصة بي ⬅️ » ${global.config.PREFIX} «\n
إليك بعد الأوامر التي قد تساعدك أو قد تريد إستعمالها:
➥ ${global.config.PREFIX}أوامر [رقم الصفحة] -> لكي ترى باقي الصفحات
➥ ${global.config.PREFIX}هيناتا [وإسألها عن أي شيء] -> البوت يجيب عن الأسئلة
➥ ${global.config.PREFIX}نداء [رسالتك] -> إذا كنت تواجه أي مشاكل أو إذا كان لديك أي أسئلة أو استفسارات 
➥ ${global.config.PREFIX}أوامر [إسم الأمر] -> لكي ترى معلومات وكيفية إستعمال هذا الأمر\n\nإستمتع بإستخدام هذه الأوامر!❤️\nمطور البوت: حسين يعقوبي `,
                    attachment: fs.createReadStream(
                        __dirname + `/noprefix/prefix.gif`
                    ),
                },
                threadID,
                messageID
            );

            // Send voice message with additional information
            const voiceFile = fs.readFileSync(
                __dirname + "/noprefix/prefix.gif"
            );
            api.sendMessage(
                {
                    attachment: voiceFile,
                    type: "audio",
                    body: "أهلا إستمع إلى البادىة الخاصة بي!",
                },
                threadID,
                () => {}
            );

            api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        }
    });
};
module.exports.run = function ({ api, event, client, __GLOBAL }) {};