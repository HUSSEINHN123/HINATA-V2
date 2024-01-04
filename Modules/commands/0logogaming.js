module.exports.config = {
	name: "شعار_الألعاب",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "ZiaRein",
	description: "قم بتحويل النص الخاص بك إلى شعار ذيد",
	commandCategory: "لعبة",
	depndencies: {"to-zalgo":""},
	usages: "شعار_الألعاب [نص]",
	cooldowns: 5
};

module.exports.run = ({ api, event, args }) => {
  const Zalgo = require("to-zalgo");
  return api.sendMessage(Zalgo(args.join(" ")), event.threadID, event.messageID);
}