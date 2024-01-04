module.exports.config = {
    name: "هولو",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Md Rajib",
    description: "معرض صور هولو",
    commandCategory: "متعة",
    usages: "[روشيا/بيكورا/كوكو/جورا/مارينا]",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  const { threadID, messageID } = event;
  var type;
  switch(args[0]) {
    case "روشيا":
    case "Rushia":
    type = "rushia";
    break;
    case "بيكورا":
    case "Pekora":
    case "peko":
    case "Peko":
    type = "pekora";
    break;
    case "كوكو": 
    case "Coco":
    type = "coco";
    break;
    case "جورا":
    case "Gura":
    case "gawr":
    case "Gawr":
    type = "gura";
    break;
    case "مارينا":
    case "Marine":
    case "Marin":
    type = "marine";
    break;
    default:
    return api.sendMessage(`=====Tags=====\nrushia, gura, coco, marine, pekora`, threadID, messageID);
    break;
  }
axios.get(`https://api.randvtuber-saikidesu.ml?character=${type}`).then(res => {
let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
    let callback = function () {
                    api.sendMessage({
                        body: `=== ${res.data.name} ===\nالمتاحة: ${res.data.count}\nالمؤلف: ${res.data.author}`,
                        attachment: fs.createReadStream(__dirname + `/cache/${type}.${ext}`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${type}.${ext}`), event.messageID);
   api.setMessageReaction("❤️", event.messageID, (err) => {}, true);
                };
                request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/${type}.${ext}`)).on("close", callback);
            })
    .catch(err => {
                     api.sendMessage(" ❌ |هناك مشكلة أثناء إنشاء الصورة، يرجى المحاولة مرة أخرى!", event.threadID, event.messageID);
    api.setMessageReaction("❌", event.messageID, (err) => {}, true);
                  })     
}