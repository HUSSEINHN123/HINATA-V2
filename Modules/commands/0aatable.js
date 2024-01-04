module.exports.config = {
  name: "جدول_العمليات_الحسابية",
  version: "1.0.0",
  hasPermission: 0,
  credits: "August Quinn",
  description: "يعرض عمليه الضرب, جداول الجمع والطرح والقسمة لمجموعة من الأرقام",
  commandCategory: "خدمات",
  usages: "*جدول_العمليات_الحسابية [إختيار] [بدأ] - [إنهاء]",
  cooldowns: 5,
  prefix: true,
  dependencies: "",
};

module.exports.run = function ({ api, event, args }) {
  if (args.length !== 4 || !["الضرب", "الزائد", "الطرح", "القسمة"].includes(args[0])) {
    return api.sendMessage("الإستخدام: *جدول_العمليات_الحساب [العملية] [بدأ] - [إنهاء]", event.threadID, event.messageID);
  }

  const operation = args[0].toLowerCase();
  const start = parseInt(args[1]);
  const end = parseInt(args[3]);
  
  if (isNaN(start) || isNaN(end)) {
    return api.sendMessage("يرجى تقديم أرقام البداية والنهاية الصحيحة.", event.threadID, event.messageID);
  }

  let table = "";

  switch (operation) {
    case "الضرب":
      for (let i = start; i <= end; i++) {
        for (let j = 1; j <= 10; j++) {
          table += `   ⌲ ${i} × ${j} = ${i * j}\n`;
        }
        table += "\n";
      }
      break;

    case "الزائد":
      for (let i = start; i <= end; i++) {
        for (let j = 1; j <= 10; j++) {
          table += `   ⌲ ${i} + ${j} = ${i + j}\n`;
        }
        table += "\n";
      }
      break;

    case "الطرح":
      for (let i = start; i <= end; i++) {
        for (let j = 1; j <= 10; j++) {
          table += `   ⌲ ${i} - ${j} = ${i - j}\n`;
        }
        table += "\n";
      }
      break;

    case "القسمة":
      for (let i = start; i <= end; i++) {
        for (let j = 1; j <= 10; j++) {
          table += `   ⌲ ${i} ÷ ${j} = ${(i / j).toFixed(2)}\n`;
        }
        table += "\n";
      }
      break;
  }

  const message = `🧮 نوع العمليات: ${operation}\n   ❑ من ${start} - ${end}:\n\n${table}`;
  api.sendMessage(message, event.threadID, event.messageID);
};
                            