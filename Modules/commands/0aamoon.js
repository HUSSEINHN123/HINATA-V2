module.exports.config = {
  name: "قمر",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Rishad",
  description: "قم بتوليد صورة للقمر معتمدا على المعلومات اللتي تدخلها",
  usePrefix: true,
  usages: "قمر الإسم | يوم | شهر | سنة",
  commandCategory: "خدمات",
  cooldowns: 5
};
 
module.exports.run = async ({ api, event, args }) => {
  const axios = global.nodemodule["axios"];
 
  try {
    const input = args.join(" ").split(" | ");
 
    if (input.length !== 4) {
      return api.sendMessage(' ⚠️ |صيغة خاطئة المرجو إستعمال : *قمر الإسم | يوم | شهر | سنة', event.threadID);
    }
 
    const [name, day, month, year] = input;
 
    const API = `https://for-devs.rishadapis.repl.co/api/moon?name=${encodeURIComponent(name)}&day;=${encodeURIComponent(day)}&month;=${encodeURIComponent(month)}&year;=${encodeURIComponent(year)}&apikey=fuck`;
 
    const response = await axios.get(API, {
      responseType: 'stream',
      headers: {
        'Content-Type': 'image/png'
      }
    });
 
    const responseBody = `✅ | تم توليد الصورة بنجاح\n?📜الإسم: ${name}\n?📅اليوم: ${day}\n?️📅 الشهر: ${month}\n?📅السنة: ${year}`;
 
    api.sendMessage({
      body: responseBody,
      attachment: response.data,
    }, event.threadID);
  } catch (error) {
    console.error(error);
    api.sendMessage(' ❌ |حدث خطأ أثناء معالجة قمر من واجهة برمجة التطبيقات', event.threadID);
  }
};