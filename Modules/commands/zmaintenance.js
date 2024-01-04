module.exports.config = {
    name: "صيانة",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Jonell Magallanes",
    description: "الإعلان عن الأخطاء المستحقة لصيانة البوت",
  usePrefix: true,
    commandCategory: "النظام",
    cooldowns: 5,
};

module.exports.run = function({ api, event }) {
    var fs = require("fs");
    var request = require("request");

    api.getThreadList(30, null, ["INBOX"], (err, list) => {
        if (err) { 
            console.error("ERR: "+ err);
            return;
        }

        list.forEach(thread => {
            if(thread.isGroup == true && thread.threadID != event.threadID) {
                var link = "https://i.postimg.cc/NFdDc0vV/RFq-BU56n-ES.gif";  
                var callback = () => api.sendMessage({ 
                    body: ` ⏱️ | ${global.config.BOTNAME} البوت هو في طور الصيانة ، أرجوك تحلى بالصبر .....🔄`, 
                    attachment: fs.createReadStream(__dirname + "/cache/maintenance.gif")
                }, 
                thread.threadID, 
                () => { 
                    fs.unlinkSync(__dirname + "/cache/maintenance.gif");
                    console.log(`رسالة المعاينة تم إرسالها ${thread.threadID}. الآن اغلاق.`);
                    process.exit(); 
                });

                return request(encodeURI(link))
                    .pipe(fs.createWriteStream(__dirname + "/cache/maintenance.gif"))
                    .on("close", callback);
            }
        });
    });

    console.log("الروبوت الآن متوقف للصيانة.");
};