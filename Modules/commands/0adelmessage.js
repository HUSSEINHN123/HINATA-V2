module.exports.config = {
  name: "تنظيف",
  version: "1.0.0",
  hasPermission: 0,
  credits: "NAUGHTY", 
  description: "قم بإلغاء إرسال الرسالة التي أرسلها الروبوت",
  usePrefix: true,
  commandCategory: "المجموعة",
  usages: "تنظيف",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event, args }) {
  var naughty = args.join(" ");
  if (!naughty) api.sendMessage("الرجاء إدخال الرقم، كم  ملاحظة : عدد الرسائل التي تريد مسحها ⚠️\n\n: عدد الرسائل اللتي تريد حذفها المرسلة لا تساوي بوضوح الرقم الذي أدخلته، وقد تكون الرسالة غير المرسلة أقل", event.threadID, event.messageID);

   // if (!NaN(naughty) api.sendMessage("PLEASE ENTER NUMBER ONLY", event.threadID, event.messageID);
  const unsendBotMessages = async () => {
    const threadID = event.threadID;
api.sendMessage(" تم تنظيف تقريبا " + naughty + " رسالة بنجاح",event.threadID, event.messageID);
    const botMessages = await api.getThreadHistory(threadID, naughty);
    const botSentMessages = botMessages.filter(message => message.senderID === api.getCurrentUserID());

    for (const message of botSentMessages) {
      await api.unsendMessage(message.messageID);
    }
  };

  await unsendBotMessages();
};