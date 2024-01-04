/*Wag nyo palitan credits mga bwakanangshit.*/
module.exports.config = {
  name: "معلوماتي",
  version: "1.0.0",
  hasPermssion: 0, //تم تعيين الإذن على 1 إذا كنت تريد مسؤول gc ومسؤول الروبوت فقط، واضبطه على 2 إذا كنت تريد مسؤول الروبوت فقط 
  credits: "Joshua Sy", /*لا تغير الاعتمادات يا غبي (2).*/
  description: "عرض معلومات مستخدمي الفيسبوك",
  commandCategory: "المجموعة",
  usages: "رد على رسالة أو إعمل منشن ",
  cooldowns: 0 //ترطيب
};
module.exports.run = async function({ api, event, args }) {
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
     if(!args[0]){
    if(event.type == "message_reply") { uid = event.messageReply.senderID }
    else uid = event.senderID;
   const res = await axios.get(`https://manhict.tech/api/fbInfo?id=${uid}&apikey=lgG765KO`); //لا يوجد سوى حد 500، ثم عند استخدام 500، انتظر 12 ساعة مرة أخرى :3
    var id = res.data.result.id; 
    var name = res.data.result.name; 
    var fname = res.data.result.firstName;
    var username = res.data.result.vanity; 
    var bday = res.data.result.birthday;
    var f = res.data.result.follow;
    var url = res.data.result.profileUrl;
    var ht = res.data.result.hometown;
    var loc = res.data.result.location;
    var rs = res.data.result.love;
    var quotes = res.data.result.quotes;
    var data = res.data.result.thumbSrc;
    var callback = () => api.sendMessage({body:`الإسم: ${name}\nالإسم الأول: ${fname}\nإسم المستخدم: ${fname}\nتاريخ الإزدياد: ${bday}\nالمتابعون: ${f}\nالموقع: ${loc}\nالعلاقة: ${rs}\nرابط البروفايل: ${url}\nمسقط الرأس: ${ht}\nمعرف المستخدم: ${id}`,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=463372798834978|csqGyA8VWtIhabZZt-yhEBStl9Y`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',
        () => callback());
   }

    else {
    if (args.join().indexOf('@') !== -1){
    var mentions = Object.keys(event.mentions)
    const res = await axios.get(`https://manhict.tech/api/fbInfo?id=${mentions}&apikey=lgG765KO`);
    var id = res.data.result.id;
    var name = res.data.result.name;
    var fname = res.data.result.firstName;
    var username = res.data.result.vanity;
    var bday = res.data.result.birthday;
    var f = res.data.result.follow;
    var url = res.data.result.profileUrl;
    var ht = res.data.result.hometown;
    var loc = res.data.result.location;
    var rs = res.data.result.love;
    var quotes = res.data.result.quotes;
    var data = res.data.result.thumbSrc;
    var callback = () => api.sendMessage({body:`الإسم: ${name}\nالإسم الأول: ${fname}\nإسك المستخدم فيسبوك: ${fname}\nBirthday: ${bday}\nالمتابعون: ${f}\nLocation: ${loc}\nالعلاقة: ${rs}\nرابط البروفايل: ${url}\nمسقط الرأس: ${ht}\nمعرف المستخدم: ${id}`,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?height=1500&width=1500&access_token=463372798834978|csqGyA8VWtIhabZZt-yhEBStl9Y`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',
        () => callback());
    }
    else {
    const res = await axios.get(`https://manhict.tech/api/fbInfo?id=${args[0]}&apikey=lgG765KO`);
    var id = res.data.result.id;
    var name = res.data.result.name;
    var fname = res.data.result.firstName;
    var username = res.data.result.vanity;
    var bday = res.data.result.birthday;
    var f = res.data.result.follow;
    var url = res.data.result.profileUrl;
    var ht = res.data.result.hometown;
    var loc = res.data.result.location;
    var rs = res.data.result.love;
    var quotes = res.data.result.quotes;
    var data = res.data.result.thumbSrc;
    var callback = () => api.sendMessage({body:`الإسم: ${name}\nالإسم الأول: ${fname}\nإسم المستخدم فيسبوك: ${fname}\nتاريخ الإزدياد: ${bday}\nالمتابعون: ${f}\nالموقع: ${loc}\nالعلاقة: ${rs}\nرابط البروفايل: ${url}\nمسقط الرأس: ${ht}\nمعرف المستخدم: ${id}`,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${args[0]}/picture?height=1500&width=1500&access_token=463372798834978|csqGyA8VWtIhabZZt-yhEBStl9Y`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',
        () => callback());
    }
  }
  }


/*remade and fix by Joshua Sy pogi UWUW*/