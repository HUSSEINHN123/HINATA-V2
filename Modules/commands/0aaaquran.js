module.exports.config = {
    name: "قرآن",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "عمر",
    description: "احزر إسم السورة وأحصل على 1000 دولار",
    usages: ["لعبة"],
    commandCategory: "لعبة",
    cooldowns: 0
};

const fs = require('fs');
const axios = require('axios');
const tempImageFilePath = __dirname + "/cache/tempImage12.jpg";

module.exports.handleReply = async function ({ api, event, handleReply, Currencies, Users }) {
    const userAnswer = event.body.trim().toLowerCase();
    const correctAnswer = handleReply.correctAnswer.toLowerCase();
    const userName = global.data.userName.get(event.senderID) || await Users.getNameUser(event.senderID);

    if (userAnswer === correctAnswer) {
        Currencies.increaseMoney(event.senderID, 1000);
        api.sendMessage(` ✅ | تهانينا يا 🌟${userName}🌟 لقد تمكنت من معرفة السورة وحصلت على 1000 دولار 💵`, event.threadID);
        api.setMessageReaction("✅", event.messageID, (err) => {
            if (err) console.error("Error setting reaction:", err);
        });
        api.unsendMessage(handleReply.messageID);
    } else {
        api.sendMessage(` ❌ | خطأ حاول مرة أخرى `, event.threadID);
        api.setMessageReaction("❌", event.messageID, (err) => {
            if (err) console.error("Error setting reaction:", err);
        });
    }

    fs.unlinkSync(tempImageFilePath);
};

module.exports.run = async function ({ api, event, args }) {
    const questions = [

      { image: "https://i.imgur.com/DtXE7kT.jpg", answer: "سورة الكوثر" },
        { image: "https://i.imgur.com/dUpgEJY.jpg", answer: "سورة الفلق" },
        { image: "https://i.imgur.com/pos6a03.jpg", answer: "سورة القدر" },
        { image: "https://i.imgur.com/z5b1QrM.jpg", answer: "سورة العصر" },
      { image: "https://i.imgur.com/Fd6iDCb.jpg", answer: "سورة البينة" },
      { image: "https://i.imgur.com/oSN2tYj.jpg", answer: "سورة الناس" },
      { image: "https://i.imgur.com/awiWfPe.jpg", answer: "سورة الإخلاص" },
      { image: "https://i.imgur.com/I65oQjB.jpg", answer: "سورة الماعون" },
      { image: "https://i.imgur.com/fA1mDnL.jpg", answer: "سورة العصر" },
      { image: "https://i.imgur.com/NCqOLFT.jpg", answer: "سورة الفاتحة" },

        // Your question objects here
    ];

    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    const correctAnswer = randomQuestion.answer;

    const imageResponse = await axios.get(randomQuestion.image, { responseType: "arraybuffer" });
    fs.writeFileSync(tempImageFilePath, Buffer.from(imageResponse.data, "binary"));

    const attachment = [fs.createReadStream(tempImageFilePath)];
    const message = `ما هو إسم السورة الكريمة؟`;

    api.sendMessage({ body: message, attachment }, event.threadID, (error, info) => {
        if (!error) {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                correctAnswer: correctAnswer
            });
        }
    });
};
