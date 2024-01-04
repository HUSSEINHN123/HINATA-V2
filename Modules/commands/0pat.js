module.exports.config = {
  name: "تربيتة",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Mr.Aik3ro",
  description: "قم بالتربيت على صديقك  اللذي فمت بعمل تاغ عليه",
  commandCategory: "متعة",
  usages: "تربيتة [كنشن للشخص اللذي تريد أن تربت عليه]",
  cooldowns: 5,
};


module.exports.run = async ({ api, event, args }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
    var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
  if (!args.join("")) return out("أرجوك قم بعمل منشن على شخص ما");
  else
  return axios.get('https://api.satou-chan.xyz/api/endpoint/pat').then(res => {
        let getURL = res.data.url;
        let ext = getURL.substring(getURL.lastIndexOf(".") + 1);
        var mention = Object.keys(event.mentions)[0];
                  let tag = event.mentions[mention].replace("@", "");    
        
 let callback = function () {
            api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        api.sendMessage({
						        body: "تربيتة, " + tag + ". يوشي يوشي!",
                                          mentions: [{
          tag: tag,
          id: Object.keys(event.mentions)[0]
        }],
						attachment: fs.createReadStream(__dirname + `/cache/pat.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/pat.${ext}`), event.messageID)
				};
 //   }
        request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/pat.${ext}`)).on("close", callback);
			})
    .catch(err => {
                     api.sendMessage("فشل إنشاء صورة جيف، تأكد من وضع منشن على شخص ما!", event.threadID, event.messageID);
                  })     
}
  