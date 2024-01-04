module.exports.config = {
    name: "عيدالميلاد",
    version: "1.0.0",
    hasPermission: 0,
    credits: "yukihira soma",
    description: "تحقق من عيد ميلاده في مجموعتك اليوم.",
    commandCategory: "المجموعة",
    usages: "من هو اللذي عيد ميلاده اليوم?",
  usePrefix:false,
    cooldowns: 10
};

const birthdayPath = __dirname + '/cache/birthday.json';
const fs = require('fs');

module.exports.onLoad = () => {
    if (!fs.existsSync(birthdayPath)) fs.writeFileSync(birthdayPath, JSON.stringify({}));
}

module.exports.handleEvent = async function ({ event, api }) {
    var { threadID, senderID } = event;
    let birthdayData = JSON.parse(fs.readFileSync(birthdayPath));
    if (!(senderID in birthdayData)) birthdayData[senderID] = { happyBirthday: false, time: Date.now() };
    if (birthdayData[senderID].happyBirthday && (Date.now() - birthdayData[senderID].time > 31556952000)) birthdayData[senderID].happyBirthday = false;
    var userInfo = (await api.getUserInfo(senderID))[senderID] || "";
    if (!userInfo || userInfo.isBirthday == false || userInfo.isBirthday == true && birthdayData[senderID].happyBirthday == true) return;
    else {
        var msg = `🎂🎉عيد ميلاد سعيد ${userInfo.name}!\n\nأتمنى لك الحب العميق والسعادة، أتمنى لك الصحة الجيدة\nأتمنى لك حياة آمنة ومحظوظة🍀\n\n`;
        userInfo.gender == "Male" ? msg += `أتمنى لك الازدهار\nالآلاف من السعادة، و الكثير من الحب\nنختم القصيدة بأمنية واحدة\nأتمنى لك التوفيق والنجاح 🥰` : msg += `أتمنى لك الازدهار\nوأن تزيد الفرحة و السعادة يوما بعد يوم\nأتمنى لك كل الدفئ\nفي هذا العصر،  أتمنى أن تجد ثروة الحياة.`;
        birthdayData[senderID] = {
            happyBirthday: true,
            time: Date.now()
        };
        fs.writeFileSync(birthdayPath, JSON.stringify(birthdayData, null, 4));
        var tag = {
            tag: userInfo.name,
            id: senderID
        }
        api.sendMessage({ body: msg, mentions: tag }, threadID);
    }
    return;
}

module.exports.run = async function ({ api, event, Users, Threads }) {
    var { threadID } = event;
    var threadData = await api.getThreadInfo(threadID) || "", tag = [], msg = "اليوم هو عيد ميلاد:\n\n", birthday = "", num = 0;
    if (!threadData) return api.sendMessage("البيانات المفقودة لتنفيذ هذا الأمر.", threadID);
    var members = threadData.userInfo;
    for (var i of members) {
        if (i.isBirthday == false) continue;
        if (i.isBirthday == true) {
            num++;
            birthday += `${num}. ${i.name}\n`;
            tag.push({
                tag: i.name,
                id: i.id
            });
        }
    }
    birthday ? msg += `${birthday}\nالجميع، تعالوا واحتفلوا بعيد ميلاد ${tag.length < 2 ? "ه/ها" : "هم"}.` : msg = "اليوم ليس عيد ميلاد أي عضو.";
    return tag.length > 0 ? api.sendMessage({ body: msg, mentions: tag }, threadID) : api.sendMessage(msg, threadID);
      }
        