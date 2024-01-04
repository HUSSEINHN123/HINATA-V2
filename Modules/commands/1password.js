const axios = require('axios');

module.exports.config = {
  name: "كلمة_المرور",// /fb passgen
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Ber",//credit sa owner ng api
  usePrefix: true,
  description: "يقتىح عليك كجموعة من كلمات المرور",
  commandCategory: "خدمات",
  usages: "*كلمة_المرور إنشاء",
  cooldowns: 2,
};
module.exports.run = async ({ api, event, args }) => {
    let { threadID, messageID } = event;
    let gen1= args[0];
  if(!gen1) {
api.sendMessage(`إستعمال غير صالح⚠️\nكيفية الإستعمال: ${global.config.PREFIX}كلمة_المرور إنشاء`, threadID, messageID);
return;
  }
api.sendMessage(" ⏱️ | يتم الآن إنشاء كلمة المرور الخصة بك المرجو الإنتظار...", threadID, messageID);

    try {
        const pass = await axios.get(`https://sensui-useless-apis.codersensui.repl.co/api/tools/${encodeURI(gen1)}`);
        const gen = pass.data.password;

      api.sendMessage(`ها هي كلمة المرور الخاصة بك التي تم إنشاؤها🔑: \n${gen}`, threadID, messageID);

    } catch (pass) {
        return api.sendMessage(`خطأ ${pass}`, threadID, messageID);
    };

};