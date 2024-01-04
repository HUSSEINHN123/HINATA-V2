module.exports.config = {
  name: "تيك_توك",
  version: "1.0.0",
  hasPermission: 0,
  credits: "libyzxy0",
  description: "قم بتحميل فيديو عن طريق الرابط.",
  commandCategory: "وسائط",
  usages: "[]",
  cooldowns: 0,
  usePrefix:true,
  dependencies: {}
};
 
module.exports.run = async function({ api, event, args }) {
 
  const { messageID, threadID } = event;
  const fs = require("fs");
  const axios = require("axios");
  const request = require("request");
  const prompt = args.join(" ");
   if (!prompt[0])
 api.sendMessage(" ⏱️ | جاري التنزيل ⬇️...", threadID, messageID);
 try {
  const data = await axios.get(`https://tiktok-dl.libyzxy0.repl.co?url=${prompt}`);
   const path = __dirname + `/cache/tkdl/tiktokdl.mp4`;
  const file = fs.createWriteStream(path);   
  const url = data.data.url;
  const userName = data.data.user.unique_id;
  const rqs = request(encodeURI(url));
  rqs.pipe(file);  
  file.on('finish', () => {
      return api.sendMessage({
        body: `تم التحميل بنجاح ✅. \nالمستخدم: \n\n@${userName}`,
        attachment: fs.createReadStream(path)
      }, threadID);
          });
            } catch (err) {
  return api.sendMessage(`خطأ: ${err}`, threadID, messageID);
   }
       }