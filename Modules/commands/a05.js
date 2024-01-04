const axios = require('axios');
const Scraper = require('mal-scraper');
const request = require('request');
const fs = require('fs');

// تابع لترجمة النصوص إلى اللغة العربية باستخدام Google Translate API
async function translateToArabic(text) {
    const API_KEY = '
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q=${decode}`; // استبدل بمفتاح API الخاص بك
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
    name: "معلومات_أنمي",
    version: "1.0.0",
    hasPermission: 0,
    credits: "ZiaRein", // modified by HUSSEIN 
    description: "البحث عن أنمي في Myanimelist",
    commandCategory: "خدمات",
    usages: "[اسم الأنمي]",
    cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
    let input = event.body;
    let query = input.substring(13).replace(/ /g, " "); // قم بتصحيح النص

    api.sendMessage(`🔍 | جاري البحث ع&#8203;``【oaicite:0】``&#8203;】`, event.threadID, event.messageID);

    try {
        const Anime = await Scraper.getInfoFromName(query);
        const synopsisArabic = await translateToArabic(Anime.synopsis);

        api.sendMessage({
            body: `العنوان: ${Anime.title}\nالعنوان باليابانية: ${Anime.japaneseTitle}\nالنوع: ${Anime.type}\nالحالة: ${Anime.status}\nالإصدار: ${Anime.premiered}\nالبث: ${Anime.broadcast}\nتاريخ البث: ${Anime.aired}\nالمنتجون: ${Anime.producers}\nالاستديوهات: ${Anime.studios}\nالمصدر: ${Anime.source}\nعدد الحلقات: ${Anime.episodes}\nالمدة: ${Anime.duration}\nالأنواع: ${Anime.genres.join(", ")}\nالشهرة: ${Anime.popularity}\nالتصنيف: ${Anime.ranked}\nالتقييم: ${Anime.score}\nالتقييم العمري: ${Anime.rating}\n\nالملخص: \n${synopsisArabic}\nالرابط: ${Anime.url}`,
            attachment: fs.createReadStream(__dirname + `/cache/mal.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/mal.${ext}`), event.messageID);
    } catch (error) {
        console.error(error);
        api.sendMessage("⚠️ | حدث خطأ أثناء جلب معلومات الأنمي.", event.threadID, event.messageID);
    }
};
