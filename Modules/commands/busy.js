module.exports.config = {
	name: "مشغول",
	version: "1.0.0",
	permissions: 1,
	credits: "Henry",
	description: "تشغيل وضع مشغول أو إطفائه",
  usages: "[السبب]",
  commandCategory: "خدمات",
  cooldowns: 5
};

const busyPath = __dirname + '/cache/busy.json';
const fs = require('fs');

module.exports.onLoad = () => {
  if (!fs.existsSync(busyPath)) fs.writeFileSync(busyPath, JSON.stringify({}));
}

module.exports.handleEvent = async function({ api, event, Users }) {
    let busyData = JSON.parse(fs.readFileSync(busyPath));
    var { senderID, threadID, messageID, mentions } = event;
    if (senderID in busyData) {
        var info = busyData[senderID];
        delete busyData[senderID];
        fs.writeFileSync(busyPath, JSON.stringify(busyData, null, 4));
        return api.sendMessage(`أهلا بعودتك! 🥰`, threadID, () => {
            if (info.tag.length == 0) api.sendMessage("عندما لم تكن في المجموعة لم يقم أحد بعمل منشن لكفي رسالة", threadID);
            else {
                var msg = "";
                for (var i of info.tag) {
                    msg += `${i}\n`
                }
                api.sendMessage("إليك قائمة الرسائل التي تم عمل منشن لك بها عندما لم تكن:\n\n" + msg, threadID)
            }
        }, messageID);
    }

    if (!mentions || Object.keys(mentions).length == 0) return;
    
    for (const [ID, name] of Object.entries(mentions)) {
        if (ID in busyData) {
            var infoBusy = busyData[ID], mentioner = await Users.getNameUser(senderID), replaceName = event.body.replace(`${name}`, "");
            infoBusy.tag.push(`${mentioner}: ${replaceName == "" ? "تم عمل منشن لك مرة واحدة" : replaceName}`)
            busyData[ID] = infoBusy;
            fs.writeFileSync(busyPath, JSON.stringify(busyData, null, 4));
            return api.sendMessage(`${name.replace("@", "")} هو مشغول حاليا${infoBusy.lido ? ` و السبب: ${infoBusy.lido}.` : "."}`, threadID, messageID);
        }
    }
}

module.exports.run = async function({ api, event, args, Users }) {
	await new Promise(resolve => setTimeout(resolve, 1000));
    let busyData = JSON.parse(fs.readFileSync(busyPath));
    const { threadID, senderID, messageID, body } = event;
    var content = args.join(" ") || "";
    if (!(senderID in busyData)) {
        busyData[senderID] = {
            lido: content,
            tag: []
        }
        fs.writeFileSync(busyPath, JSON.stringify(busyData, null, 4));
        var msg = (content.length == 0) ? 'لقد تم تفعيل و وض مشغول من دون سبب' : `تم تفعيل وضع مشغول مع السبب: ${content}`;
        return api.sendMessage(msg, threadID, messageID);
    }
}