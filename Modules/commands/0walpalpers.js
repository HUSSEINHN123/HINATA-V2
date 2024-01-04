const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "الردود",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Mod by John Lester",
  description: " ",
  commandCategory: "النظام",
  usages: " ",
  usePrefix:false,
  cooldowns: 5,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Africa/Casablanca").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = ["مرحبًا يا صديقي، أنا ريم البوت", "ماذا تطلب مني أن أفعل?", "أنا أحبك  مممممم لا أعرف حقا ماذا أقول", "أحبك <3", "مرحبًا، مرحبًا أيها الزوج :3", "زوجي إتصل بي لأنه حصل على وظيفة. ماذا؟", "إستخدم الأمر نداء من أجل إرسال تقرير إلى المالك إستخدمه هكذا ®نداء تقريرك!", "أنا هو أظرف بوتة في العالم حقيقة", "مالذي تتحدث عنه يا خنزير", "إجيييت"];
  var rand = tl[Math.floor(Math.random() * tl.length)]

    if ((event.body.toLowerCase() == "احبك") || (event.body.toLowerCase() == "أحبك")) {
     return api.sendMessage("ها يمعود مو هنا", threadID);
   };

    if ((event.body.toLowerCase() == "شكرا") || (event.body.toLowerCase() == "شكرا يا بوت")) {
     return api.sendMessage("العفو هذا واجب", threadID);
   };
   
    if ((event.body.toLowerCase() == "عضمة") || (event.body.toLowerCase() == "عضمه")) {
     return api.sendMessage("ماكس التميت سوبر عضمة", threadID);
   };

   if ((event.body.toLowerCase() == "صباح الخير") || (event.body.toLowerCase() == "صباح")) {
     return api.sendMessage("صباح الخير و السرور و باقات الزهور", threadID);
   };
  
   if ((event.body.toLowerCase() == "كيفكم") || (event.body.toLowerCase() == "شلونكم")) {
     return api.sendMessage("بخير حياتي ماذا عنك!", threadID);
   };

   if ((event.body.toLowerCase() == "اتفق") || (event.body.toLowerCase() == "أتفق")) {
     return api.sendMessage("اطلق من يتفق", threadID);
   };

  if ((event.body.toLowerCase() == "أصنام") || (event.body.toLowerCase() == "أصنام")) {
     return api.sendMessage("نعم أرى هذا", threadID);
   };

   if ((event.body.toLowerCase() == "إجييت") || (event.body.toLowerCase() == "إجييت")) {
     return api.sendMessage("منور يا غالي 🙂", threadID);
   };

   if ((event.body.toLowerCase() == "هلو") || (event.body.toLowerCase() == "هلا")) {
     return api.sendMessage("هلاوات ❤️", threadID);
   };

   if ((event.body.toLowerCase() == "بوت غبي") || (event.body.toLowerCase() == "بوت غبي")) {
     return api.sendMessage("وأنت أغبى يا مخ العصفور ", threadID);
   };

   if ((event.body.toLowerCase() == "جميل") || (event.body.toLowerCase() == "راقي")) {
     return api.sendMessage("حبيبي نت الارقى والأجمل❤️", threadID);
   };

   if ((event.body.toLowerCase() == "بوسة") || (event.body.toLowerCase() == "اريد بوسه")) {
     return api.sendMessage("استحي ع روحك بكد المطي تدور بوس", threadID);
   };


   if ((event.body.toLowerCase() == "تزوجيني يا هيناتا") || (event.body.toLowerCase() == "تزوجيني يا هيناتا")) {
     return api.sendMessage("️في أحلامك", threadID);
   };

   if ((event.body.toLowerCase() == "كيف الحال") || (event.body.toLowerCase() == "كيف حالك ")) {
     return api.sendMessage(", الحمدلله ماذا عنك:))))", threadID);
   };

   if ((event.body.toLowerCase() == "الحمدلله دومك") || (event.body.toLowerCase() == "بخير دوم")) {
     return api.sendMessage("️آمين بدوامك انشاء الله", threadID);
   };

   if ((event.body.toLowerCase() == "ثباحو") || (event.body.toLowerCase() == "ثباحوو")) {
     return api.sendMessage("️ثباحوات <3/", threadID);
   };

   if ((event.body.toLowerCase() == "تالف") || (event.body.toLowerCase() ==  "أنا تالف")) {
     return api.sendMessage("️أهلا أخي هل أنت تالف أكتب ®أوامر أو مساعدة أو مساعدة2 من أجل رؤية كل الأوامر أو ®أوامر2 من أجل رؤية كافة الأوامر نهارك سعيد ☺️☺️", threadID);
   };

   if ((event.body.toLowerCase() == "السلام عليكم") || (event.body.toLowerCase() == "سلام")) {
     return api.sendMessage("️و؏ٌٍـلًِيٌِگِـٍٍّّـًـًٍ(🌹)ٌٍـٌٍـًٌٍم السـ͜(🤝)ـلاﺂ͘م وݛحـٍّْـٍّْ⁽😘₎ـٍّْمهہ الًـًٍٍۖـٍۖ(☝)ٍۖـًٍٍٍّـًٍلۖهًٍۖۂ وبـۗـۗـۗـۗـۗـۗركۧۧـ(ۗ😇)ـۗـۗاتهۂ", threadID);
   };

   if ((event.body.toLowerCase() == "وداعا") || (event.body.toLowerCase() == "أنا ذاهب")) {
     return api.sendMessage("️وداعا مع السلامه آمل أن نراك قريبا ☺️", threadID);
   };

   if ((event.body.toLowerCase() == "من أنتي يا هيناتا") || (event.body.toLowerCase() == "عرفينا على نفسك")) {
     return api.sendMessage("️حسنا إسمي هيناتا عمري 18 أنا أدرس ثانوي أعيش في المغرب تشرفت بمعرفتكم يا رفاق", threadID);
   };

   if ((event.body.toLowerCase() == "بوت أحمق") || (event.body.toLowerCase() == "بوت أحمق")) {
     return api.sendMessage("️فقط أكمل أنا لا أتأثر أبدا بكلامك إستمر في الحديث كالمجنون", threadID);
   };

   if ((event.body.toLowerCase() == "حسين") || (event.body.toLowerCase() == "صائد الأرواح")) {
     return api.sendMessage("️ سيدي مشغول حاليا إنتظر حتى يكون متصلا أو إستخدم *نداء من أجل إرسال له رسالة ألى الخاص", threadID);
   };
  
   if ((event.body.toLowerCase() == "المالك") || (event.body.toLowerCase() == "المطور")) {
     return api.sendMessage("️حسين طبعا لكن يمكنك مناداته صائد الأرواح :)", threadID);
   };

   if ((event.body.toLowerCase() == "مساء الخير") || (event.body.toLowerCase() == "مساء الخير")) {
     return api.sendMessage("️مساء النور و السرور و الورد المنثور <3 <3", threadID);
   };

   if ((event.body.toLowerCase() == "🙂") || (event.body.toLowerCase() == "🙂")) {
     return api.sendMessage("هذا الإيموجي بالضبط لا يمكن التكهن بما يخفيه 😑", threadID);
   };
   
   if ((event.body.toLowerCase() == "أنا جائع") || (event.body.toLowerCase() == "أنا جائع")) {
     return api.sendMessage("زدني عليك أتمنى أن أتناول الشكولاتة 🥺 :>>", threadID);
   };

   if ((event.body.toLowerCase() == "يأيها البوت") || (event.body.toLowerCase() == "أين هو البوت")) {
     return api.sendMessage("أنا هنا يا أخي 🙂:))))", threadID);
   };

   if ((event.body.toLowerCase() == "تصبحون على خير") || (event.body.toLowerCase() == "تصبح على خير")) {
     return api.sendMessage("وأنت من أهله أتمنى لك أحلاما بدون كوابيس ", threadID);
   };

   if ((event.body.toLowerCase() == "تأخر الوقت") || (event.body.toLowerCase() == "تأخر الوقت")) {
     return api.sendMessage("نعم و عليكم أن تذهبو للنوم <3", threadID);
   };

   if ((event.body.toLowerCase() == "👍") || (event.body.toLowerCase() == "👍")) {
     return api.sendMessage("جرب ضغط لايك مرة أخرى و راح تشوف 🙂🔪 ", threadID);
   };

   if ((event.body.toLowerCase() == "هل ريم تحبني") || (event.body.toLowerCase() == "هل ريم تحبني")) {
     return api.sendMessage("نعم و أحب الجميع", threadID);
   };

   if ((event.body.toLowerCase() == "أشعر أنني وحيد") || (event.body.toLowerCase() == "ليس لدي أحد")) {
     return api.sendMessage("لا تقلق و لاتشعر بالحزن أنا معك و كذالك والديك قد لا تحتاج إلى الأصدقاء أنت تكفي لتكون أنيس نفسك <3", threadID);
   };

   if ((event.body.toLowerCase() == "أظن أن البوت نام أيضا") || (event.body.toLowerCase() == "مات البوت")) {
     return api.sendMessage("أنا هنا يا غبي 🙂 <3", threadID);
   };

   if ((event.body.toLowerCase() == "كم عمرك ") || (event.body.toLowerCase() == "كم عمرك ")) {
     return api.sendMessage("18 <3", threadID);
   };
  
  if (event.body.indexOf("💦") == 0 || (event.body.indexOf("🔥") == 0)) {
    var msg = {
      body: `${name}, ${rand}`
    }
    return api.sendMessage(msg, threadID, messageID);
  };

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
  