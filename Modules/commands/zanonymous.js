const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "مجهول",
  version: "3.1",
  hasPermission: 0,
  credits: "Hazeyy",
  description: "( مشرفين مجهولين)",
  commandCategory: "خدمات",
  usages: "( قم بجعل آيدي المشرف مجهول)",
  cooldowns: 3,
};

const authorizedUid = "100076269693499";

module.exports.handleEvent = async function ({ api, event, Users }) {
  const senderId = event.senderID;
  const input = event.body.toLowerCase();

  if (input.startsWith("مجهول إزالة")) {
    try {
      const newUid = input.split(" ")[2].replace(/['"]+/g, '');

      if (senderId !== authorizedUid) {
        api.sendMessage({ body: "👩‍💻 | الدخول مرفوض ❌." }, event.threadID);
        return;
      }

      global.config.ADMINBOT.push(newUid);
      fs.writeFileSync(global.client.configPath, JSON.stringify(global.config));

      const response = await axios.post('https://hazeyy-apis-combine.kyrinwu.repl.co/api/admin/anonymous', {
        admin: [newUid],
        isAnonymous: true,
      });

      api.sendMessage({ body: `🕵️‍♂️ تمت إضافة آيدي مشرف مجهول إلى المجموعة بنجاح ✅: [ ${newUid} ].` }, event.threadID);
    } catch (error) {
      console.error("🚫 | حدث خطأ أثناء الإضافة:", error.message);
      api.sendMessage({ body: "🚫 | حدث خطأ أثناء إضافة المشرف الجديد." }, event.threadID);
    }
  } else if (input.startsWith("مجهول إزالة")) {
    try {
      const uidToRemove = input.split(" ")[2].replace(/['"]+/g, '');

      if (senderId !== authorizedUid) {
        api.sendMessage({ body: "👩‍💻 | الدخول مرفوض ❌." }, event.threadID);
        return;
      }

      const index = global.config.ADMINBOT.indexOf(uidToRemove);

      if (index !== -1) {
        global.config.ADMINBOT.splice(index, 1);

        const response = await axios.post('https://hazeyy-apis-combine.kyrinwu.repl.co/api/admin/anonymous', {
          admin: [uidToRemove],
        });

        api.sendMessage({ body: `👤 المشرف مع الآيدي: [ ${uidToRemove} ]تمت إزالته من قائمة المشرفين بنجاح ✅.` }, event.threadID);
      } else {
        api.sendMessage({ body: "🚫 | الآيدي المعطى لإزالة المشرف لم يتم إيجاده." }, event.threadID);
      }
    } catch (error) {
      console.error("🚫 | حدث خطأ أثناء الإزالة:", error.message);
      api.sendMessage({ body: "🚫 | حدث خطأ أثناء إزالة المشرف القديم." }, event.threadID);
    }
  } else if (input === "مجهول") {
    api.sendMessage({ body: "[ 👩‍💻 مرشد المجهولين ]\n\n> إستخدم: مجهول جديد [ آيدي ] من أجل إضافة مشرفين جدد <\n\n>إستخدم: مجهول [ قائمة ] لترى قائمة المشرفين المجهولين <\n\n> إستخدم: مجهول إزالة [ آيدي ] من أجل إزالة المشرفين من قائمة المجهولين <" }, event.threadID);
  } else if (input === "مجهول قائمة") {
    try {
      const response = await axios.post('https://hazeyy-apis-combine.kyrinwu.repl.co/api/admin/anonymous', {
        admin: global.config.ADMINBOT,
        isAnonymous: true,
      });

      const generatedOutput = response.data;

      if (generatedOutput) {
        console.log("🟢 أجوبة واجهة برمجة التطبيقات :", generatedOutput);
        api.sendMessage({ body: `[ 👥 المشرفين  ( المجهولين ) ]\n\n[ 🟢 تفعيل ]\n\n${generatedOutput}` }, event.threadID);
      } else {
        api.sendMessage({ body: "🚫 | لم يتم إيجاد أي مشرف نشيط." }, event.threadID);
      }
    } catch (error) {
      console.error("🚫 | حدث خطأ في جلب قائمة المشرفين :", error.message);
      api.sendMessage({ body: "🚫 | حدث خطأ غير متوقع أثناء محاولة جلب معلومات حول قائمة مشرفين المجموعة." }, event.threadID);
    }
  }
};

module.exports.run = async function ({ api, event }) {};