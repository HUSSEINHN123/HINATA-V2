module.exports.config = {
    name: "إستعادة_الأموال",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "manhIT",
    description: "إعادة تعيين رصيد المجموعة بأكملها حوالي 0",
    commandCategory: "النظام",
    usages: "[ألغاء], [حذف], [الكل]",
    cooldowns: 5
};

module.exports.run = async ({ api, event, Currencies }) => {
    const data = await api.getThreadInfo(event.threadID);
    for (const user of data.userInfo) {
        var currenciesData = await Currencies.getData(user.id)
        if (currenciesData != false) {
            var money = currenciesData.money;
            if (typeof money != "undefined") {
                money -= money;
                await Currencies.setData(user.id, { money });
            }
        }
    }
    return api.sendMessage(" ✅ |تم إعادة تعيين رصيد أعضاء المجموعة كلها إلى 0 دولار بنجاح", event.threadID);
}