/** I am doing this coding with a lot of difficulty, please don't post it yourself¯\_(ツ)_/¯ **/
module.exports.config = {
  name: "مقطع_قرآن",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ছো্ঁট্টো্ঁ ন্ঁবা্ঁব্ঁ",
  description: "يرسل لك مقطع من القرآن",
  commandCategory: "إسلام",
  usages: "إسلام",
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
   var hi = ["إليك مقطع القرآن ☺️_\n\n\n_قم بالإستماع و التمعن في معاني الآيات 😌💖✨__\n\n\n"];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [
  "https://drive.google.com/uc?id=10bXR3lygrrxEjrOr_vWMZ4vzAWSo7NWO",
"https://drive.google.com/uc?id=10cDUTxeS6illRQ489-M7wogZWXdB-AXP",
"https://drive.google.com/uc?id=10ge84POilmHNDAL4ClyhAKuBeBEnyv_y",
"https://drive.google.com/uc?id=10o5mG_X750E_WHJEVAI5JqQUANGZF9Sa",
"https://drive.google.com/uc?id=10rg6vZzZkGNm1TQbBMW4poU5T7n6nsuG",
"https://drive.google.com/uc?id=115jDSolYDRAkAuUE4EqFTs-Jin9DUIJ5",
"https://drive.google.com/uc?id=11EWF-svUNozC8sfqbPY1JDy1oCU917C2",
"https://drive.google.com/uc?id=11GF4uTTFmOpkfoc7IiQmQ-03_KnVJnzr",
"https://drive.google.com/uc?id=11JIuQFNv1y7cnT-_1dNbrBopo6cOQwcV",
"https://drive.google.com/uc?id=11Nk5UX-WV83a7M-FMP8R11fvpiw7PSB8",
"https://drive.google.com/uc?id=11OP470ipIXo2lXssxVg5E7pIvQw2fFbE",
"https://drive.google.com/uc?id=11OznoAz0PTdeXHxF0Rf6TTva5PwfeWcJ",
"https://drive.google.com/uc?id=11bjlq7Qe4QCB6Rz8dipg-e6AFUnCs3l7",
"https://drive.google.com/uc?id=11aNEhe4toewtUqB6_uQWVxy2M5rVB0cZ",
"https://drive.google.com/uc?id=11UZVCC5gXyarq7Pen3E97h9ulCPTbT9E",
"https://drive.google.com/uc?id=11fOWgjgGst8RWe04tbYUlGGHigsRI51a",


];
     var callback = () => api.sendMessage({body:`「 ${know} 」`,attachment: fs.createReadStream(__dirname + "/cache/15.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/15.mp4"));    
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/15.mp4")).on("close",() => callback());
   };
 