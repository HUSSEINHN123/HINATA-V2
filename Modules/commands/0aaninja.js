module.exports.config = {
	name: "نينجا",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "ZiaRein",
	description: "قم بتغيير إسمك إلى إسم الميمجا الخاص بك",
  usages: "[الإسم]",
	commandCategory: "خدمات",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let ZiaRein = args.join(" ");
const ZiaReinn = await axios.get(`https://docs-jojo.herokuapp.com/api/ninja_name?name=${ZiaRein}`);
var ZiaRein1 = ZiaReinn.data.result;
return api.changeNickname(`${ZiaRein1}`, event.threadID, event.messageID)
}
