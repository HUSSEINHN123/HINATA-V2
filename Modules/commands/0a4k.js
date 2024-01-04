module.exports.config = {
    name: "تحسين",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Who's Deku",
    description: "تحسين",
    commandCategory: "صور",
    usages: "[قم بالرد على صورة او رابط]",
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
api.sendMessage(" ⏱️ | جاري تحسين جودة الصورة يرجى الإنتظار...", threadID, messageID);
    const r = await axios.get("https://free-api.ainz-sama101.repl.co/canvas/remini?", {
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
          return api.sendMessage("  ❌ | حدث خطا ما يرجى المحاولة لاحقا.\n"+e.message, threadID, messageID)
   }
       }