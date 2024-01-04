module.exports.config = {
  name: "مقطع_فتيات",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Ralph", 
  description: "مجموعة من فيديوهات الفتيات",
  commandCategory: "متعة",
  cooldowns: 5
};
module.exports.run = async ({ api, event,}) => {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");

  api.sendMessage(`⏱️ | جاري تحميل فيديو فتيات المرجو الإنتظار.`, event.threadID, event.messageID);
axios.get('https://jeka-api.luabot24.repl.co/random/?apikey=ralph').then(res => {
  let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
  let callback = function () {
          api.sendMessage({
                                                body: ``,
            attachment: fs.createReadStream(__dirname + `/cache/random.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/random.${ext}`), event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/random.${ext}`)).on("close", callback);
      }) .catch(err => {
                     api.sendMessage("حالة خطأ في واجهة برمجة التطبيقات: 200", event.threadID, event.messageID);
    api.setMessageReaction("😢", event.messageID, (err) => {}, true);
                  })     
  }