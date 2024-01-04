module.exports.config = {
    name: "تسمية_البوت",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "CatalizCS",
    description: "قم بتغيير لقب البوت في المجموعة",
    commandCategory: "النظام",
    usages: "[اللقب يجب أن يكون قد تم كتابته]",
    cooldowns: 2,
};

module.exports.run = async ({ event, api, global, args, Threads, client }) => {
    const custom = args.join(" "),
            allThread = await Threads.getAll(["threadID"]),
            idBot = api.getCurrentUserID();
    var threadError = [],
        count = 0;
    if (custom.length != 0) {
        for (const idThread of allThread) {
            api.changeNickname(custom, idThread.threadID, idBot, (err) => (err) ? threadError.push(idThread.threadID) : '');
            count+=1;
await new Promise(resolve => setTimeout(resolve, 500));
        }
return api.sendMessage(`تم تغيير إسم البوت بنجاح في ${count} مجموعة`, event.threadID, () => {
if (threadError != 0) return api.sendMessage("[!] لا يمكن تغيير اللقب في" + threadError.lenght + " مجموعة",event.threadID, event.messageID)
        }, event.messageID);
    }
    else {
for (const idThread of allThread) {
const threadSetting = client.threadSetting.get(idThread.threadID) || {};
api.changeNickname(`[ ${(threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "Made by CatalizCS and SpermLord" : global.config.BOTNAME}`, 
idThread.threadID, idBot, (err) => (err) ? threadError.push(idThread.threadID) : '');
            count+=1;
await new Promise(resolve => setTimeout(resolve, 500));
        }
 return api.sendMessage(`تم تغيير لقب بنجاح في  ${count} مجموعة`, event.threadID, () => {
if (threadError != 0) return api.sendMessage("[!] لا يمكن تغيير اللقب في " + threadError.length + " مجموعة",event.threadID, event.messageID)
        }, event.messageID);
    }
  }