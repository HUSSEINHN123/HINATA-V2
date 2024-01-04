module.exports.config = {
  name: "ساعة_العالم",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Joshua Sy",
  description: "قم بالإطلاع على الوقت و التاريخ في بعض الدول العالم",
  commandCategory: "خدمات",
  cooldowns: 2
};
module.exports.run = async ({ api, event }) => {
  const axios = require('axios');
  const fetch = global.nodemodule["node-fetch"];
  const request = require('request');
  const fs = require("fs");
  const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
  var gio2 = moment.tz("Europe/Lodon").format("HH:mm:ss || D/MM/YYYY");
  var gio1 = moment.tz("America/Brasília").format("HH:mm:ss || D/MM/YYYY");
  var gio3 = moment.tz("Asia/Seoul").format("HH:mm:ss || D/MM/YYYY");
  var gio4 = moment.tz("Asia/Tokyo").format("HH:mm:ss || D/MM/YYYY");
  var gio5 = moment.tz("America/New_York").format("HH:mm:ss || D/MM/YYYY");
  var gio6 = moment.tz("Asia/Kuala_Lumpur").format("HH:mm:ss || D/MM/YYYY");var gio1 = moment.tz("America/New_York").format("HH:mm:ss || D/MM/YYYY");
  var gio7 = moment.tz("Europe/Paris").format("HH:mm:ss || D/MM/YYYY");
  var gio8 = moment.tz("Afica/Casablanca").format("HH:mm:ss || D/MM/YYYY");//add pa kayo kung gusto nyo
  axios.get('https://apituandz1407.herokuapp.com/api/gaisexy.php').then(res => {
 let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let callback = function () {
  api.sendMessage({
  body: `تاريخ والوقت في بعض الدول:\n-🇵🇭الفلبين: ${gio8}\n-🇲🇦 المغرب: ${gio}\n-🇬🇧 لندن: ${gio2}\n-🇺🇸 نيويورك: ${gio5}\n-🇰🇷 كوريا الجنوبية: ${gio3}\n-🇯🇵 توكيو: ${gio4}\n-🇧🇷 البرازيل: ${gio1}\n-🇲🇾 كوالا لمبور: ${gio6}\n-🇫🇷 فرنسا: ${gio7}`,
  attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
  }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), event.messageID);
   };
  request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
  })
}