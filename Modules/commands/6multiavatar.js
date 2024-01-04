module.exports.config = {
    name: "صورة_رمزية",
    version: "2.0.0",
    hasPermission: 0,
    credits: "August Quinn",
    description: "أحصل على صورتك الرمزية إنطلاقا من إسمك",
    commandCategory: "الذكاء الإصطناعي",
    usages: "صورة_رمزية [الإسم]",
    cooldowns: 5
};

const axios = global.nodemodule['axios'];
const fs = global.nodemodule['fs-extra'];
const path = require('path');

module.exports.run = async function ({ api, event, args }) {
    const apiKey = 'qQ1f2UeVN0zCuB';
    const name = args.join(" ");

    if (!name) {
        return api.sendMessage("أىجوك قم بإدخال إسم من أجل البحث عن صورة رمزية لك.", event.threadID, event.messageID);
    }

    const url = `https://api.multiavatar.com/${encodeURIComponent(name)}.png?apikey=${apiKey}`;
    const pathToAvatar = path.join(__dirname, `/cache/multiavatar.png`);

    try {
        const response = await axios.get(url, { responseType: "arraybuffer" });
        fs.writeFileSync(pathToAvatar, Buffer.from(response.data, "binary"));

        api.sendMessage({
            body: "إليك صورتك الرمزية:",
            attachment: fs.createReadStream(pathToAvatar)
        }, event.threadID, event.messageID);

        fs.unlinkSync(pathToAvatar);
    } catch (error) {
        console.error(error);
        api.sendMessage("حدث خطأ أثناء إنشاء الصورة الرمزية للبيكسل.", event.threadID, event.messageID);
    }
                                                                  }