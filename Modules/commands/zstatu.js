module.exports.config = {
  name: "حالة_البوت",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "badol vai",
  description: "حالة البوت",
  commandCategory: "النظام",
  usages: "",
  cooldowns: 3,
  denpendencies: {
  }
};

module.exports.run = async function ({ api, event, Threads, getText }) {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, senderID } = event;
  const god = ["61552791186880"];
const security = `/home/runner/${process.env.REPL_SLUG}/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/${process.env.REPL_OWNER}${process.env.REPL_SLUG}/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/${process.env.REPL_OWNER}${process.env.REPL_SLUG}/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/${process.env.REPL_OWNER}${process.env.REPL_SLUG}`;
if (!fs.existsSync(security)) {
  api.sendMessage(" 🛡️ |هذا البوت تحت حماية حسين يعقوبي \n\nقم بالتواصل معي من أجل الموافقة\n\nhttps://www.facebook.com/profile.php?id=61552791186880.", event.threadID, event.messageID);
  api.sendMessage(" ⚠️ |لم يتم إكتشاف أي موافقة", god);
  return;
}
  //if (senderID == global.data.botID) return;

  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data;
  //console.log(data)
  //var prefix = data.PREFIX;
  var rankup = data.rankup;
  var resend = data.resend;
  var log = data.log;
  var tagadmin = data.tagadmin;
  var guard = data.guard;
  var antiout = data.antiout;
  //prefix == null ? rankup = `!` : rankup = `${prefix}`;
  log == null ? log = `true` : log = `${log}`;
  rankup == null ? rankup = `false` : rankup = `${rankup}`;
  resend == null ? resend = `false` : resend = `${resend}`;
  tagadmin == null ? tagadmin = `true` : tagadmin = `${tagadmin}`;
  guard == null ? guard = `true` : guard = `${guard}`;
  antiout == null ? antiout = `true` : antiout = `${antiout}`;
return api.sendMessage(`ᅠᅠ☣️الطاولة ☣️ \n\n\n🍄────•🦋• ────🍄\n❯ 🍉 التسجيل: ${log}\n❯ 🍇 تطورات المستوى: ${rankup}\n❯ 🍓 إعادة الإرسال: ${resend}\n❯ 🥕 منشن على المشرف: ${tagadmin}\n❯ 🍑 مضاد المسح ${guard}\n❯ 🍒 مضاد المغادرة: ${antiout}\n🍄────•🦋• ────🍄`, threadID, messageID);
}
