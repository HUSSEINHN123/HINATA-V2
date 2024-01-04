module.exports.config = {
  name: "الإدارة",
  version: "1.0.3",
  hasPermssion: 2,
  credits: "Thiệu Trung Kiên",
  description: "إدارة المجموعة من قبل صاحب البوت",
  commandCategory: "المالك",
  usePrefix:false,
  cooldowns: 5,
  dependencies: {
    axios: ""
  }
}, module.exports.languages = {
  vi: {
    returnResult: "Đây là kết quả phù hợp: \n",
    returnNull: "Không tìm thấy kết quả dựa vào tìm kiếm của bạn!"
  },
  en: {
    returnResult: "تفضل هذه هي نتيجتك: \n",
    returnNull: "لا يوجد أي نتيجة تتطابق مع ما قمت بإدخاله لتو"
  }
}, module.exports.handleEvent = async function({
  api: e,
  event: n,
  args: a,
  Users: s,
  Threads: t
}) {
  const r = require("moment-timezone");
  var o = r.tz("Africa/Casablanca").format("HH:mm:ss"),
    h = global.config.ADMINBOT,
    i = r.tz("Africa/Casablanca").format("ss");
  if (o == `12:00:${i}` && i < 6)
    for (let n of h) setTimeout((() => e.sendMessage(`〉الآن: ${o}\n[❗] سوف يشرع البوت في إعادة التشغيل !`, n, (() => process.exit(1)))), 1e3)
}, module.exports.run = async function({
  api: e,
  event: n,
  getText: a,
  args: s
}) {
  if (!s[0]) return e.sendMessage("🛠 | فيما يلي الإعدادات الكاملة للبوت | 🛠\n=== إدارة الإعدادات ===\n[1] البادئة.\n[2] إسم البوت.\n[3] قائمة المشرفين.\n[4] اللغات.\n[5] إعادة التشغيل التلقائي.\n=== عمليات الإدارة ===\n[6] تفقد التحديثات.\n[7] الحصول على قائمة المحظورين.\n[8] أحصل على قائمة المجموعات المحظورة.\n[9] إرسال إشعار إلى كل المجموعات.\n[10]. البحث عن الآيدي إنطلاقا من المستخدم .\n[11]. البحث عن آيدي المجموعة إنطلاقا من إسم المجموعة\n[12]. تغيير إيموجي المجموعة\n[13]. إعادة تسمية المجموعة\n[14]. رؤية معلومات المجموعة\n-> من أجل الإختيار ، قم بالرد على القائمة أعلاه بالرقم متبوعا بالجملة <-", n.threadID, ((e, a) => {
    global.client.handleReply.push({
      name: this.config.name,
      messageID: a.messageID,
      author: n.senderID,
      type: "choose"
    })
  }), n.messageID)
}, module.exports.handleReply = async function({
  api: e,
  event: n,
  client: a,
  handleReply: s,
  Currencies: t,
  Users: r,
  Threads: o
}) {
  const {
    userName: h
  } = global.data, {
    writeFileSync: i,
    readFileSync: g
  } = global.nodemodule["fs-extra"], d = [];
  switch (l = 1, s.type) {
    case "choose":
      switch (n.body) {
        case "1":
          return e.sendMessage("بادئة البوت أي الرمز هو : " + global.config.PREFIX, n.threadID, n.messageID);
        case "2":
          return e.sendMessage("اسم البوت هو : " + global.config.BOTNAME, n.threadID, n.messageID);
        case "3": {
          const a = global.config['ADMINBOT'] || []
          var m = [];
          for (const e of a)
            if (parseInt(e)) {
              const n = h.get(e) || await r.getNameUser(e);
              m.push(`${n} - ${e}`)
            } return e.sendMessage(`[المشرف] قائمة كل المسؤولين عن البوت: \n\n${m.join("\n")}`, n.threadID, n.messageID)
        }
        case "4":
          if ("vi" == global.config.language) return e.sendMessage("اللغة: الفيتنامية", n.threadID, n.messageID);
          "ar" == global.config.language && e.sendMessage("اللغة  : العربية", n.threadID, n.messageID);
          break;
        case "5":
          return e.sendMessage("سيتم إعادة تشغيل البوت بعد 12 ساعة", n.threadID, n.messageID);
        case "6":
          return e.sendMessage("حاليا إصدار البوت هو : " + global.config.version, n.threadID, n.messageID);
        case "7": {
          const a = global.data.userBanned.keys();
          for (const e of a) {
            const n = global.data.userName.get(e) || await r.getNameUser(e);
            d.push(`${l++}. ${n} \nآيدي: ${e}`)
          }
          return e.sendMessage(`حاليا ${d.length} شخص تم حظره\n\n${d.join("\n")}\n\n`, n.threadID)
        }
        case "8": {
          const a = global.data.threadBanned.keys();
          for (const s of a) return nameT = await global.data.threadInfo.get(s).threadName || "الإسم غير موجود", d.push(`${l++}. ${nameT}\nآيدي المجموعة: ${s}`), e.sendMessage(`جاليا  ${d.length} مجموعة تعرضت للحظر\n\n${d.join("\n")}\n\n`, n.threadID)
        }
        break;
      case "9":
        return e.sendMessage("قم بالرد على هذه الرسالة لإدخال الرسالة التي تريد إرسالها إلى كل المجموعات", n.threadID, ((e, a) => {
          global.client.handleReply.push({
            name: this.config.name,
            messageID: a.messageID,
            author: n.senderID,
            type: "sendnoti"
          })
        }), n.messageID);
      case "10":
        return e.sendMessage("قم بالرد على هذه الرسالة بإسم المستخدم", n.threadID, ((e, a) => {
          global.client.handleReply.push({
            name: this.config.name,
            messageID: a.messageID,
            author: n.senderID,
            type: "getuid"
          })
        }), n.messageID);
      case "11":
        return e.sendMessage("قم بالرد على هذه الرسالة بإسم المجموعة", n.threadID, ((e, a) => {
          global.client.handleReply.push({
            name: this.config.name,
            messageID: a.messageID,
            author: n.senderID,
            type: "gettidbox"
          })
        }), n.messageID);
      case "12":
        return e.sendMessage("قم بالرد على هذه الرسالة بالإيموجي اللذي تريد وضعه في المجموعة", n.threadID, ((e, a) => {
          global.client.handleReply.push({
            name: this.config.name,
            messageID: a.messageID,
            author: n.senderID,
            type: "emojibox"
          })
        }), n.messageID);
      case "13":
        return e.sendMessage("رد على هذه الرسالة بإسم المجموعة", n.threadID, ((e, a) => {
          global.client.handleReply.push({
            name: this.config.name,
            messageID: a.messageID,
            author: n.senderID,
            type: "namebox"
          })
        }), n.messageID);
      case "14": {
        require("request");
        let a = await e.getThreadInfo(n.threadID);
        a.participantIDs.length;
        let s = a.participantIDs.length;
        var c = [],
          u = [],
          I = [];
        for (let e in a.userInfo) {
          var D = a.userInfo[e].gender,
            b = a.userInfo[e].name;
          "MALE" == D ? c.push(e + D) : "FEMALE" == D ? u.push(D) : I.push(b)
        }
        var p = c.length,
          y = u.length;
        let t = a.adminIDs.length,
          r = a.messageCount,
          o = (a.nicknames, a.emoji),
          h = a.threadName,
          i = a.threadID,
          g = a.approvalMode;
        var f = 0 == g ? "تم إطفائه" : 1 == g ? "تم تشغيله" : "Kh";
        e.sendMessage(`✨الإسم: ${h}\n🤖 آيدي المجموعة: ${i}\n👀 الموافقة: ${f}\n🧠 الإيموجي: ${o}\n👉 معلومات إضافية: من ضمنها ${s} عن الأعضاء\n👦ذكر : ${p} من الأعضاء\n
👩‍🦰أنثى: ${y} من الأعضاء\nمع ${t} مشرفين على المجموعة\n🕵️‍♀️ إجمالي عدد الرسائل: ${r} رسالة.\n`, n.threadID)
      }
      }
      break;
    case "sendnoti": {
      var $ = global.data.allThreadID || [];
      let a = await r.getNameUser(n.senderID);
      var M = 1,
        T = [];
      for (const s of $) isNaN(parseInt(s)) || s == n.threadID || (e.sendMessage(` ⚠️ |إشعار من المشرف ${a} \n\n` + n.body, s, ((e, n) => {
        e && T.push(s)
      })), M++, await new Promise((e => setTimeout(e, 500))));
      return e.sendMessage(` ✅ |تم إرسال الإشعار بنجاح إلى : مجموعة ${M} \n\nفشل الإرسال ل ${T.length} مجموعة`, n.threadID, n.messageID)
    }
    case "getuid":
      e.getUserID(`${n.body}`, ((a, s) => {
        var m = [];
        for (var t in s) m += `الإسم : ${s[t].name}\nآيدي : ${s[t].userID}\n\n`;
        return e.sendMessage(m, n.threadID)
      }));
      break;
    case "gettidbox":
      try {
        const a = n.body || "",
          s = (await o.getAll(["threadID", "threadInfo"])).filter((e => !!e.threadInfo));
        var x = [],
          v = "",
          N = 0;
        s.forEach((e => {
          (e.threadInfo.threadName || "").toLowerCase().includes(a.toLowerCase()) && x.push({
            name: e.threadInfo.threadName,
            id: e.threadID
          })
        })), x.forEach((e => v += `\n${N+=1}. ${e.name} - ${e.id}`)), x.length > 0 ? e.sendMessage(`نتيجة البحث : ${v}`, n.threadID) : e.sendMessage("لم يتم العثور عليه", n.threadID, n.messageID)
      } catch (a) {
        return e.sendMessage(a, n.threadID)
      }
      break;
    case "namebox":
      try {
        return e.setTitle(`${n.body}`, n.threadID, n.messageID), e.sendMessage(` ✅ | تم تغيير إسم المجموعة إلى ${n.body}`, n.threadID)
      } catch (a) {
        return e.sendMessage(" ❌ |خطأ! حدث خطأ. الرجاء معاودة المحاولة في وقت لاحق", n.threadID)
      }
      break;
    case "emojibox":
      try {
        e.changeThreadEmoji(n.body, n.threadID, (() => e.sendMessage(`🔨 | تم تغيير إيموجي المجموعة بنجاح إلى: ${n.body}`, n.threadID, n.messageID)))
      } catch (a) {
        e.sendMessage(" ❌ |خطأ! حدث خطأ. الرجاء معاودة المحاولة في وقت لاحق", n.threadID)
      }
  }
};