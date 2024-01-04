module.exports.config = {
  name: "لكمة",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Mr.Aik3ro",
  description: "قم بلكم الشخص الممنشن",
  commandCategory: "متعة",
  usages: "لكمة [قم بعمل تاغ للشخص اللذي تريد أن تلكمه]",
  cooldowns: 5,
};


module.exports.run = async ({ api, event, args }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
    var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
  if (!args.join("")) return out("قم بعمل تاغ للشخص اللذي تريك لكمه 🥱");
  else
  return axios.get('https://api.satou-chan.xyz/api/endpoint/punch').then(res => {
        let getURL = res.data.url;
        let ext = getURL.substring(getURL.lastIndexOf(".") + 1);
        var mention = Object.keys(event.mentions)[0];
                  let tag = event.mentions[mention].replace("@", "");    
        
 let callback = function () {
            api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        api.sendMessage({
						        body: "في وجهك أيها القبيح 😎" + tag,
                                          mentions: [{
          tag: tag,
          id: Object.keys(event.mentions)[0]
        }],
						attachment: fs.createReadStream(__dirname + `/cache/punch.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/punch.${ext}`), event.messageID)
				};
 //   }
        request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/punch.${ext}`)).on("close", callback);
			})
    .catch(err => {
                     api.sendMessage("فشل تفعيل اللكمة قم بالمحاولة لاحقا !", event.threadID, event.messageID);
    api.setMessageReaction("☹️", event.messageID, (err) => {}, true);
                  })     
                                                      }
    