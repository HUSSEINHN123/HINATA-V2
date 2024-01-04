const axios = require('axios');

async function translateToArabic(text) {
    const API_KEY = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q=${translateThis}`; // استبدل بمفتاح API الخاص بك
    const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
        {
            q: text,
            source: 'en',
            target: 'ar'
        }
    );
    return response.data.data.translations[0].translatedText;
}

module.exports.config = {
    name: "حقائق",
    version: "1.0",
    hasPermission: 0,
    credits: "Ronald Allen Albania", // modified by HUSSEIN 
    usePrefix: true,
    description: "الحصول على حقيقة عشوائية",
    commandCategory: "متعة",
    cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
    try {
        // استبدل translateThis بالنص الذي تريد ترجمته إلى اللغة العربية
        const translateThis = "Hello, World!";

        // ترجمة النص إلى اللغة العربية
        const arabicText = await translateToArabic(translateThis);

        api.sendMessage(`📚 النص المترجم: ${arabicText}`, event.threadID);
    } catch (error) {
        console.error(error);
        api.sendMessage("عذرًا، لم أتمكن من ترجمة النص في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقًا.", event.threadID);
    }
};
