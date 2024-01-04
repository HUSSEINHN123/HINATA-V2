module.exports.config = {
	name: "تفاعل_مع_منشور",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "ryuko",
	description: "قم بالتفاعل مع منشور بإستخدام بالآيدي",
  usePrefix: true,
	commandCategory: "خدمات",
	usages: "[آيدي المنشور] <ه نوع التفاعل>: (👎/👍/😍/♥️/😂/😯/😢/😡)",
	cooldowns: 1
};


module.exports.run = async ({ api, event, args }) => {
  const allType = "(👎/👍/😍/♥️/😂/😯/😢/😡)".split("/");
  const postID = args[0];
  const type = args[1];
  if (!postID || !type) return global.utils.throwError(this.config.name, event.threadID, event.messageID);
  if (!allType.includes(type)) return api.sendMessage(` ⚠️ |نوع التفاعل غير صالح، يرجى اختيار أحد الأنماط التالية : ${allType.join("/")}`, event.threadID, event.messageID);
  api.setPostReaction(Number(postID), type, (err, data) => {
    if (err) return api.sendMessage(" ❌ |حدث خطأ ما، يرجى التحقق من معرف البريد الخاص بك والمحاولة مرة أخرى لاحقًا", event.threadID, event.messageID);
    api.sendMessage(` ✅ | تم التفاعل ب ${type} من أجل آيدي المنشور ${postID}`, event.threadID, event.messageID);
  });
};