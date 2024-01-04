module.exports.config = {
    name: "إحزر_الشخصية",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "عمر",//تم التعديل من طرف حسين
    description: "احزر اسم الشخصيه من الصوره",
    usages: ["لعبة"],
    commandCategory: "لعبة",
    cooldowns: 0
};

const fs = require('fs');
const axios = require('axios');
const tempImageFilePath = __dirname + "/cache/tempImage12.jpg";

module.exports.handleReply = async function ({ api, event, handleReply, Currencies }) {
    const userAnswer = event.body.trim().toLowerCase();
    const correctAnswer = handleReply.correctAnswer.toLowerCase();
    const userName = global.data.userName.get(event.senderID) || await Users.getNameUser(event.senderID);

    if (userAnswer === correctAnswer) {
        Currencies.increaseMoney(event.senderID, 500);
        api.sendMessage(` ✅ | تهانينا يل ✨${userName}✨ لقد عرفت الشخصية 🥳 ، وحصلت على 500 دولار 💵`, event.threadID);

        api.unsendMessage(handleReply.messageID);
    } else {
        api.sendMessage(` ❌ |خطأ، حاول مرة أخرى 😓`, event.threadID);
    }

    fs.unlinkSync(tempImageFilePath);
};

module.exports.run = async function ({ api, event, args }) {
    const questions = [


      { image: "https://i.imgur.com/yrEx6fs.jpg", answer: "كورومي" },

      { image: "https://i.imgur.com/cAFukZB.jpg", answer: "الينا" },
      { image: "https://i.pinimg.com/236x/63/c7/47/63c7474adaab4e36525611da528a20bd.jpg", answer: "فوليت" },

      { image: "https://i.imgur.com/xzDQSD2.jpg", answer: "ليفاي" },

      { image: "https://i.pinimg.com/236x/eb/a1/c6/eba1c6ed1611c3332655649ef405490a.jpg", answer: "مايكي" },

      { image: "https://i.pinimg.com/236x/34/81/ba/3481ba915d12d27c1b2a094cb3369b4c.jpg", answer: "كاكاشي" },

      { image: "https://i.pinimg.com/236x/3a/df/87/3adf878c1b6ef2a90ed32abf674b780c.jpg", answer: "ميدوريا" },

      { image: "https://i.pinimg.com/564x/d2/c0/42/d2c042eeb8a92713b3f6e0a6dba2c353.jpg", answer: "وين" },

      { image: "https://i.pinimg.com/236x/f6/85/2b/f6852bfa6a09474771a17aca9018852e.jpg", answer: "نينم" },

      { image: "https://i.pinimg.com/236x/b6/0e/36/b60e36d13d8c11731c85b73e89f63189.jpg", answer: "هانكو" },

      { image: "https://i.pinimg.com/236x/bd/9d/5a/bd9d5a5040e872d4ec9e9607561e22da.jpg", answer: "زيرو تو" },

      { image: "https://i.pinimg.com/236x/5f/e8/f3/5fe8f3b46a33de8ce98927e95e804988.jpg", answer: "ايروين" },

      { image: "https://i.pinimg.com/474x/ab/3f/5e/ab3f5ec03eb6b18d2812f8c13c62bb92.jpg", answer: "تودروكي" },

      { image: "https://i.pinimg.com/236x/26/6e/8d/266e8d8e9ea0a9d474a8316b9ed54207.jpg", answer: "غوجو" },

      { image: "https://i.pinimg.com/474x/e5/2f/a3/e52fa34886b53184b767b04c70ce0885.jpg", answer: "دازاي" },

      { image: "https://i.pinimg.com/236x/03/af/3e/03af3e2769811b62eb75f1a8e63affe5.jpg", answer: "فوتوبا" },

      { image: "https://i.pinimg.com/236x/7f/38/6c/7f386c4afed64d0055205452091a313e.jpg", answer: "سيستا" },

      { image: "https://i.pinimg.com/236x/96/88/1e/96881ef27cbfce1071ff135b5a7e1fc7.jpg", answer: "نيزكو" },

      { image: "https://i.pinimg.com/236x/8a/c8/f9/8ac8f98dd946fefdae4e66020073e5ee.jpg", answer: "كيلوا" },

      { image: "https://i.pinimg.com/236x/e1/6a/5c/e16a5c5f91190ebf407ff3736135cb5a.jpg", answer: "كايل" },

      { image: "https://i.pinimg.com/564x/36/43/fc/3643fc4d86d3a7e8e60d14e71f8050a0.jpg", answer: "نيرو" },

      { image: "https://i.pinimg.com/236x/3b/b5/ef/3bb5efac247e16fe3fc30c9a7478cc07.jpg", answer: "ريوك" },

      { image: "https://i.pinimg.com/236x/79/9b/66/799b66006bc650a03fa264936ce254c7.jpg", answer: "تاكت" },
      { image: "https://i.imgur.com/qnZFWSw.jpg", answer: "كاكاروتو" },
      { image: "https://i.imgur.com/HhJ1v0s.jpg", answer: "روكيا" },
      { image: "https://i.imgur.com/MP30yUR.jpg", answer: "إيتشيغو" },
      { image: "https://i.imgur.com/Eb3mfy1.jpg", answer: "إيس","بورتغوا دي إيس" },
      { image: "https://i.imgur.com/koAzMr9.jpg", answer: "هيناتا" }, 
      { image: "https://i.imgur.com/1MpxOkq.jpg", answer: "ريم" },
      { image: "https://i.imgur.com/r5LBZq1.jpg", answer: "إيميليا" },
      { image: "https://i.imgur.com/TAdtk1Z.jpg", answer: "شيكا" },
      { image: "https://i.imgur.com/J0BFr1J.jpg", answer: "نيكو روبين" },
      { image: "https://i.imgur.com/vipOWoh.jpg", answer: "نيزكو" },
      { image: "https://i.imgur.com/hmnNKJA.jpg", answer: "تانجيرو" },
      { image: "https://i.pinimg.com/236x/79/9b/66/799b66006bc650a03fa264936ce254c7.jpg", answer: "تاكت" },
      { image: "https://i.imgur.com/LSopOn0.jpg", answer: "أوسوب" },
      { image: "https://i.imgur.com/0VHWg66.jpg", answer: "زورو" },
      { image: "https://i.imgur.com/UB010MB.jpg", answer: "نامي" },
      { image: "https://i.imgur.com/UGMY3dy.jpg", answer: "كيرا","ياغامي لايت" },
      { image: "https://i.imgur.com/btjxDoY.jpg", answer: "إيرين","ايرين ييغر" },
      { image: "https://i.imgur.com/LZ9h2Cj.jpg", answer: "ناروتو" },
      { image: "https://i.imgur.com/RVTfRG9.jpg", answer: "غارا","ݣارا","جارا" },
      { image: "https://i.imgur.com/6Mj5GcO.jpg", answer: "هيسوكا" },
      { image: "https://i.imgur.com/Tcxjf0z.jpg", answer: "ميكاسا" },
      { image: "https://i.imgur.com/KQuPNi2.jpg", answer: "ساسوكي" },
      { image: "https://i.imgur.com/RGZqW26.jpg", answer: "سايتاما" },
      { image: "https://i.imgur.com/x0cSY3L.jpg", answer: "إيتاشي" },
      { image: "https://i.imgur.com/lKCYgxP.jpg", answer: "ميهوك","العين الصفراء" },
      { image: "https://i.imgur.com/Kr2VJGm.jpg", answer: "دكتور ستون" },
      { image: "https://i.imgur.com/3WNomhT.jpg", answer: "جوجو" },
      { image: "https://i.imgur.com/58Px7WU.jpg", answer: "لوفي" },
      { image: "https://i.imgur.com/1jUoWRm.jpg", answer: "جون" },
    { image: "https://i.imgur.com/TERlJVX.jpg", answer: "كانيكي","كانيكي كن" },
    
    ];

    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    const correctAnswer = randomQuestion.answer;

    const imageResponse = await axios.get(randomQuestion.image, { responseType: "arraybuffer" });
    fs.writeFileSync(tempImageFilePath, Buffer.from(imageResponse.data, "binary"));

    const attachment = [fs.createReadStream(tempImageFilePath)];
    const message = `ما هو إسم هذه الشخصية ؟`;

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
