module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "min",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "ڠــٱدڕ مــن ٺــڵــڦــاء نــڣــڛــہ" : "تم طرده من طرف المشرف";
 if (type == "ڠــٱدڕ مــن ٺــڵــڦــاء نــڣــڛــہ") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`غير قادرة على إعادة ${name} إلى المجموعة :( `, event.threadID)
   } else api.sendMessage(`لن أدعك تخرج من المجموعة يا ${name} لهذا لقد أعدت إضافتك إلى المجموعة لا شكر على واجب ⁦^⁠_⁠^⁩`, event.threadID);
  })
 }
}