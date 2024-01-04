const axios = require('axios');

module.exports.config = {
  name: "بريد_مؤقت",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Anjelo Cayao Arabis",
  description: "أنشئ عنوان بريد إلكتروني مؤقتًا باستخدام الاسم المقدم واجلب رسائل البريد الوارد باستخدام نقاط النهاية",
  commandCategory: "خدمات",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  if (args.length === 2 && args[0] === "توليد") {
    const localPart = args[1];
    
    try {
      const response = await axios.get(`https://official-anjelo-api.anjelopogialways.repl.co/tempmailv3gen?localPart=${localPart}`);
      api.sendMessage(response.data.result, event.threadID);
    } catch (error) {
      api.sendMessage(" ❌ |حدث خطأ أثناء إنشاء عنوان البريد الإلكتروني المؤقت.", event.threadID);
    }
  } else if (args.length === 2 && args[0] === "صندوق_الورائد") {
    const email = args[1];
    
    try {
      const response = await axios.get(`https://official-anjelo-api.anjelopogialways.repl.co/tempmailv3inbox?email=${email}`);
      api.sendMessage(response.data.result, event.senderID);
      api.sendMessage(" ✅ |تم إرسال الرسالة إلى صندوق الورائد تفقد الخاص.", event.threadID);
    } catch (error) {
      api.sendMessage(" ❌ |حدث خطأ أثناء جلب رسائل البريد الوارد.", event.threadID);
    }
  } else {
    api.sendMessage(" ⚠️ |كيفية الإستخدام: بريد_مؤقت توليد [من أجل توليد بريد عشوائي و مؤقت]  و بريد_مؤقت صندوق_الورائد [من أجل تفقد الرسائل الواردة اهذا الحساب]", event.threadID);
  }
};