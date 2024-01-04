/** Đổi Credit ? Bọn t đã không mã hóa cho mà edit rồi thì tôn trọng nhau tý đi ¯\_(ツ)_/¯ **/
module.exports.config = {
  name: "كاكاروتو",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Md jahid hasan Rajib",
  description: "صور من انمي دراغون بول لشخصية كاكاروتو",
  commandCategory: "صور",
  usages: "كاكاروتو",
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
   var hi = ["صور لكاكاروتو (غوغو)\nتاغ@:دراغو بول" ];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [
  "https://i.imgur.com/pRUWFtc.jpg",
"https://i.imgur.com/Pqw7F3y.jpg",
"https://i.imgur.com/mGH9bzf.jpg",
"https://i.imgur.com/mQQkXaO.jpg",
"https://i.imgur.com/LdqbY7S.jpg",
"https://i.imgur.com/jYToDOw.jpg",
"https://i.imgur.com/zuCBuAv.jpg",
"https://i.imgur.com/ExGmp2u.jpg",
"https://i.imgur.com/yC4YsBe.jpg",
"https://i.imgur.com/r9fqUMe.jpg",
"https://i.imgur.com/cQTa58H.jpg",
"https://i.imgur.com/3KblA2s.jpg",
"https://i.imgur.com/RMfbH6f.jpg",
"https://i.imgur.com/QsN3WBq.jpg",
"https://i.imgur.com/6h34NmT.jpg",
"https://i.imgur.com/d2bYR2Q.jpg",
"https://i.imgur.com/OS52FeP.jpg",
"https://i.imgur.com/Ada0hiA.jpg",
"https://i.imgur.com/pwpYIVu.jpg",
"https://i.imgur.com/dTzFWiU.jpg",
"https://i.imgur.com/vNUmQHW.jpg",
"https://i.imgur.com/jVicBBB.jpg",
"https://i.imgur.com/44zzEMX.jpg",
"https://i.imgur.com/GGz00b2.jpg",
"https://i.imgur.com/OViV13g.jpg",
"https://i.imgur.com/UkUoYPn.jpg",
"https://i.imgur.com/Rkqv06R.jpg",
"https://i.imgur.com/Jif4ow1.jpg",
"https://i.imgur.com/Uex9J4p.jpg",
"https://i.imgur.com/1PiPPbw.jpg",
"https://i.imgur.com/6gEQNLf.jpg",
"https://i.imgur.com/Df3ChPA.jpg",
"https://i.imgur.com/kpM9i3F.jpg",
"https://i.imgur.com/Py3xXyw.jpg",
"https://i.imgur.com/4tiS1g7.jpg",
"https://i.imgur.com/kaMrPxs.jpg",
"https://i.imgur.com/lTAHHnB.jpg",
"https://i.imgur.com/5AobCx4.jpg",
"https://i.imgur.com/0EAAXSG.jpg",
"https://i.imgur.com/mlTFsWV.jpg",
"https://i.imgur.com/Z78yfug.jpg",
"https://i.imgur.com/HpuOpLh.jpg",
"https://i.imgur.com/5qRpAME.jpg",
"https://i.imgur.com/1meFcwx.jpg",
"https://i.imgur.com/M5kzBn9.jpg",
"https://i.imgur.com/HYz91bc.jpg",
"https://i.imgur.com/8v8wPXj.jpg",
"https://i.imgur.com/4yEQa2I.jpg",
"https://i.imgur.com/H1aTkpF.jpg",
"https://i.imgur.com/UXAdpjR.jpg",
"https://i.imgur.com/6PiN7XT.jpg",
"https://i.imgur.com/P28iMhr.jpg",
"https://i.imgur.com/23xVEdJ.jpg",
"https://i.imgur.com/pszw7Nl.jpg",
"https://i.imgur.com/78IZdE5.jpg",
"https://i.imgur.com/cPPtE1m.jpg",
"https://i.imgur.com/vvDf6Yh.jpg",
"https://i.imgur.com/duiyK0C.jpg",
"https://i.imgur.com/G29gFum.jpg",
    


];
   var callback = () => api.sendMessage({body:`「 ${know} 」`,attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg"));	
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());
   };