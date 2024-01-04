module.exports.config = {
  name: "لعبة_الذاكرة",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "NTKhang",
  description: "لعبة الذاكرة قم بإختبار ذاكرتك مع لعبة الذاكرة",
  commandCategory: "لعبة",
  usages: "[مستوى](من 1 إلى 20)",
  cooldowns: 5,
  dependencies: {"canvas": "", "axios": ""}
};

const { registerFont, loadImage, createCanvas, Canvas } = global.nodemodule["canvas"];
const fs = global.nodemodule["fs-extra"];
const axios = global.nodemodule["axios"];
const path = global.nodemodule["path"];

function wrapText(ctx, text, maxWidth) {
  if (ctx.measureText(text).width < maxWidth) return [text];
  if (ctx.measureText('W').width > maxWidth) return null;
  const words = text.split(' ');
  const lines = [];
  let line = '';
  while (words.length > 0) {
    let split = false;
    while (ctx.measureText(words[0]).width >= maxWidth) {
      const temp = words[0];
      words[0] = temp.slice(0, -1);
      if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
      else {
        split = true;
        words.splice(1, 0, temp.slice(-1));
      }
    }
    if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) line += `${words.shift()} `;
    else {
      lines.push(line.trim());
      line = '';
    }
    if (words.length === 0) lines.push(line.trim());
  }
  return lines;
}

module.exports.handleEvent = async function({ api, event, args }) {
  if(!global.client.gamememory) return;
  const { body, senderID, messageID, threadID } = event;
  const gamememory = global.client.gamememory;
  if(gamememory.has(event.senderID.toString())) {
    const result1 = body;
    const resulttrue = gamememory.get(senderID);
    if(resulttrue.toLowerCase() === result1.toLowerCase()) {
      api.sendMessage("تهانيا لقد فزت 🥳", threadID, messageID);
    } else {
      api.sendMessage(`آسف لكنك خسرت 😔: ${resulttrue.toUpperCase()}`, threadID, messageID);
    }
    global.client.gamememory.delete(senderID);
  }
};

module.exports.run = async function({ api, event, args }) {
  if (!args[0]) return api.sendMessage("المستوى اللذي إخترت يجب أن يكون بين  (1-20)", event.threadID, event.messageID);
  if (isNaN(args[0]) || args[0] < 1 || args[0] > 20) return api.sendMessage("يجب أن يكون المستوى الذي تختاره ضمن النطاق 1 -> 20", event.threadID, event.messageID);

  const level = args[0];

  const imgrd = "https://i.ibb.co/MZgPTtV/IMG-20210622-185316.jpg";
  const getimg = (await axios.get(imgrd, { responseType: "arraybuffer" })).data;
  const pathImg = path.join(__dirname, '/cache/memorygame.png');
  fs.writeFileSync(pathImg, Buffer.from(getimg, "utf-8"));

  const memorize = genArray(level);
  const memorytext1 = memorize.map(word => word.toUpperCase()).join(' ');

  let baseImage = await loadImage(pathImg);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  const __root = path.resolve(__dirname, "cache", "rank");

  registerFont(path.join(__dirname, "/cache/memory.ttf"), {
    family: "NTK",
    weight: "regular",
    style: "normal"
  });

  ctx.font = "19px NTK";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  const memorytext2 = wrapText(ctx, memorytext1, baseImage.width);

  ctx.fillText((await memorytext2).join("\n"), baseImage.width/2, baseImage.height/2);
  ctx.beginPath();

  const imageBuffer = canvas.toBuffer();

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  fs.writeFileSync(pathImg, imageBuffer);

  return api.sendMessage(
    { body: "لديك 10 ثواني لتخمين الكلمة للصورة أسفله!!", attachment: fs.createReadStream(pathImg) }, event.threadID, async (e, info) => {
      fs.unlinkSync(pathImg);
      await delay(10000);
      api.unsendMessage(info.messageID);
      if(!global.client.gamememory) global.client.gamememory = new Map();
      global.client.gamememory.set(event.senderID.toString(), memorytext1);
    },
    event.messageID
  );
};

function genArray(level) {
  const sourceArr = [colors, directions, fruits, onepieces, animals][Math.floor(Math.random() * 3)];
  const arr = [];
  for (let i = 0; i < level; i++) arr.push(sourceArr[Math.floor(Math.random() * sourceArr.length)]);
  return arr;
}
