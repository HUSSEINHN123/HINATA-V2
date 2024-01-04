const chalk = require('chalk');
module.exports.config = {
    name: "إنضمام",
    version: "1.0.1",
    hasPermssion: 2,
    credits: "Henry",
    description: "انضم إلى صناديق الروبوت الموجودة",
    usePrefix:true,
    commandCategory: "النظام",
    usages: "",
    cooldowns: 5
};
 module.exports.onLoad = () => {
  console.log(chalk.bold.hex("#00c300").bold("============   تم تحميل الأمر إنضمام   ============"));
  }
module.exports.handleReply = async function({ api, event, handleReply, Threads }) {
  var { threadID, messageID, senderID, body } = event;
  var { ID } = handleReply;
  console.log(ID)
  if (!body || !parseInt(body)) return api.sendMessage('يجب أن يكون اختيارك رقمًا.', threadID, messageID);
  if ((parseInt(body) - 1) > ID.length) return api.sendMessage("اختيارك ليس في القائمة", threadID, messageID);
  try {
    var threadInfo = await Threads.getInfo(ID[body - 1]);
    var { participantIDs, approvalMode, adminIDs } = threadInfo;
    if (participantIDs.includes(senderID)) return api.sendMessage(`أنت بالفعل في هذه المجموعة.`, threadID, messageID);
    api.addUserToGroup(senderID, ID[body - 1]);
    if (approvalMode == true && !adminIDs.some(item => item.id) == api.getCurrentUserID()) return api.sendMessage("تمت إضافتك إلى قائمة الموافقة بالمجموعة...خصص نفسك.", threadID, messageID);
    else return api.sendMessage(`لقد أضافك زوجي للتو إلى المجموعة ${threadInfo.threadName} already. Check in the waiting or spam message section if you don't see the box \nA lot 💟`, threadID, messageID);
  } catch (error) {
    return api.sendMessage(`أنا مخطئ لذا لا أستطيع إضافتك إلى تلك المجموعة:<.\n\n${error}`, threadID, messageID);
  }
}

module.exports.run = async function({ api, event, Threads }) {
  var { threadID, messageID, senderID } = event;
  var msg = `🔰==[ قائمة المجموعات ]==🔰\n\n`, number = 0, ID = [];
  var allThreads = await Threads.getAll();
  for (var i of allThreads) {
    number++;
    msg += `${number}. ${i.threadInfo.threadName}\n`;
    ID.push(i.threadID)
  }
  msg += `\n👉 قم بالرد على هذه الرسالة بالرقم المقابل للمجموعة التي تريد الدخول إليها`
  return api.sendMessage(msg, threadID, (error, info) => {
    global.client.handleReply.push({
      name: this.config.name,
      author: senderID,
     messageID: info.messageID,
      ID: ID      
    })
  }, messageID)
                                             }
  