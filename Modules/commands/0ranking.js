module.exports.config = {
	name: "تصنيفي",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "SenProject/Adjusted by Draffodils",
	description: "تصنيفات الأعضاء عن طريق عدد الرسائل و نشاطهم في المجموعة",
	commandCategory: "النظام",
	usages: "تصنيفي",
	cooldowns: 15,
	dependencies: {
		"fs-extra": ""
	}
}

const path = __dirname + '/count-by-thread/';

module.exports.onLoad = () => {
    const fs = require('fs');
    if (!fs.existsSync(path) || !fs.statSync(path).isDirectory()) {
        fs.mkdirSync(path, { recursive: true });
    }
}

module.exports.handleEvent = function ({ event }) {
    const { messageID, threadID, senderID } = event;
    if (!global.data.allThreadID.some(tid => tid == threadID)) return;
    const fs = global.nodemodule['fs'];
    const threadPath = path + threadID + '.json';
    if (!fs.existsSync(threadPath) || fs.statSync(threadPath).isDirectory()) {
        fs.writeFileSync(threadPath, JSON.stringify({}, null, 4));
    }
    const getThreadJSON = JSON.parse(fs.readFileSync(threadPath)) || {};
    if (!getThreadJSON.hasOwnProperty(senderID)) {
        getThreadJSON[senderID] = 0;
    }
    getThreadJSON[senderID]++;
    fs.writeFileSync(threadPath, JSON.stringify(getThreadJSON, null, 4));
}


 const getRankName = count => {
    return count > 10000000 ? '🥇???🥇'
    :count > 500000 ? '🥈لا يمكن هزمه🥈'
        : count > 300000 ? '🥉يواجه المجهول🥉'
            : count > 113000 ? '🏆إشعاع III🏆'
                : count > 90000? '♟إشعاع II♟'
                    : count > 75000 ? '♣إشعاع I♣'
                        : count > 60000 ? '♥أسطوري♥'
                            : count > 50000 ? '♠جراند.ماستر متقدم  V♠'
                                : count > 40000 ? '🎲جراند ماستر متقدم  IV🎲'
                                    : count > 3000 ? '🥊جراند.ماستر متقدم  III🥊'
                                        : count > 24000 ? '🎗جراند.ماستر II🎗'
                                            : count > 19000 ? '✨جراند.ماستر I✨'
                                                : count > 18000 ? '🎖المجد الأسطوري V🎖'
                                                    : count > 17700 ? '🎀المجد الأسطوري IV🎀'
                                                        : count > 17500 ? '🎈المجد الأسطوري III🎈'
                                                            : count > 17300 ? '🎊المجد الأسطوري II🎊'
                                                                : count > 17000 ? '🪅المجد الأسطوري I🪅'
                                                                    : count > 16700 ? '🪄السيد الأعلى - في نهاية المطاف غراند ماستر🪄 '
                                                                        : count > 14900 ? '✴هيبة V - ألفا✴'
                                                                            : count > 11060 ? '🟢البلاتين I - هيبة IV🟢'
                                                                                : count > 5930 ? '🟡غراند ماستر II - أوميغا III🟡'
                                                                                    : count > 1540 ? '🟠ماستر IV - غراند ماستر II🟠'
                                                                                        : count > 740 ? '🔴ماستر I - III🔴'
                                                                                            : count > 730 ? '🔵نخبة V - محترف V🔵'
                                                                                                : count > 245 ? '⚫مبتدئ V - نخبة IV⚫'
                                                                                                    : '🟤مبتدئ I - IV🟤'
}



module.exports.run = async function ({ api, event, args, Users }) {
    const fs = global.nodemodule['fs'];
    const { messageID, threadID, senderID, mentions } = event;
    const threadPath = path + threadID + '.json';
    if (!fs.existsSync(threadPath) || fs.statSync(threadPath).isDirectory()) {
        fs.writeFileSync(threadPath, JSON.stringify({}, null, 4));
    }
    const query = args[0] ? args[0].toLowerCase() : '';
    const getThreadJSON = JSON.parse(fs.readFileSync(threadPath)) || {};
    if (!getThreadJSON.hasOwnProperty(senderID)) {
        getThreadJSON[senderID] = 1;
    }
    var storage = [],
        msg = '';
    if (query == 'all') {
        const allThread = await api.getThreadInfo(threadID) || { participantIDs: [] };
        for (id of allThread.participantIDs) {
            if (!getThreadJSON.hasOwnProperty(id)) {
                getThreadJSON[id] = 0;
            }
        }
    }
    for (const id in getThreadJSON) {
        const name = await Users.getNameUser(id);
        storage.push({ id, name, count: getThreadJSON[id] });
    }
    storage.sort((a, b) => {
        if (a.count > b.count) return -1;
        else if (a.count < b.count) return 1;
        else return a.name.localeCompare(b.name);
    });
    if (query == 'all') {
        let count = 1;
        msg += '===التصنيف💮===';
        for (const user of storage) {
            msg += `\n${count++}. ${user.name} - ${user.count}`;
        }
    } else if (query == 'rank') {
        msg += '0 رسالة)\nالذهب 4 (2500 رسالة)\nبلاتين 1 (2900 8000 رسالة)\nالماستر (9000 رسالة)\nجراند ماستر (50000 رسالة)'
    } else if (!query) {
        let userID = senderID;
        if (Object.keys(mentions).length > 0) {
            userID = mentions[0];
        }
        const rankUser = storage.findIndex(e => e.id == userID);
        msg += `${userID == senderID ? 'જ 💠الصديق' : storage[rankUser].name} تم تصنيفه ${rankUser + 1}\n  જ 💌عدد الرسائل: ${storage[rankUser].count}\n જ التصنيف 💮  ${getRankName(storage[rankUser].count)}`;
    }
    api.sendMessage(msg, threadID);
    return;
  }