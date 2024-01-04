module.exports.config = {
    name: "آيدي_الكل",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "Deku",
    description: "قم بالحصول على كل الآيديات للمستخدمين في المجموعة مع الأسماء.",
    commandCategory: "خدمات",
    cooldowns: 2,
};
module.exports.run = async function ({ api, event, args, Users }) {
  
  function reply(d) {
    api.sendMessage(d, event.threadID, event.messageID)
  }
  var ep = event.participantIDs;
  msg = ""
  msgs = ""
  m = 0;
  for (let i of ep) {
    m += 1;
    const name = await Users.getNameUser(i);
    msg += m+". "+name+"\nآيدي: "+i+"\nرابط فيسبوك: https://facebook.com/"+i+"\n\n";
  }
  msgs += "قائمة كل الآيديات .\n\n"+msg;
  reply(msgs)
}