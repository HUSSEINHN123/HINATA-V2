module.exports.config = {
    name: "ظلمة",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Prince Sanel",
    description: `${global.config.PREFIX}ظلمة [الرقم الذي يمثل ظلام الصورة الخاص بك] [رابط] أو قم بالرد على صورة + ${global.config.PREFIX}ظلمة [عدد درجات الظلمة اللتي تريدها في صورتك]`,
    commandCategory: "صور",
    cooldowns: 0,
    dependencies: {
        "fs-extra": "",
        "request": ""
    }
};
module.exports.run = async ({ api, event,args }) => {  {
    
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
	 const { threadID, messageID, senderID, body } = event;
  const num = args[0];
  if (event.type == "message_reply"){
var t = event.messageReply.attachments[0].url
  }
  if (args[1]) {
  	var t = args.slice(1).join(' ');
  }
  if (num > 1000) return api.sendMessage("[!] | 15 هو الحد الأقصى.", event.threadID, event.messageID);
  if (isNaN(num)) return api.sendMessage("[⚠️] |أرجوك قم بإدخال عدد درجات الظلمة من 1 =» 15.", event.threadID, event.messageID);
    api.sendMessage("[⏱️] | جاري معالجة الصورة يرجى الإنتظار ...", event.threadID, event.messageID);

	 var callback = () => api.sendMessage({body:`تمت المعالجة بنجاح ✅:`,attachment: fs.createReadStream(__dirname + "/cache/darkness.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/darkness.png"),event.messageID);
	 return request(encodeURI(`https://sakibin.sinha-apiv2.repl.co/api/maker/darkness?url=${encodeURIComponent(t)}&no=${encodeURI(num)}&apikey=SAKIBIN-FREE-SY6B4X`)).pipe(fs.createWriteStream(__dirname+'/cache/darkness.png')).on('close',() => callback());     
}}