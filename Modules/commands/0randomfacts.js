const axios = require('axios');
const { MessageAttachment } = require('discord.js');

module.exports.config = {
    name: "حقائق",
    version: "1.0",
    hasPermission: 0,
    credits: "Ronald Allen Albania",
    usePrefix: true,
    description: "قم بالحصول على مجموعه من الحقائق العشوائية",
    commandCategory: "متعة",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
    try {
        const response = await axios.get("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q=random");
        const fact = response.data[0][0][0];
        api.sendMessage(`📚 حقيقة عشوائية: ${fact}`, event.threadID);
    } catch (error) {
        console.error(error);
        api.sendMessage("❌ |عذرًا، لا يمكنني جلب حقيقة عشوائية في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقًا.", event.threadID);
    }
};
