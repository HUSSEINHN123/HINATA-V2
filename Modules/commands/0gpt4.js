const axios = require('axios');

module.exports.config = {
    name: "جبتي4",
    version: "1.0",
    hasPermission: 0,
    credits: "SiAM | @Siam.The.Fox",
    description: "قم بإعطاء سؤال و سيجيب عنه",
    commandCategory: "الذكاء الإصطناعي",
    usages: " ", // Modify it as needed
    cooldowns: 5,
};

module.exports.run = async function ({ api, args, event }) {
    const query = args.join(" ");

    if (!query) {
        return api.sendMessage("أرجوك قم بإدخال سؤال ", event.threadID, event.messageID);
    }

    const userID = event.senderID;

    try {
        const response = await axios.get(`https://gpt4.siam-apiproject.repl.co/api?uid=${userID}&query=${encodeURIComponent(query)}`);
        const answer = response.data.lastAnswer;

        await api.sendMessage(answer, event.threadID, event.messageID);
    } catch (error) {
        console.error("Error:", error);
        api.sendMessage(" ❌ | حدث خطأ أثناء جلب الرد...", event.threadID, event.messageID);
    }
};