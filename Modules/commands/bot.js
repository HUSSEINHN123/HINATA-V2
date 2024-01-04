const https = require('https');

module.exports.config = {
    name: "بوت",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "عبدالرحمن",
    description: "استخدام GPT للرد على الأسئلة",
    commandCategory: "خدمات",
    usages: "[سؤال]",
    cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
    const inputText = args.join(' ');
    let { threadID, messageID } = event;
    let tid = threadID,
        mid = messageID;

    if (inputText !== "") {
        const encodedInput = encodeURIComponent(inputText);
        const url = `https://gptzaid.zaidbot.repl.co/1/text=${encodedInput}`;

        https.get(url, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                api.sendMessage(data, tid, mid);
            });
        }).on('error', (error) => {
            console.error(`حدث خطأ: ${error.message}`);
            api.sendMessage("حدث خطأ أثناء الاتصال بالخادم", tid, mid);
        });
    } else {
        api.sendMessage("أنت البوت تفضل 🙂", tid, mid);
    }
};
