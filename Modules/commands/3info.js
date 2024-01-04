module.exports.config = {
	name: "المطور",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "Joshua Sy", //don't change the credits please
	description: "معلومات البوت و المطور.",
	commandCategory: "معلومات",
	cooldowns: 1,
	dependencies: 
	{
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
const moment = require("moment-timezone");
var juswa = moment.tz("Africa/Casablanca").format("『D/MM/YYYY』 【HH:mm:ss】");
var link = ["https://i.imgur.com/h7Kqwrv.jpg", "https://i.imgur.com/UJ6OcoW.jpg", "https://i.imgur.com/coPTXAf.jpg", "https://i.imgur.com/GoAnlia.jpg", "https://i.imgur.com/FGU2ybB.jpg",
"https://i.imgur.com/1FZNMhw.png",
"https://i.imgur.com/ALGjy4r.jpg",
"https://i.imgur.com/TKjU7pY.jpg",    "https://i.imgur.com/QJcrtGx.jpg"];
var callback = () => api.sendMessage({body:`➢

مـٰعـ๋͜‏ـۂݪوُمـٰات اݪبـوُت وُ اݪمـٰطُوُࢪ ⁞✦⁽☻🔥₎“ٰۦ

-‘๑’- إسـٰٖـ๋͜ــمـٰ اݪبـوُت ⁽ཻ🖤₎: ${global.config.BOTNAME}
 
 ⍣ ೋ مـٰطُوُࢪ اݪبـوُت 🌸⇣: ${global.config.BOTCREATOR}

*ೃ༄ ࢪابـطُ فــ͡ـيسـٰٖـ๋͜ــبـوُڪ اݪمـٰطُوُࢪ 💜💭ֆ: ${global.config.CREATORLINK}

❂ آلرٰمـژ 💁‍♂️🔥“: ${global.config.PREFIX}

✫ ﺂﻟﺑﻟﮃ ‌‌🌐: ${global.config.NATIONALITY}

➟ ּمــدۃ اڸــٺــڜــڠــېْــڸ

✬ ̨اڸــﯧْــﯜم هــﯡۥ: ${juswa} 

➳ ۛ ּاڷــبــﯟټ ּٻــڃــڕﮯ ۖ إبــٺــداء̍ا مــن ۗ ${hours}:${minutes}:${seconds}.

✫ ۛ ּﯡڣــﮯ ۖ ا̍ڶــڼۨــﮪــٰٱ̍ڀــۃ ̨ڜــﯖــڕٰ̍ا̍ ﻋــڷــےۧ ̨إڛۣــٿــڂۡــدٰا̍مۘ ۗ ${global.config.BOTNAME} اڸــبــﯣٺ!`,attachment: fs.createReadStream(__dirname + "/cache/juswa.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/juswa.jpg")).on("close",() => callback());
   };