module.exports.config = {
  name: "حالة_المجموعة",
  version: "1.1.0",
  hasPermission: 2,
  credits: "August Quinn",
  description: "احصل على معلومات حول الدردشة الجماعية الحالية.",
  commandCategory: "المجموعة",
  usages: ["*حالة_اامجموعة"],
  usePrefix:true,
  cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  try {
    const threadInfo = await api.getThreadInfo(event.threadID);
    const threadName = threadInfo.threadName || "مجموعة غير مسمات";
    const threadType = threadInfo.isGroup ? "Group" : "Personal Chat";
    const participantCount = threadInfo.participantIDs.length;

    const groupID = threadInfo.isGroup ? `\n  ⦿ آيڊي آلُـِـِِـِِِـِِـِـمـْـْْـْجـ,ـمـْـْْـْوُعٌـِـِِـِـة : ${event.threadID}` : "";
    const groupStatus = threadInfo.isGroup ? `\n  ⦿ حـًـًًـًًًـًًـًـآلُـِـِِـِِِـِِـِـة آلُـِـِِـِِِـِِـِـمـْـْْـْجـ,ـمـْـْْـْوُعٌـِـِِـِـة: ${threadInfo.approvalMode ? "وضع الموافقة مفعلة" : "وضع الموافقة غير مفعلة"}${threadInfo.restrictions ? `\n  ⦿ مـْـْْـْشُـُـُُـُآكُـُلُـِـِِـِِِـِِـِـ آلُـِـِِـِِِـِِـِـمـْـْْـْجـ,ـمـْـْْـْوُعٌـِـِِـِـة : ${threadInfo.restrictions}` : ""}` : "";

    const adminIDs = threadInfo.adminIDs || [];
    const nicknames = await Promise.all(threadInfo.participantIDs.map(async (userID) => {
      const userInfo = await api.getUserInfo(userID);
      return `• ${userInfo[userID].name}\n- ${userID}\n`;
    }));

    const infoMessage = `👾 معلومات ${threadName}\n\nℹ️ مجموعة ${threadName} \n\n  ⦿ آلُـِـِِـِِِـِِـِـإڛـ,ـمـْـْْـْ: ${threadName}\n  ⦿ آلُـِـِِـِِِـِِـِـنـِِـِـوُعٌـِـِِـِـ: ${threadType}${groupID}${groupStatus}\n  ⦿ آلُـِـِِـِِِـِِـِـأعٌـِـِِـِـضآء: ${participantCount}\n  ⦿ ألُـِـِِـِِِـِِـِـقٌـ,ـآبـٌـٌٌـٌٌٌـٌٌـٌ آلُـِـِِـِِِـِِـِـأعٌـِـِِـِـضآء:\n ${nicknames.join("\n")}`;

    api.sendMessage(infoMessage, event.threadID, event.messageID);
  } catch (error) {
    console.error("خطأ في جلب معلومات الموضوع:", error);
    api.sendMessage("❎ خطأ في جلب معلومات الموضوع. الرجاء معاودة المحاولة في وقت لاحق.", event.threadID, event.messageID);
  }
};