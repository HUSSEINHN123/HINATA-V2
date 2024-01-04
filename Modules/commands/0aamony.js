 const num = 10 //number of times spam gets banned -1, for example 5 times 6 times will get banned
 const timee = 120 // During `timee` spam `num` times will be banned
 module.exports.config = {
  name: "حظر_السبام_تلقائيا",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "killua", //fix get by  D-Jukie
  description: `حظر المستخدمين تلقائيا إذا كان السبام ${num} مرة في/${timee} ثانية`,
  commandCategory: "النظام",
  usages: "x",
  cooldowns: 5
};

module.exports. run = async function ({api, event})  {
  return api.sendMessage(`يتم حظر المستخدم تلقائيا حين يتم إكتشاف سبام ${num} مرة في/${timee} ثانية`, event.threadID, event.messageID);
};

module.exports.handleEvent = async function ({ Users, Threads, api, event})  {
  let { senderID, messageID, threadID } = event;
  var datathread = (await Threads.getData(event.threadID)).threadInfo;
  
  if (!global.client.autoban) global.client.autoban = {};
  
  if (!global.client.autoban[senderID]) {
    global.client.autoban[senderID] = {
      timeStart: Date.now(),
      number: 0
    }
  };
  
  const threadSetting = global.data.threadData.get(threadID) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  if (!event.body || event.body.indexOf(prefix) != 0) return;
  
  if ((global.client.autoban[senderID].timeStart + (timee*1000)) <= Date.now()) {
    global.client.autoban[senderID] = {
      timeStart: Date.now(),
      number: 0
    }
  }
  else {
    global.client.autoban[senderID].number++;
    if (global.client.autoban[senderID].number >= num) {
      var namethread = datathread.threadName;
      const moment = require("moment-timezone");
      const timeDate = moment.tz("Africa/Casablanca").format("DD/MM/YYYY HH:mm:ss");
      let dataUser = await Users.getData(senderID) || {};
      let data = dataUser.banned| {};
      if (data && data.banned == true) return;
      data.banned = true;
      data.reason = ` ⚠️ | تم إكتشاف سبام ${num} مرة في/${timee} ثانية` || null;
      data.dateAdded = timeDate;
      await Users.setData(senderID, { data });
      global.data.userBanned.set(senderID, { reason: data.reason, dateAdded: data.dateAdded });
      global.client.autoban[senderID] = {
        timeStart: Date.now(),
        number: 0
      };
      api.sendMessage(senderID + " \n⚡️الإسم: " + dataUser.name + `\n⚡السبب: سبام البوت ${num} مرة في/${timee} ثانية\n\n✔️تم إرسال التقرير إلى مالك البوت`, threadID,
    () => {
    var idad = global.config.ADMINBOT;
    for(let ad of idad) {
        api.sendMessage(`⚡️تم إكتشاف سبام  ${num} في مرة/${timee} ثانية\n⚡️الإسم: ${dataUser.name} \n⚡️الآيدي: ${senderID}\n⚡️آيدي المجموعة: ${threadID} \n⚡️إسم المجموعة: ${namethread} \n⚡️الوقت: ${timeDate}`, 
          ad);
    }
    })
    }
  }
};
