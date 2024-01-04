module.exports.config = {
    name: "تحويل_إلى_أنمي",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Who's Deku",
    description: "فيلتر انمي",
    commandCategory: "صور",
    usages: "[قم بالرد على صورة أو رابط]",
    cooldowns: 1,
};
const axios = require("axios")
const fs = require("fs");
module.exports.run = async function({ api, event, args }) {
const { threadID, messageID } = event;
if (event.type == "message_reply"){
var t = event.messageReply.attachments[0].url
} else {
 var t = args.join(" ");
}
try {
api.sendMessage(" ⏱️ | جاري تحويل الصورة إلى أنمي يرحى الإنتظار ...", threadID, messageID);
    const r = await axios.get("https://free-api.ainz-sama101.repl.co/canvas/toanime?", {
                params: {
                    url: encodeURI(t)
    }
});
const result = r.data.result.image_data;
    let ly = __dirname+"/cache/anime.png";
    let ly1 = (await axios.get(result, {
    responseType: "arraybuffer"
  })).data;
  fs.writeFileSync(ly, Buffer.from(ly1, "utf-8"));
    return api.sendMessage({attachment: fs.createReadStream(ly)}, threadID, () => fs.unlinkSync(ly), messageID)
  } catch (e){
        console.log(e.message);
          return api.sendMessage("  ❌ | .حدث خطأ المرجو إعادة المحاولة لاحقا.\n"+e.message, threadID, messageID)
   }
}