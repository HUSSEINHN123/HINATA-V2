module.exports.config = {
  name: "لعق",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Pro",
  description: "لعق",
  commandCategory: "متعة",
  usages: "[تاغ]",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "path": "",
    "jimp": ""
  }
}

module.exports.onLoad = () => {
  const fs = require("fs-extra");
  const request = require("request");
  const dirMaterial = __dirname + `/cache/canvas/`;
  if (!fs.existsSync(dirMaterial + "canvas")) fs.mkdirSync(dirMaterial, { recursive: true });
  if (!fs.existsSync(dirMaterial + "liemnach.png")) request("https://i.imgur.com/dgg7t4Q.jpg").pipe(fs.createWriteStream(dirMaterial + "liemnach.png"));
}

async function makeImage({ one, two }) {
  try {
    const axios = require("axios");
    const fs = require("fs-extra");
    const path = require("path");
    const jimp = require("jimp");
    const __root = path.resolve(__dirname, "cache", "canvas");

    let liemnach_image = await jimp.read(__root + "/liemnach.png");
    let pathImg = __root + `/liemnach_${one}_${two}.png`;
    let avatarOne = __root + `/avt_${two}.png`;
    let avatarTwo = __root + `/avt_${one}.png`;

    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?height=720&width=720&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?height=720&width=720&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    liemnach_image.composite(circleOne.resize(220, 220), 316, 204).composite(circleTwo.resize(170, 170), 46, 584);

    let raw = await liemnach_image.getBufferAsync("image/png");

    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOne);
    fs.unlinkSync(avatarTwo);

    return pathImg;
  } catch (error) {
    console.error("حدث خطأ:", error);
    throw new Error("حدث خطأ أثناء إنشاء الصورة");
  }
}

async function circle(image) {
  try {
    const jimp = require("jimp");
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
  } catch (error) {
    console.error("حدث خطأ:", error);
    throw new Error("حدث خطأ أثناء إنشاء الدائرة");
  }
}

module.exports.run = async function ({ event, api, args }) {
  const fs = global.nodemodule["fs-extra"];
  const { threadID, messageID, senderID } = event;
  const mention = Object.keys(event.mentions);
  
  try {
    if (!mention[0]) throw new Error("الرجاء عمل منشن للشخص ما");
    
    const one = senderID, two = mention[0];
    const imagePath = await makeImage({ one, two });
    
    api.sendMessage({ body: "مارأيك/كي 😏", attachment: fs.createReadStream(imagePath) }, threadID, () => fs.unlinkSync(imagePath), messageID);
  } catch (error) {
    api.sendMessage(`❌ | حدث خطأ: ${error.message}`, threadID, messageID);
  }
}
