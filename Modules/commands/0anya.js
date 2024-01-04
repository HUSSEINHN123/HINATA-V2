const fonts = "/cache/Play-Bold.ttf"
const downfonts = "https://drive.google.com/u/0/uc?id=1uni8AiYk7prdrC7hgAmezaGTMH5R8gW8&export=download"
const fontsLink = 20
const fontsInfo = 28
const colorName = "#00FF00"
module.exports.config = {
  name: "بطاقة_كيوت",
  version: "2.0.1",
  hasPermssion: 0,
  credits: "𝐃𝐚𝐫𝐤 𝐑𝐮𝐥𝐞𝐱 𝐊𝐢𝐧𝐠 𝐀𝐧𝐮𝐩",
  description: "قم بإنشاء بطاقة معلومات ب ستايل كيوت ",
  commandCategory: "معلومات",
  usages: "",
  cooldowns: 10,
  dependencies: {
    canvas: "",
    axios: "",
    "fs-extra": "",
  },
};

module.exports.circle = async (image) => {
  const jimp = global.nodemodule["jimp"];
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}
module.exports.run = async function ({ api, event, args, Users }) {
  if ((this.config.credits) != "𝐃𝐚𝐫𝐤 𝐑𝐮𝐥𝐞𝐱 𝐊𝐢𝐧𝐠 𝐀𝐧𝐮𝐩") { return api.sendMessage(`⚡️Detected credits have been changed`, event.threadID, event.messageID)}
  let { senderID, threadID, messageID } = event;
  const { loadImage, createCanvas } = require("canvas");
  const request = require('request');
  const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
  const Canvas = global.nodemodule["canvas"];
  let pathImg = __dirname + `/cache/${senderID}123${threadID}.png`;
  let pathAvata = __dirname + `/cache/avtuserrd.png`;
  /*                 */
  if(event.type == "message_reply") { uid = event.messageReply.senderID }
    else uid = event.senderID;
const res = await api.getUserInfoV2(uid);
  let getAvatarOne = (await axios.get(`https://graph.facebook.com/${uid}/picture?height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  let bg = (
    await axios.get(encodeURI(`https://imgur.com/kSfS1wX.png`), {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
  avataruser = await this.circle(pathAvata);
  fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

/*-----------------download----------------------*/
if(!fs.existsSync(__dirname+`${fonts}`)) { 
      let getfont = (await axios.get(`${downfonts}`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+`${fonts}`, Buffer.from(getfont, "utf-8"));
    };
/*---------------------------------------------*/

  let baseImage = await loadImage(pathImg);
  let baseAvata = await loadImage(avataruser);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseAvata, 50, 130, 270, 270);
/*if (!res.location || res.location === "Không Xác Định") res.location = "Not Found";
  if (!res.birthday || res.birthday === "Không Xác Định") res.birthday = "Not Found";
if (!res.relationship_status || res.relationship_status === "Không Xác Định") res.relationship_status = "Not Found";
  if (!res.follow || res.follow === "Không Xác Định") res.follow = "Not Found";*/
if (!res.relationship_status || res.relationship_status === "لم يتم العثور عليه") res.relationship_status = "لم يتم العثور عليه";
        if (!res.follow || res.follow === "لم بتم العثور عليه) res.follow = "Not Found";
        if (!res.birthday || res.birthday === "Khôngلا يوجد أي بيانات. ") res.birthday = "لا أي بيانات،
  
  
    var gender = res.gender == 'male' ? "Male" : res.gender == 'female' ? "Female" : "Not public";
    var birthday = res.birthday ? `${res.birthday}` : "Information Hidden";
  //var love = res.relationship_status ? `${res.relationship_status}` : "Single"
  var love = res.relationship_status ? `${res.relationship_status}` : "ليس عام"
    var location = res.location.name ? `${res.location.namd}` : "معلومات خاصة"
  Canvas.registerFont(__dirname+`${fonts}`, {
        family: "Play-Bold"
    });
  ctx.font = `${fontsInfo}px Play-Bold`;
  ctx.fillStyle = "#D3D3D3";
  ctx.textAlign = "start";
  fontSize = 22;
  ctx.fillText(`الإسم الأول : ${res.name}`, 410, 172);
  ctx.fillStyle = "#99CCFF";
  ctx.textAlign = "start";
  fontSize = 22;
  ctx.fillText(`Sex: ${gender}`, 410, 208);
ctx.fillStyle = "#FFFFE0";
  ctx.textAlign = "start";
  fontSize = 22;
  ctx.fillText(`المتابعون: ${res.follow} followers`, 410, 244);
  ctx.fillStyle = "#FFE4E1";
  ctx.textAlign = "start";
  fontSize = 22;
  ctx.fillText(`في علاقة مع: ${love}`, 410, 281);
  ctx.fillStyle = "#9AFF9A";
  ctx.textAlign = "start";
  fontSize = 22;
  ctx.fillText(`تاريخ الإزدياد: ${birthday}`, 410, 320);
  ctx.fillStyle = "#FF6A6A";
  ctx.textAlign = "start";
  fontSize = 22;
  ctx.fillText(`الموقع: ${location}`, 410, 357);
ctx.fillStyle = "#EEC591";
  ctx.textAlign = "start";
  fontSize = 22;
  ctx.fillText(`آيدي فيسبوك: ${uid}`, 410, 397);
  ctx.font = `${fontsLink}px Play-Bold`;
  ctx.fillStyle = "#FFBBFF";
  ctx.textAlign = "start";
  fontSize = 23;  
  ctx.fillText(`رابط فيسبوك: ${res.link}`, 30, 450);
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  fs.removeSync(pathAvata);
  
  return api.sendMessage(
    { attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};