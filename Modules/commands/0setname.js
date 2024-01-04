module.exports.config = {
	name: "تغيير_اللقب",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "قم بتغيير اللقب في مجموعتك أو الشخص الذي تقوم لعمل منشن عليه",
	commandCategory: "المجموعة",
	usages: "[الإسم]",
	cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
	const name = args.join(" ")
	const mention = Object.keys(event.mentions)[0];
	if (!mention) return api.changeNickname(`${name}`, event.threadID, event.senderID);
	if (mention[0]) return api.changeNickname(`${name.replace(event.mentions[mention], "")}`, event.threadID, mention);
}
