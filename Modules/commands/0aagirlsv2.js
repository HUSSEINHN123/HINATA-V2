module.exports.config = {
  name: "بنات",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "HUSSEIN",
  description: "صورة فتاة عشوائية عند استخدام علامة الأمر",
  commandCategory: "متعة",
  usages: "بنات",
  usePrefix: true,
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
   var hi = [" إليك صور فتيات جميلات 🥰☺️ ♦️✨"];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [
    "https://i.imgur.com/MMcBfhQ.jpg",
"https://i.imgur.com/bFDiwev.jpg",
"https://i.imgur.com/SAOdnoK.jpg",
"https://i.imgur.com/TZ1RHnm.jpg",
"https://i.imgur.com/Ar8wDeL.jpg",
"https://i.imgur.com/edI973K.jpg",
"https://i.imgur.com/KeC6WlN.jpg",
"https://i.imgur.com/pZ1RYOa.jpg",
"https://i.imgur.com/Izft7RA.jpg",
"https://i.imgur.com/jM1Xpga.jpg",
"https://i.imgur.com/NTXJLbO.jpg",
"https://i.imgur.com/txJ9OsI.jpg",
"https://i.imgur.com/xBDRQj7.jpg",
"https://i.imgur.com/rfP4uLF.jpg",
"https://i.imgur.com/Srwy9OH.jpg",
"https://i.imgur.com/FjfTktc.jpg",
"https://i.imgur.com/54ZTqat.jpg",
"https://i.imgur.com/giWZT5C.jpg",
"https://i.imgur.com/9rvJ3NM.jpg",
"https://i.imgur.com/tCAVuec.jpg",
"https://i.imgur.com/6wd5DHO.jpg",
"https://i.imgur.com/7gK5Tf4.jpg",
"https://i.imgur.com/KvZrcw8.jpg",
"https://i.imgur.com/0B2akj2.jpg",
"https://i.imgur.com/MsPM3qs.jpg",
"https://i.imgur.com/cANGlUv.jpg",
"https://i.imgur.com/I0RUsfD.jpg",
"https://i.imgur.com/MF6y3P1.jpg",
"https://i.imgur.com/aeyKs27.jpg",
"https://i.imgur.com/W4II2pG.jpg",
"https://i.imgur.com/txL8OWM.jpg",
"https://i.imgur.com/MIJ9FWu.jpg",
"https://i.imgur.com/BXgOzif.jpg",
"https://i.imgur.com/UOsW7qy.jpg",
"https://i.imgur.com/oyhAzRg.jpg",
"https://i.imgur.com/CykGuoX.jpg",
"https://i.imgur.com/aVIuJ4x.jpg",
"https://i.imgur.com/l4mWqE2.jpg",
"https://i.imgur.com/39HVTF3.jpg",
"https://i.imgur.com/R3T4Rq7.jpg",
"https://i.imgur.com/bxId8wI.jpg",
"https://i.imgur.com/scxppXG.jpg",
"https://i.imgur.com/lDnPGOH.jpg",
"https://i.imgur.com/NRWxB4I.jpg",
"https://i.imgur.com/TdOhT1B.jpg",

];
	 var callback = () => api.sendMessage({body:`「 ${know} 」`,attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg"));	
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());
   };