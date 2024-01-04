module.exports.config = {
  name: "تحقق",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Dipto",
  usePrefix: true,
  description: "التحقق من الإدخال هو حرف علة، ساكن، أو رقم",
  commandCategory: "خدمات",
  usages: "تحقق [حرف]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, body } = event;
  const input = body.slice(body.indexOf(' ') + 1).trim().toLowerCase(); // Assuming command is called like "!chek a" or "!chek 5"

  if (!input) {
    api.sendMessage("يرجى تقديم حرف أو رقم.", threadID, messageID);
    return;
  }

  if (input.length === 1) {
    if (input >= '0' && input <= '9') {
      api.sendMessage("إنه رقم.", threadID, messageID);
    } else if ("ا و ي ".includes(input)) {
      api.sendMessage("هذا حرف مد.", threadID, messageID);
    } else if (input >= 'أ' && input <= 'ي') {
      api.sendMessage("هذا حرف.", threadID, messageID);
    } else {
      api.sendMessage("ماقمت بإدخاله غير صالح. الرجاء إدخال حرف أو رقم واحد.", threadID, messageID);
    }
  } else {
    api.sendMessage("ماقمت به غير صالح. الرجاء إدخال حرف واحد فقط.", threadID, messageID);
  }
};