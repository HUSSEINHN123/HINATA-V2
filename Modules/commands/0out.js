module.exports.config = {
  name: "غادري",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "HungCho",
  description: "خروج من المجموعة",
  commandCategory: "المالك",
  usages: "غادري [آيدي المجموعة]",
  cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
    const tid = args.join(" ")
   let namee = await api.getThreadInfo(tid)
  if (!tid) return api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);

else return api.removeUserFromGroup(api.getCurrentUserID(), tid, () => api.sendMessage("⚠️إشعار⚠️\nبإمر من مطوري سأغادر هذه المجموعة إعتنو بإنفسكم\nهيناتا البوت", event.threadID, event.messageID));

}