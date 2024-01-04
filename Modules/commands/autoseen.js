module.exports.config = {
	name: "الرؤية_التلقائية",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "alice",
	description: "إدراك المجموعة",
	commandCategory: "النظام",
  usages: "",
	cooldowns: 0
};

module.exports.handleEvent = async ({ api, event, args }) => {
    api.markAsReadAll(() => {});
};

module.exports.run = async function({}) {}