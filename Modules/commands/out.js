module.exports.config = {
    name: "غادري",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Kanichi",
    description: "مغادرة المجموعة",
    usePrefix: true,
    commandCategory: "المالك",
    usages: "غادري [آيدي المجموعة]",
    cooldowns: 10,
};

module.exports.run = async function({ api, event, args }) {
        if (!args[0]) return api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
        if (!isNaN(args[0])) return api.removeUserFromGroup(api.getCurrentUserID(), args.join(" "));
}