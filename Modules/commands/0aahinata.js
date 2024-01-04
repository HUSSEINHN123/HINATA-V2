module.exports.config = {
  name: "زوجة_ناروتو",
  version: "1.0.0",
  hasPermission: 0,
  credits: "HUSSEIN",
  description: "يرسل صور هيناتا بجودة عالية",
  commandCategory: "صور",
  usages: "هيناتا",
  usePrefix: true,
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async ({ api, event, args, Users, Threads, Currencies }) => {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];

  const link = [
    "https://i.imgur.com/g40EBQp.jpg",
    "https://i.imgur.com/g40EBQp.jpg",
"https://i.imgur.com/vCSkkcr.jpg",
"https://i.imgur.com/OdI2iLZ.jpg",
"https://i.imgur.com/GgJ9zpO.jpg",
"https://i.imgur.com/TYssa7f.jpg",
"https://i.imgur.com/DxwzWCL.jpg",
"https://i.imgur.com/6hVN9z1.jpg",
"https://i.imgur.com/aPobU0g.jpg",
"https://i.imgur.com/Dm2CFjB.jpg",
"https://i.imgur.com/izcfZzm.jpg",
"https://i.imgur.com/EvFzFH1.jpg",
"https://i.imgur.com/bVwovnX.jpg",
"https://i.imgur.com/Z3gbeqz.jpg",
"https://i.imgur.com/bVt68o5.jpg",
"https://i.imgur.com/ntRfjtv.jpg",
"https://i.imgur.com/xedGyYX.jpg",
"https://i.imgur.com/HQxmqkk.jpg",
"https://i.imgur.com/koAtr5L.jpg",
"https://i.imgur.com/RyRZGzH.jpg",
"https://i.imgur.com/5Srqb8I.jpg",
"https://i.imgur.com/9ub6Mbi.jpg",
"https://i.imgur.com/nNzKTi9.jpg",
"https://i.imgur.com/vXuSDZa.jpg",
"https://i.imgur.com/FbnlpIw.jpg",
"https://i.imgur.com/qZ8SWQT.jpg",
"https://i.imgur.com/mMkzTqf.jpg",
"https://i.imgur.com/ztnZPsy.jpg",
"https://i.imgur.com/g6eR1eV.jpg",
"https://i.imgur.com/rxTGO0k.jpg",
"https://i.imgur.com/WsH6fxx.jpg",
"https://i.imgur.com/JcUhPr8.jpg",
"https://i.imgur.com/vhOIvHj.jpg",
"https://i.imgur.com/xeiKJN2.jpg",
"https://i.imgur.com/bCiSD8O.jpg",
"https://i.imgur.com/P7WfzJl.jpg",
"https://i.imgur.com/InsGTko.jpg",
"https://i.imgur.com/1hgoAzW.jpg",
"https://i.imgur.com/0lG0JeG.jpg",
"https://i.imgur.com/uTN4ANx.jpg",
"https://i.imgur.com/YmnTKMX.jpg",
"https://i.imgur.com/fA9OjYw.jpg",
    // ... أضف روابط الصور الأخرى هنا
  ];

  // Check if user has enough money
  const userCurrency = await Currencies.getData(event.senderID);
  const userMoney = userCurrency.money;

  if (userMoney < 1000) {
    return api.sendMessage("تحتاج الى 1000 دولار لرؤية صوري 😏", event.threadID, event.messageID);
  }

  // Deduct money
  Currencies.setData(event.senderID, { money: userMoney - 1000 });

  // Get random image link
  const randomImage = link[Math.floor(Math.random() * link.length)];

  // Send reaction
  api.setMessageReaction("😍", event.messageID, (err) => {
    if (err) console.error("Error setting reaction:", err);
  });

  // Send image
  const callback = () => {
    api.sendMessage({
      body: `صور هيناتا الجميلة 🥰     \nعدد الصور : ${link.length}\n-1000$ !`,
      attachment: fs.createReadStream(__dirname + "/cache/1.jpg")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"), event.messageID);
  };

  request(encodeURI(randomImage)).pipe(fs.createWriteStream(__dirname + "/cache/1.jpg")).on("close", callback);
};
