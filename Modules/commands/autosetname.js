module.exports.config = {
    name: "لقب_تلقائي",
    version: "1.0.1",
    hasPermssion: 1,
    credits: "BLACK",
    description: "ضبط الإسم تلقائيا للأعضاء الجدد",
    commandCategory: "مجموعة",
    usages: "[إضافة <إسم> /إزالة] ",
    cooldowns: 5
}

module.exports.onLoad = () => {
    const { existsSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
    const pathData = join(__dirname, "cache", "autosetname.json");
    if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8"); 
}

module.exports.run = async function  ({ event, api, args, permssionm, Users })  {
    const { threadID, messageID } = event;
    const { readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

    const pathData = join(__dirname, "cache", "autosetname.json");
    const content = (args.slice(1, args.length)).join(" ");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var thisThread = dataJson.find(item => item.threadID == threadID) || { threadID, nameUser: [] };
    switch (args[0]) {
        case "إضافة": {
            if (content.length == 0) return api.sendMessage("يجب ألا يتم إخلاء اسم العضو الجديد!", threadID, messageID);
            if (thisThread.nameUser.length > 0) return api.sendMessage("الرجاء إزالة اللقب القديم قبل تسمية اسم جديد!!!", threadID, messageID); 
            thisThread.nameUser.push(content);
            const name = (await Users.getData(event.senderID)).name
            writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
            api.sendMessage(`تم تكوين اسم عضو جديد بشكل ناجح\nالعرض: ${content} ${name}`, threadID, messageID);
            break;
        }
        case "حذف":
        case "إزالة":
        case "delete": {
                if (thisThread.nameUser.length == 0) return api.sendMessage("لم تقم مجموعتك بتكوين اسم عضو جديد!!", threadID, messageID);
                thisThread.nameUser = [];
                api.sendMessage(`تم حذف  اسم العضو الجديد بنجاح`, threadID, messageID);
                break;
        }
        default: {
                api.sendMessage(`إستخدم: لقب_تلقائي إضافة من أجل ضبط لقب للعضو الجديد\n: لقب_تلقائي من أجل إزالة لقب العضو الجديد تلقائيا`, threadID, messageID);
        }
    }
    if (!dataJson.some(item => item.threadID == threadID)) dataJson.push(thisThread);
    return writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
}