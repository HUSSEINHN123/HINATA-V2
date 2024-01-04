const cron = require('node-cron');
const axios = require("axios");
const request = require('request');
const fs = require("fs");

const activeThreads = {};

module.exports.config = {
  name: "شوتي_تلقائي",
  version: "2.0.0",
  hasPermission: 0,
  credits: "Eugene Aguilar",//converted to mirai by Kyouya Dev
  description: "إرسال فيديوهات فتيات تلقائيا مع تشغيل وإيقاف",
  commandCategory: "متعة",
  usages: "[تشغيل/إيقاف]",
  cooldowns: 5,
};

module.exports.run = async function({api, event, input}) {
const args = event.body.split(" ");
  const threadID = event.threadID;

  if (args[1] === "تشغيل") {
   if (!activeThreads[threadID]) {
    activeThreads[threadID] = true;
    api.sendMessage(` ✅ | تم تفعيل إرسال فيديوهات لفتيات من التبك توك بنجاح `, event.threadID, (err, info) =>
     setTimeout(() => {
      api.unsendMessage(info.messageID) } , 20000),event.messageID);

    cron.schedule('*/2 * * * *', async () => {
      try {
       if (activeThreads[threadID]) { 
         let response = await axios.post(
         "https://api--v1-shoti.vercel.app/api/v1/get",
         {
          apikey: "$shoti-1hfdaljvdsfauofg7j",
         },
           );
        var file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");
         const userInfo = response.data.data.user;
              const username = userInfo.username;
              const nickname = userInfo.nickname;
      const tid = event.threadID
        var rqs = request(encodeURI(response.data.data.url));
        rqs.pipe(file);
        file.on('finish', () => {
          api.sendMessage(
                      {
                body: `المستخدم: @${username}\nاللقب: ${nickname}\nالمعرف: ${tid}`,
           attachment: fs.createReadStream(__dirname + '/cache/shoti.mp4')
          }, threadID, (error, info) => {
           if (!error) {
            fs.unlinkSync(__dirname + '/cache/shoti.mp4');
           }
          });
        });
       }
      } catch (error) {
       console.error('Error:', error);
      }
    });
   } else {
    api.sendMessage(" ⚠️ | إرسال فيديوهات فتيات التيك توك هي مفعلة بالفعل في هذه المجموعة.", threadID);
   }
  } else if (args[1] === "إيقاف") {
   if (activeThreads[threadID]) {
    activeThreads[threadID] = false;
    api.sendMessage(` ✅ | تم إيقاف إرسال فيديوهات فتيات التيك توك تلقائيا في هذه المجموعة.`, threadID);
   } else {
    api.sendMessage(" ⚠️ | لقد تم بالفعل إيقاف الإرسال التلقائي لمقاطع الفيديو بالفعل في هذه المجموعة.", threadID);
   }
  }
};