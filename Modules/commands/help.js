const moment = require('moment-timezone');
const axios = require("axios");
const request = require('request');
const fs = require("fs-extra");

module.exports.config = {
  name: "أوامر",
  version: "1.0.2",
  hasPermission: 0,
  credits: "Cypruspro21k",
  description: "قائمة الأوامر،مرشد المبتدئين",
  commandCategory: "النظام",
  usages: "إسم الأمر أو أتركه فارغا",
  cooldowns: 1,
  envConfig: {
    autoUnsend: false,
    delayUnsend: 300
  }
};

module.exports.languages = {
  "en": {
    "moduleInfo": "🌸──────[ %1 ]──────🌸\n\nالإستعمال: %3\nالفئة: %4\nوقت الإنتظار: %5 ثانية\nمن يمكنه إستعمال الأمر: %6\nالوصف: %2\n\nتم الإنشاء من طرف %7",
    "helpList": '[ هناك حوالي %1 أمر على هيناتا البوت إستخدم: "%2أوامر إسم الأمر" لكي تعرف كيفية إستخدم هذا الأمر! ]',
    "user": "الجميع",
    "adminGroup": "فقط مشرفين المجموعة",
    "adminBot": "فقط مالك البوت"
  }
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || typeof body === "undefined" || body.indexOf("help") !== 0) return;

  const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
  if (splitBody.length === 1 || !commands.has(splitBody[1].toLowerCase())) return;

  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : global.config.PREFIX;

  return api.sendMessage(
    getText(
      "moduleInfo",
      command.config.name,
      command.config.description,
      `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`,
      command.config.commandCategory,
      command.config.cooldowns,
      ((command.config.hasPermission === 0) ? getText("user") : (command.config.hasPermission === 1) ? getText("adminGroup") : getText("adminBot")),
      command.config.credits
    ),
    threadID,
    messageID
  );
};

module.exports.run = function ({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : global.config.PREFIX;

  if (args[0] === "الكل") {
    const commandList = Array.from(commands.values());
    var group = [], msg = "";

    for (const commandConfig of commandList) {
      if (!group.some(item => item.group.toLowerCase() === commandConfig.config.commandCategory.toLowerCase())) {
        group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
      } else {
        group.find(item => item.group.toLowerCase() === commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
      }
    }

    group.forEach(commandGroup => msg += `☂︎ ${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)} \n${commandGroup.cmds.join(' • ')}\n\n`);

    return axios.get('https://apikanna.maduka9.repl.co').then(res => {
      let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
      let admID = "61552791186880";

      api.getUserInfo(parseInt(admID), (err, data) => {
        if (err) return console.log(err);
        var obj = Object.keys(data);
        var firstname = data[obj].name.replace("@", "");
        let callback = function () {
          api.sendMessage(
            {
              body: `قِـٰٚـِْ✮ِـٰٚـِْآئمِـٰٚـِْ✮ِـٰٚـِْة آلِـٰٚـِْ✮ِـٰٚـِْأﯛ̲୭آمِـٰٚـِْ✮ِـٰٚـِْر |🐙\n\n` + msg + `\nإزعٍآجٍ آلُِبَووت أمر محٍظهـُوور ْٰ⁽⭐️₎\n\nإجٍمآلُِي عٍدِدِ آلُِأوآمر ♥️🎼 .: ${commands.size}\n\nاིلཻمຼط์وٰ໑ٰرٰ ∬💛:\n${firstname}`,
              mentions: [
                {
                  tag: firstname,
                  id: admID,
                  fromIndex: 0,
                }
              ],
              attachment: fs.createReadStream(__dirname + `/cache/472.${ext}`)
            },
            event.threadID,
            (err, info) => {
              fs.unlinkSync(__dirname + `/cache/472.${ext}`);
              if (autoUnsend === false) {
                setTimeout(() => {
                  return api.unsendMessage(info.messageID);
                }, delayUnsend * 1000);
              } else {
                return;
              }
            },
            event.messageID
          );
        }
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/472.${ext}`)).on("close", callback);
      });
    });
  }

  if (!command) {
    const arrayInfo = [];
    const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 10;
    let i = 0;
    let msg = "";

    for (var [name] of commands) {
      name += ``;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);

    const first = numberOfOnePage * page - numberOfOnePage;
    i = first;
    const helpView = arrayInfo.slice(first, first + numberOfOnePage);

    for (let cmds of helpView) msg += `${global.config.PREFIX}${cmds}\n`;

    const siu = `قِـٰٚـِْ✮ِـٰٚـِْآئمِـٰٚـِْ✮ِـٰٚـِْة آلِـٰٚـِْ✮ِـٰٚـِْأﯛ̲୭آمِـٰٚـِْ✮ِـٰٚـِْر |🐙 `;

    const text = `\nص֓ــف֛ـــحٟــٰـُ͢ـُٰــ͒͜ـًة ⁽🌔☄️ (${page}/${Math.ceil(arrayInfo.length / numberOfOnePage)})\n\nالوقت الحالي في المغرب هو: ${moment().tz("Africa/Casablanca").format("L HH:mm:ss a")}\nإجمالي عدد الأوامر :${commands.size}\nالمطور:حٟــٰـُ͢ـُٰــ͒͜ـًسܱܰـــيަنۨۨ يަعٌـــق֯ــــ୨وب߬ــيަ ⁽✨₎`;

    var link = [
      "https://i.imgur.com/iL1wkWU.jpg",
      "https://i.imgur.com/s6bCuZI.jpg",
      "https://i.imgur.com/N0rfn7X.jpg",
      "https://i.imgur.com/YXfYvyA.jpg",
      "https://i.imgur.com/P2P2ONx.jpg",
      "https://i.imgur.com/E0QFJUE.jpg",
      "https://i.imgur.com/N21qVHQ.jpg",
      "https://i.imgur.com/U8IUGxl.jpg",
      "https://i.imgur.com/1uRMxX6.jpg",
      "https://i.imgur.com/ZGbZwlp.jpg",
      "https://i.imgur.com/55ASHkg.jpg",
      "https://i.imgur.com/KlvxnAJ.jpg",
      "https://i.imgur.com/yzlUuRu.jpg",
    ];

    var callback = () => api.sendMessage({ body: siu + "\n\n" + msg + text, attachment: fs.createReadStream(__dirname + "/cache/cyprus.jpg") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/cyprus.jpg"), event.messageID);
    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/cyprus.jpg")).on("close", () => callback());
  }

  const cypruspro21k = getText("moduleInfo", command.config.name, command.config.description, `${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermission === 0) ? getText("user") : (command.config.hasPermission === 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits);

  var link = [
    "https://i.imgur.com/17Be00K.jpg",
    "https://i.imgur.com/wc0cKMD.jpg",
    "https://i.imgur.com/T5WozPe.jpg",
    "https://i.imgur.com/eAAfrqo.jpg",
  ];

  var callback = () => api.sendMessage({ body: cypruspro21k, attachment: fs.createReadStream(__dirname + "/cache/cyprus.jpg") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/cyprus.jpg"), event.messageID);
  return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/cyprus.jpg")).on("close", () => callback());
};