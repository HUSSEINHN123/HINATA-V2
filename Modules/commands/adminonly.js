const { writeFileSync, existsSync, readFileSync } = require("fs-extra");
const { resolve, join } = require("path");

module.exports.config = {
    name: "تقييد",
    version: "2.0",
    hasPermission: 1,
    credits: "Horizon Lucius",
    description: "تقييد إستخدام البوت عن طريق تشغيل و ضعية فقط المطور",
    commandCategory: "بطريق",
    usages: "تشغيل/إيقاف",
    cooldowns: 5
};

module.exports.onLoad = async function () {
    const path = resolve(global.client.mainPath, 'includes', 'AdminOnly.json');
    if (!existsSync(path)) {
        writeFileSync(path, "[]", "utf-8");
    }
};

module.exports.run = async function ({ api, event, args }) {
    const pathData = join(global.client.mainPath, 'includes', 'AdminOnly.json');
    const data = JSON.parse(readFileSync(pathData, "utf-8"));

    const thisThread = data.find(item => item.Misc === event.threadID) || { Misc: event.threadID, Status: 1, Onlist: [] };

    if (!data.some(item => item.Misc === event.threadID)) {
        data.push(thisThread);
        writeFileSync(pathData, JSON.stringify(data, null, 4), "utf-8");
    }

    if (thisThread.Status === 1) {
        thisThread.Status = 2;
        writeFileSync(pathData, JSON.stringify(data, null, 4), "utf-8");
        return api.sendMessage(" ✅ | تم تفعيل وضعية المطور فقط ولايمكن للآخرين إستخدام البوت", event.threadID);
    } else if (thisThread.Status === 2) {
        thisThread.Status = 1;
        writeFileSync(pathData, JSON.stringify(data, null, 4), "utf-8");
        return api.sendMessage(" ❌ | تم تعطيل وضعية المطور فقط و يمكن للجميع إستخدام البوت", event.threadID);
    } else {
        return api.sendMessage(" ⚠️ | لا يمكنك استخدام البوت حالياً، البوت في وضع التقييد", event.threadID);
    }
};
