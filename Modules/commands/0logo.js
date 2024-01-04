var hiro = "kim Joseph DG Bien";
const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "شعار",
  version: "1.0",
  hasPermssion: 0,
  credits: `${hiro}`,
  description: "قم بإنشاء شعارات", // API CREDIT: RICHARD
  commandCategory: "خطوط",
  usages: "®لوغو",
  usePrefix:true,
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args, Users }) {
  let { messageID, senderID, threadID } = event;

  if (args.length === 1 && args[0] === "قائمة") {
    const logoTypes = [
      "المتحولون", "زهور", "هاري ", "الكتابةعلىالجدران ", "بلاكبينك",
      "نيون", "برق", "ظل", "حديدي", "ناروتو", "نار",
      "عيدميلاد", "شعارالدب", "باري", "هفوة"
    ];
    return api.sendMessage(`جميع أنواع الشعارات:\n\n${logoTypes.join(", ")}`, threadID, messageID);
  }

  if (args.length < 2) {
    return api.sendMessage(`تنسيق الأمر غير صالح! إستخدم: /لوغو <نوع الشعار> <الإسم>\nلإظهار كافة أنواع الشعارات: ®لوغو قائمة`, threadID, messageID);
  }

  let type = args[0].toLowerCase();
  let name = args[1];
  let name2 = args.slice(2).join(" ");
  let pathImg = __dirname + `/cache/${type}_${name}.png`;
  let apiUrl, message;

  switch (type) {
    case "المتحولون":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/textpro/transformer?text=${name}`;
      message = "[المتحولون] لقد تم إنشاء الشعار:";
      break;
    case "زهور":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/photooxy/flower-typography?text=${name}`;
      message = "[زهور] لقد تم إنشاء الشعار:";
      break;
    case "هاري":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/photooxy/harry-potter?text=${name}`;
      message = "[هاري بوتر] لقد تم إنشاء الشعار:";
      break;
    case "الكتابةعلىالجدران":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/textpro/graffiti1?text=${name}`;
      message = "[الكتابة على الجدران] لقد تم إنشاء الشعار:";
      break;
    case "بلاكبينك":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/textpro/blackpink?text=${name}`;
      message = "[بلاك بينك] لقد تم إنشاء الشعار:";
      break;
    case "نيون":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/textpro/neon?text=${name}`;
      message = "[نيون] لقد تم إنشاء الشعار:";
      break;
    case "برق":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/textpro/thunder?text=${name}`;
      message = "[برق] لقد تم إنشاء الشعار:";
      break;
    case "ظل":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/photooxy/shadow-sky?text=${name}`;
      message = "[ظل المتزلج على اللوح] لقد تم إنشائه:";
      break;
    case "حديدي":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/photooxy/metallic?text=${name}`;
      message = "[حديدي] لقد تم إنشاء الشعار:";
      break;
    case "ناروتو":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/photooxy/naruto?text=${name}`;
      message = "[ناروتو] لقد تم إنشاء الشعار:";
      break;
    case "نار":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/photooxy/flaming?text=${name}`;
      message = "[نار] لقد تم انشاء الشعار:";
      break;
    case "عيدميلاد":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/textpro/3dchristmas?text=${name}`;
      message = "[عيد ميلاد المسيح] تم إنشاء الشعار:";
      break;
    case "شعارالدب":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/textpro/logobear?text=${name}`;
      message = "[شعار الدب] لقد تم إنشاء الشعار:";
      break;
    case "باري":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/textpro/berry?text=${name}`;
      message = "[باري] لقد تم إنشاء الشعار:";
      break;
    case "هفوة":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/textpro/glitch?text=${name}`;
      message = "[هفوة] لقد تم إنشاء الشعار:";
      break;
    default:
      return api.sendMessage(`  |⚠️ الشعار اللذي أدخلته غير صالح ! إستخدم: *شعار قائمة لإظهار كل أنواع الشعارات المتاحة`, threadID, messageID);
  }

  api.sendMessage(" ⏱️ | جاري إنشاء الشعار يرجى الإنتظار رجاءا...", threadID, messageID);
  let response = await axios.get(apiUrl, { responseType: "arraybuffer" });
  let logo = response.data;
  fs.writeFileSync(pathImg, Buffer.from(logo, "utf-8"));
  return api.sendMessage(
    {
      body: message,
      attachment: fs.createReadStream(pathImg),
    },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};