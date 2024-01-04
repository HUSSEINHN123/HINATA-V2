module.exports.config = {
  name: "إيموجي_ترول",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "John Arida",
  description: "تشفير الرسائل إلى الرموز التعبيرية والعكس",
  commandCategory: "لعبة",
  usages: "إيموجي_ترول en <نص>\nأو\nإيموجي_ترول ar <نص>",
  cooldowns: 5
};

module.exports.run = async ({ event, api, args }) => {
  try {
    const text = args.slice(1).join(" ");
    const type = args[0];

    if (type === 'encode' || type === "en") {
      let encodedText = text.toLowerCase();
      encodedText = encodedText.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|a|A/g, "😀");
      // ... أضف المزيد من الرموز التعبيرية للحروف الأخرى هنا

      encodedText = encodedText.replace(/ /g, "."); // Replace space with dot
      return api.sendMessage(encodedText, event.threadID, event.messageID);
    } else if (type === 'arcode' || type === "ar") {
      let decodedText = text.toLowerCase();
      // ... أضف التعويضات الخاصة بالرموز التعبيرية هنا

      decodedText = decodedText.replace(/\./g, ' '); // Replace dot with space
      return api.sendMessage(decodedText, event.threadID, event.messageID);
    } else {
      throw new Error("خطأ في بناء الجملة! استخدم:\nإيموجي_ترول en <نص>\nأو\n إيموجي_ترول ar <نص>");
    }
  } catch (error) {
    console.error("حدث خطأ:", error);
    api.sendMessage(`❌ | ${error.message}`, event.threadID, event.messageID);
  }
}
