module.exports.config = {
  name: "الوقت",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Secret",
  description: "( الوقت والتاريخ الحالي )",
  commandCategory: "خدمات",
  usages: "( الوقت الحالي )",
  cooldowns: 0,
  dependencies: []
};

module.exports.run = async function ({ api, event, args, Currencies, Users }) {
  const moment = require("moment-timezone");
  var supremo = moment.tz('Africa/Casablanca').format('HH:mm:ss');
  var draven = moment.tz('Africa/Casablanca').format('D/MM/YYYY');
  var kiel = moment.tz('Africa/Casablanca').format('dddd');
  if (kiel == 'Sunday') kiel = 'الأحد'
  if (kiel == 'Monday') kiel = 'الإثنين'
  if (kiel == 'Tuesday') kiel = 'الثلاثاء'
  if (kiel == 'Wednesday') kiel = 'الأربعاء'
  if (kiel == "Thursday") kiel = 'الخميس'
  if (kiel == 'Friday') kiel = 'الجمعة'
  if (kiel == 'Saturday') kiel = 'السبت'
  let name = await Users.getNameUser(event.senderID);
  return api.sendMessage(`〘──── •『 الوقت ⏰ 』• ────〙\nمرحبا 💐「﹝${name}﹞」\nالوقت الحالي : ${supremo} \nاليوم : ${draven} (${kiel})\n〘───د── •『 الوقت ⏰ 』• ───〙`, event.threadID, event.messageID)
}

    