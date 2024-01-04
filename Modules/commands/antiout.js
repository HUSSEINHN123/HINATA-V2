module.exports.config = {
  name: "مضاد_الخروج",
  version: "1.0.0",
  credits: "DungUwU (Khánh Milo Fix)",
  hasPermssion: 1,
  description: "قم بتشغيل و إطفاء مود مضاد الخروج",
  usages: "مصاد_الخروج تشغيل/إيقاف",
  commandCategory: "النظام",
  cooldowns: 0
};

module.exports.run = async ({ api, event, Threads }) => {
  let data = (await Threads.getData(event.threadID)).data || {};
  if (typeof data["antiout"] == "undefined" || data["antiout"] == false) data["antiout"] = true;
  else data["antiout"] = false;

  await Threads.setData(event.threadID, { data });
  global.data.threadData.set(parseInt(event.threadID), data);
  return api.sendMessage(`✅ تم ${(data["antiout"] == true) ? "تشغيل" : "إيقاف"} مضاد الخروج بنجاح!`, event.threadID);
    }