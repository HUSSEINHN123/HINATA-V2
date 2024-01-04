const path = require("path");
const fs = require("fs");

let bannedWords = {};
let warnings = {};
let badWordsActive = {};

module.exports.config = {
  name: "الكلمات_النامية",
  version: "1.0.0",
  hasPermission: 1,
  credits: "Jonell Magallanes",
  description: "حظر شخص عند قوله كلمة نامية أو محظورة",
  usePrefix: true,
  commandCategory: "المالك",
  usages: "إضافة [كلمة] | إزالة [كلمة] | قائمة | تشغيل | إيقاف",
  cooldowns: 5,
};

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, senderID } = event;

  const loadWords = () => {
    const wordFile = path.join(__dirname, `../commands/cache/${threadID}.json`);
    if (fs.existsSync(wordFile)) {
      const words = fs.readFileSync(wordFile, "utf8");
      bannedWords[threadID] = JSON.parse(words);
    } else {
      bannedWords[threadID] = [];
    }
  };

  loadWords();

  if (!badWordsActive[threadID]) return; 

  const isAdmin = (await api.getThreadInfo(threadID)).adminIDs.some(adminInfo => adminInfo.id === api.getCurrentUserID());

  if (!isAdmin) {
    api.sendMessage("Bot Need Admin Privilege", threadID);
    return;
  }

  const messageContent = event.body.toLowerCase();
  const hasBannedWord = bannedWords[threadID].some(bannedWord => messageContent.includes(bannedWord.toLowerCase()));

  if (hasBannedWord) {
    if (!warnings[senderID]) warnings[senderID] = 0;

    warnings[senderID]++;
    if (warnings[senderID] === 2) {
      api.sendMessage(" ⚠️ |أنت بالفعل تم تحذيرك مرتين خذا يعني أنه سيتم طردك من المجموعة", threadID, messageID);
      api.removeUserFromGroup(senderID, threadID); 
      warnings[senderID] = 1;
    } else {
      api.sendMessage(` ⚠️ |  لقد تم تحديد و إكتشاف كلمة نامي  ومحظورة في جملتك "${messageContent}" إذا قمت بمعاودة الكرة سيتم طردك تلقائيا من المجموعة \n بإذن الله إذا تم رفعي آدمن`, threadID, messageID);
    }
  }
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;

  if (!args[0]) {
    return api.sendMessage("أىجوك قم بإختيار  (إضافة, إزالة, قائمة, تشغيل, إيقاف) .", threadID);
  }

  const wordFile = path.join(__dirname, `../commands/cache/${threadID}.json`);
  if (fs.existsSync(wordFile)) {
    const words = fs.readFileSync(wordFile, "utf8");
    bannedWords[threadID] = JSON.parse(words);
  } else {
    bannedWords[threadID] = [];
  }

  const isAdmin = (await api.getThreadInfo(threadID)).adminIDs.some(adminInfo => adminInfo.id === api.getCurrentUserID());

  if (!isAdmin) {
    api.sendMessage("🛡️ | يحتاج البوت أن يكون آدمن في المجموعة من أجل حظر المزعجين اللذين بتفوهون بكلام بذيء تلقائيا من المجموعة", threadID);
    return;
  }

  const action = args[0];
  const word = args.slice(1).join(' ');

  switch (action) {
    case 'إضافة':
      bannedWords[threadID].push(word);
      api.sendMessage(`✅ | تمت إضافة الكلمة ${word} إلى قائمة الكلمات المحظورة.`, threadID);
      break;
    case 'إزالة':
      const index = bannedWords[threadID].indexOf(word);
      if (index !== -1) {
        bannedWords[threadID].splice(index, 1);
        api.sendMessage(`✅ | تمت إزالة الكلمة ${word} من قائمة الكلمات المحظورة.`, threadID);
      } else {
        api.sendMessage(` ⚠️ | الكلمة ${word} لم يتم إيجادها في قائمة الكلمات المحظورة.`, threadID);
      }
      break;
    case 'list':
      api.sendMessage(`📝 | قائمة الكلمات المحظورة:\n${bannedWords[threadID].join(', ')}`, threadID);
      break;
    case 'تشغيل':
      badWordsActive[threadID] = true;
      api.sendMessage(` ✅ |تم تشغيل الحظر التلقائي للكلمات المحظورة .`, threadID);
      break;
    case 'إيقاف':
      badWordsActive[threadID] = false;
      api.sendMessage(` ❎ |الحظر التلقائي للكلمات المحظورة تم إيقافه .`, threadID);
      break;
    default: 
      api.sendMessage(" ❌ |فعل غير صحيح. المرجو إستخدام 'إضافة', 'إزالة', 'قائمة', 'تشغيل' أو 'إيقاف'.", threadID);
  }

  fs.writeFileSync(wordFile, JSON.stringify(bannedWords[threadID]), "utf8");
        }