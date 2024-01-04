const axios = require('axios');

module.exports.config = {
    name: 'إسمي_باليابانية',
    version: '1',
    hasPermission: 0,
    credits: 'August Quinn',
    description: 'قم باحويل إسمك إلى اليابانية',
    usages: 'إسمي_باليابانية [الإسم]',
    commandCategory: 'خدمات',
    cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
    try {
        const name = args.join(' ');

        if (!name) {
            return api.sendMessage('أرجوك قم بإدخال إسم من أجل تحويله إلى إسم باليابانية.', event.threadID, event.messageID);
        }

        const apiUrl = `https://japanese-name-converter.august-api.repl.co/convertName?name=${encodeURIComponent(name)}`;
        const response = await axios.get(apiUrl);

        if (response.data.convertedName) {
            api.sendMessage(`✅ "${name}" تم تحويل بنجاح إلى:\n\n${response.data.convertedName}`, event.threadID, event.messageID);
        } else {
            api.sendMessage('حدث خطأ أثناء تحويل الاسم. الرجاء معاودة المحاولة في وقت لاحق.', event.threadID, event.messageID);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        api.sendMessage('حدث خطأ أثناء تحويل الاسم. الرجاء معاودة المحاولة في وقت لاحق.', event.threadID, event.messageID);
    }
};