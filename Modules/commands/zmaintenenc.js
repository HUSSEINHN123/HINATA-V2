const fs = require("fs").promises;
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);

});

module.exports.config = {
  name: "إصلاحات",
  version: "1.0.0",
  allowedUID: "100076269693499", 
  credits: "Marjhun Baylon",
  description: "صيانة البوت من الأخطاء",
  usePrefix: false,
  commandCategory: "النظام",
  usage: "إصلاحات تشغيل/إيقاف/الحالة",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, body } = event;


  if (typeof body !== 'string') {
    console.error("Invalid body:", body);
    return;
  }

  const command = body.toLowerCase();

  if (command.startsWith("maintenance")) {
    const args = command.split(" ");
    const action = args[1];

    try {
      const hasPermission = await checkPermission(api, event.senderID);

      if (!hasPermission) {
        api.sendMessage(" ⚠️ | ليست لديك الصلاحية لإستخدام هذا الأمر فقط حسين يعقوبي يمكنه ذللك.", threadID);
        return;
      }

      if (action === "تشغيل" || action === "إيقاف" || action === "الحالة") {
        await setMaintenance(action, api, threadID);
      } else {
        api.sendMessage(" ❌ |إستخدام غير صالح . أرجوك إستخدم'إصلاحات تشغيل', 'إصلاحات إيقاف', أو 'إصلاحات الحالة'.", threadID);
      }
    } catch (error) {
      console.error("Error handling maintenance command:", error);
      api.sendMessage(" ❌ |حدث خطأ أثناء معالجة الأمر. تحقق من سجلات الخادم لمزيد من التفاصيل.", threadID);
    }
  }
};

async function setMaintenance(action, api, threadID) {
  const path = "./config.json";

  try {
    const configData = JSON.parse(await fs.readFile(path, "utf8"));
    const wasMaintenanceOn = configData.maintenanceMode;

    if (action === "تشغيل") {
      configData.maintenanceMode = true;
      configData.adminOnly = true;
      api.sendMessage(" ✅ |• الإصلاحات هي قيد التشغيل الآن.", threadID);

      setTimeout(() => {
        api.sendMessage(" 🔁 |• جاري إعادة التشغيل...", threadID);
        setTimeout(() => {
          api.sendMessage(" ✅ |• لقد تمت إعادة تشغيل البوت بنجاح و ستبدأ التصليحات.", threadID);
        }, 2000); 
        setTimeout(() => {
          process.exit(1); 
        }, 5000); 
      }, 10000);
    } else if (action === "إيقاف") {
      configData.maintenanceMode = false;
      configData.adminOnly = false;
      api.sendMessage(" ✅ |• الإصلاحات تم تعطيلها.", threadID);

      setTimeout(() => {
        api.sendMessage(" 🔁 |• جاري أعادة التشغيل...", threadID);
        setTimeout(() => {
          api.sendMessage(" ✅ |• لقد قام البوت بإعادة التشغيل بنجاح. ووضع الصيانة متوقف الآن. يمكنك الآن استخدام البوت.", threadID);
        }, 2000); 
        setTimeout(() => {
          process.exit(1); 
        }, 5000); 
      }, 10000); 
    } else if (action === "الحالة") {
      checkMaintenanceStatus(api, threadID, configData.maintenanceMode);
      return;
    }

    await fs.writeFile(path, JSON.stringify(configData, null, 2));

    if ((action === "تشغيل" && !wasMaintenanceOn) || (action === "إيقاف" && wasMaintenanceOn)) {
    }
  } catch (error) {
    console.error("Error updating maintenance mode:", error);
    api.sendMessage(" ❌ |حدث خطأ أثناء تحديث وضع الصيانة. تحقق من سجلات الخادم لمزيد من التفاصيل.", threadID);
  }
}

async function checkPermission(api, senderID) {
  try {
    return senderID === module.exports.config.allowedUID;
  } catch (error) {
    console.error("Error checking user permission:", error);
    return false;
  }
}

function checkMaintenanceStatus(api, threadID, isMaintenanceOn) {
  const statusMessage = isMaintenanceOn
    ? " ✅ |• تم تشغيل الصيانة حاليًا."
    : " ❌ |• تم إيقاف الصيانة حاليًا.";

  api.sendMessage(statusMessage, threadID);
}