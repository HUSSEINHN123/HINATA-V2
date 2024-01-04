module.exports.config = {
    name: "دمج",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Deku",
    description: "قم بدمج إثنان من الإيموجي",
    usePrefix: true,
    commandCategory: "خدمات",
    usages: "[إيموجي1 | إيموحي2]",
    cooldowns: 0,
    dependencies: {
        "fs-extra": "",
        "request": ""
    }
};

module.exports.run = async ({ api, event, args }) => {
    const fs = require("fs-extra");
    const request = require("request");
    const { threadID, messageID, senderID, body } = event;

    try {
        if (!args[0]) {
            return api.sendMessage("صيغة حاطئة!\nإستخدم " + global.config.PREFIX + this.config.name + " " + this.config.usages, event.threadID, event.messageID);
        }

        const content = args.join(" ").split("|").map(item => item.trim());
        let emoji1 = content[0];
        let emoji2 = content[1];

        let callback = () => api.sendMessage({ body: `إليك النتيجة بعد الدمج`, attachment: fs.createReadStream(__dirname + "/cache/biden.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/biden.png"), event.messageID);

        request(encodeURI(`https://sim.ainz-project.repl.co/canvas/emojimix?emoji1=${emoji1}&emoji2=${emoji2}`))
            .pipe(fs.createWriteStream(__dirname + '/cache/biden.png'))
            .on('close', () => callback());
    } catch (err) {
        return api.sendMessage("لايمكن الدمج بين " + emoji1 + " و " + emoji2, event.threadID, event.messageID);
    }
};
//module.exports.handleEvent = async ({ event, api, Currencies, Users, args, utils, global, client }) => {
   // const fs = require("fs");
   // let { threadID, messageID, senderID, body } = event;
    //const thread = global.data.threadData.get(threadID) || {};
    //if (typeof thread["emojimix"] !== "undefined" && thread["emojimix"] == false) return;