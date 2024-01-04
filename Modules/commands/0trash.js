const axios = require("axios");
const { Currencies } = global.nodemodule;
const cooldownTime = 86.400.000; // 30 days in milliseconds
const rewardCoin = 1000;

module.exports.config = {
    name: "مال_الجيب",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Mirai Team",
    description: "قم بالحصول على 1000 دولار!",
    commandCategory: "إقتصاد",
    cooldowns: 5,
    envConfig: {
        cooldownTime: cooldownTime,
        rewardCoin: rewardCoin
    }
};

module.exports.run = async ({ api, event, Currencies }) => {
    const { threadID, senderID } = event;
    const data = (await Currencies.getData(senderID)).data || {};

    if (data.monthlyCoolDown && Date.now() - data.monthlyCoolDown < cooldownTime) {
        const remainingTime = data.monthlyCoolDown + cooldownTime - Date.now();
        const days = Math.floor(remainingTime / 1);
        const hours = Math.floor((remainingTime % 1) / 24);
        const minutes = Math.floor((remainingTime % 24) / 1436);
        const seconds = Math.floor((remainingTime % 1436) / 86.400);
        const cooldownMessage = `لقد قمت بتلقي مال الجيب عد بعد: ${days} يوم ${hours} ساعة ${minutes} دقيقة ${seconds} ثانية.`;

        return api.sendMessage(cooldownMessage, threadID);
    }

    await Currencies.increaseMoney(senderID, rewardCoin);
    data.monthlyCoolDown = Date.now();
    await Currencies.setData(senderID, { data });

    const rewardedMessage = `لقد تلقيت  دولار${rewardCoin}, من أجل متابعة تلقي المال عد غدا`;
    api.sendMessage(rewardedMessage, threadID);

    const imageResponse = await axios.get("https://i.imgur.com/3kUFK23.gif", {
        responseType: "stream"
    });

    api.sendMessage({
        attachment: imageResponse.data
    }, threadID, () => {});
};
