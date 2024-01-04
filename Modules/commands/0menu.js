module.exports.config = {
  name: "قائمة",
  version: "1.0.0",
  hasPermission: 0,
  credits: "HUSSEIN",
  description: "مرشد المبتدئين",
  usePrefix: true,
  usages: "[قائمة] إستخدم [قائمة الكل]",
  commandCategory: "النظام",
  cooldowns: 5
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  let num = parseInt(event.body.split(" ")[0].trim());
  (handleReply.bonus) ? num -= handleReply.bonus : num;
  let msg = "";
  let data = handleReply.content;
  let check = false;
  if (isNaN(num)) msg = " ⚠️ |💮أ𐬠ܒ߲ߺ𐬛ܭ ܦ߳ߺܩߺ ࡅٜߺإݏࡉב࠭ߺוࡋߺ 𐬠ܦ߳ߺܩߺ ܩߺࡅ࠭ߺ וࡋߺܦ߳ߺוئܩߺܘ߳💮";
  else if (num > data.length || num <= 0) msg = "💮וࡋߺ𐬠ܦ߳ߺܩߺ וࡋߺࡋߺݏ࠭ࡉࡅ࡙ߺ إב࠭ߺࡅ𐫥ߺߺ𐬠ࡅ𐫥ߺߺܤߺ 𐭦۬ߺࡅ࡙ߺ𐬠 ࡎߺܒߺࡅ࡙ߺܒߺ 💮";
  else {
    const { commands } = global.client;
    let dataAfter = data[num -= 1];
    if (handleReply.type == "cmd_info") {
      let command_config = commands.get(dataAfter).config;
      msg += ` 『 וࡋߺܩߺܒ߲ߺܩߺ𐬛𐭦ߺܘ߳: ${command_config.commandCategory.toUpperCase()}   』   \n`;
      msg += `\n🧸 וࡋߺإܚࡅߺܩߺ: ${dataAfter}`;
      msg += `\n💬 וࡋߺ𐬛ࡎߺܦ࠭ߺ: ${command_config.description}`;
      msg += `\n☄️ ܭࡅ࡙ߺܦ࠭ߺࡅ࡙ߺܘ߳ וࡋߺإܚࡅߺࡅ𐫥ߺߺב࠭ߺݏࡉוܩߺ: ${(command_config.usages) ? command_config.usages : ""}`;
      msg += `\n⏰ 𐬛ܦ߳ߺࡅ𐫥ߺߺ וࡋߺإࡅ࠭ߺࡅ𐫥ߺߺ𐢋࠭ߺו𐬠: ${command_config.cooldowns || 5} ࡅࠦߺוࡅ࠭ߺࡅ࡙ߺܘ߳`;
      msg += `\n🔗 וࡋߺإݏ࠭ࡉࡅ࠭ߺ: ${(command_config.hasPermission == 0) ? "וࡋߺܒ߲ߺܩߺࡅ࡙ߺ𐭦ߺ" : (command_config.hasPermission == 1) ? "ܦ࠭ߺܦ߳ߺ𐢋ߺ ܩߺࡅࠦࡅࡅࡅߺ𐬠ܦ࠭ߺࡅ࡙ߺࡅ࠭ߺ וࡋߺܩߺܒ߲ߺܩߺ𐬛𐭦ߺܘ߳" : "ܦ࠭ߺܦ߳ߺ𐢋ߺ וࡋߺܩߺ𐢋ߺ𐬛𐬠"}`;
      msg += `\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏`
      msg += `\n\n→ [💓]וࡋߺࡅٜߺ𐬛ࡅ𐫥ߺߺ ࡅ࡙ߺ𐬠ܚࡅߺࡋߺ 𐬠ܚࡅߺוئࡋߺ ܤߺࡅ࠭ߺו\\𝙣 ܩߺࡅ࠭ߺ أܒ߲ߺࡋߺ ࡅ𐫥ߺߺܒߺܩߺࡅ࡙ߺࡋߺ וࡋߺܩߺ𐬠𐩐ࡅ࡙ߺݏࡉ [💝]`;
    } else {
      check = true;
      let count = 0;
      msg += `⚜️ ${dataAfter.group.toUpperCase()} \n`;

      dataAfter.cmds.forEach(item => {
        msg += `\n ${count += 1}. ➣ ${item}: ${commands.get(item).config.description}`;
      })
      msg = `[⚠️]\n
     וࡋߺܩߺ𐬠ܒ߲ߺ𐬛 إב࠭ߺࡅ𐫥ߺߺࡅ࡙ߺו𐬠 أܒߺݏࡉ וࡋߺأ𐬠ܦ߳ߺוܩߺ ܩߺࡅ࠭ߺ أܒ߲ߺࡋߺ 𐬠ؤࡅ࡙ߺܘ߳ ܩߺ𐬠𐩐ࡅ࡙ߺݏࡉ ܩߺࡅ࠭ߺ וࡋߺࡅ𐫥ߺߺܦ࠭ߺוࡎߺࡅ࡙ߺࡋߺ ܒߺ𐬛ࡋߺ ܤߺݏ࠭ࡉו וࡋߺأܩߺ𐬠`
    }
  }
  const axios = require('axios');
  const fs = require('fs-extra');
  const img = ["https://i.imgur.com/Tj47i53.gif", "https://i.imgur.com/EZcWQL6.gif", "https://i.imgur.com/mXZFkDu.gif", "https://i.imgur.com/OcziEj2.gif", "https://i.imgur.com/nd9ELtm.gif","https://i.imgur.com/4gDT0IJ.gif",];
  var path = __dirname + "/cache/menu.gif"
  var rdimg = img[Math.floor(Math.random() * img.length)];
  const imgP = []
  let dowloadIMG = (await axios.get(rdimg, { responseType: "arraybuffer" })).data;
  fs.writeFileSync(path, Buffer.from(dowloadIMG, "utf-8"));
  imgP.push(fs.createReadStream(path))
  var msgg = { body: msg, attachment: imgP }
  api.unsendMessage(handleReply.messageID);
  return api.sendMessage(msgg, event.threadID, (error, info) => {
    if (error) console.log(error);
        if (check) {
      global.client.handleReply.push({
        type: "cmd_info",
        name: this.config.name,
        messageID: info.messageID,
        content: data[num].cmds
      })
    }
  }, event.messageID);
}

module.exports.run = async function({ api, event, args }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  const axios = require('axios');
  const fs = require('fs-extra');
  const imgP = []
  const img = ["https://i.imgur.com/VOachtH.gif", "https://i.imgur.com/2Fb9iIB.gif", "https://i.imgur.com/5IF3dpR.gif", "https://i.imgur.com/rvtsEuq.gif", "https://i.imgur.com/fG392WF.gif", "https://i.imgur.com/iDVqbOG.gif",];
  var path = __dirname + "/cache/menu.gif"
  var rdimg = img[Math.floor(Math.random() * img.length)];

  let dowloadIMG = (await axios.get(rdimg, { responseType: "arraybuffer" })).data;
  fs.writeFileSync(path, Buffer.from(dowloadIMG, "utf-8"));
  imgP.push(fs.createReadStream(path))
  const command = commands.values();
  var group = [], msg = " 💮===「 ܦ߳ߺוئܩߺܘ߳ וࡋߺأ𐬛וܩߺ𐬠 」===💮\n";
  let check = true, page_num_input = "";
  let bonus = 0;

  for (const commandConfig of command) {
    if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
    else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
  }

  if (args[0] && ["الكل"].includes(args[0].trim())) {
    let all_commands = [];
    group.forEach(commandGroup => {
      commandGroup.cmds.forEach(item => all_commands.push(item));
    });
    let page_num_total = Math.ceil(all_commands.length / 2222222222);
    if (args[1]) {
      check = false;
      page_num_input = parseInt(args[1]);
      if (isNaN(page_num_input)) msg = " ⚠️ | أ𐬠ܒ߲ߺ𐬛ܭ ܦ߳ߺܩߺ ࡅٜߺإݏࡉב࠭ߺוࡋߺ 𐬠ܦ߳ߺܩߺ ࡎߺܦ࠭ߺܒߺܘ߳ ࡎߺܒߺࡅ࡙ߺܒߺܘ߳ 𐬛 ܩߺ𐬛ܒ߲ߺ𐬛ݏࡉܘ߳";
      else if (page_num_input > page_num_total || page_num_input <= 0) msg = "💝וࡋߺࡎߺܦ࠭ߺܒߺܘ߳ וࡋߺࡅ𐫥ߺߺࡅ࡙ߺ إב࠭ߺࡅ𐫥ߺߺ𐬠ࡅ𐫥ߺߺܤߺו 𐭦۬ߺࡅ࡙ߺ𐬠 ܩߺ𐬛ܒ߲ߺ𐬛ݏࡉܘ߳ ܦ࠭ߺࡅ࡙ߺ וࡋߺܦ߳ߺוئܩߺܘ߳💝";
      else check = true;
    }
    if (check) {
      index_start = (page_num_input) ? (page_num_input * 2222222222) - 2222222222 : 0;
      bonus = index_start;
      index_end = (index_start + 2222222222 > all_commands.length) ? all_commands.length : index_start + 2222222222;
      all_commands = all_commands.slice(index_start, index_end);
      all_commands.forEach(e => {
        msg += `\n${index_start += 1}. ➣ ${e}: ${commands.get(e).config.description}`;
      })
      msg += `\n\n➣ [🌸] ࡅ𐫥ߺߺ𐭦۬ߺࡅ࡙ߺࡅ࡙ߺ𐬠 ${page_num_input || 1}/${page_num_total}`;
            msg += `\n➣ [💗]ܩߺࡅ࠭ߺ أܒ߲ߺࡋߺ أࡅ࠭ߺ ࡅ𐫥ߺߺ𐬠ى ࡅٜߺܦ߳ߺࡅ࡙ߺܘ߳ וࡋߺأ𐬛וܩߺ𐬠 إܚࡅߺࡅ𐫥ߺߺב࠭ߺݏࡉܩߺ ${prefix}قائمة [رقم الصفحة]`;
      msg += `\n➣ [🌺] ܩߺࡅ࠭ߺ أܒ߲ߺࡋߺ أࡅ࠭ߺ ࡅ𐫥ߺߺ𐬠ى ܭࡋߺ أ𐬛וܩߺ𐬠 וࡋߺܦ߳ߺוئܩߺܘ߳ إܚࡅߺࡅ𐫥ߺߺב࠭ߺݏࡉܩߺ ${prefix}أوامر الكل\n\nܦ߳ߺܩߺ ࡅٜߺוࡋߺ𐬠ݏࡉ 𐭦ߺࡋߺى ܤߺݏ࠭ࡉܤߺ וࡋߺ𐬠ܚࡅߺוࡋߺܘ߳ إݏ࠭ࡉו أ𐬠ݏࡉࡅ𐫥ߺߺ أࡅ࠭ߺ ࡅ𐫥ߺߺ𐬠ى ܩߺ𐬠𐩐ࡅ࡙ߺݏࡉו ܩߺࡅ࠭ߺ וࡋߺࡅ𐫥ߺߺܦ࠭ߺוࡎߺࡅ࡙ߺࡋߺ.`
    }
    var msgg = { body: msg, attachment: imgP }
    return api.sendMessage(msgg, threadID, (error, info) => {
      if (check) {
        global.client.handleReply.push({
          name: this.config.name,
          bonus: bonus,
          messageID: info.messageID,
          content: all_commands
        })
      }
    }, messageID)
  }

  let page_num_total = Math.ceil(group.length / 2222222222);
  if (args[0]) {
    check = false;
    page_num_input = parseInt(args[0]);
    if (isNaN(page_num_input)) msg = " ⚠️ | أ𐬠ܒ߲ߺ𐬛ܭ ܦ߳ߺܩߺ ࡅٜߺإݏࡉב࠭ߺוࡋߺ 𐬠ܦ߳ߺܩߺ ࡎߺܦ࠭ߺܒߺܘ߳ ࡎߺוࡋߺܒߺܘ߳";
    else if (page_num_input > page_num_total || page_num_input <= 0) msg = " ⚠️ | וࡋߺ𐬠ܦ߳ߺܩߺ וࡋߺࡋߺݏ࠭ࡉࡅ࡙ߺ إב࠭ߺࡅ𐫥ߺߺ𐬠ࡅ𐫥ߺߺܤߺ 𐭦۬ߺࡅ࡙ߺ𐬠 ࡎߺܒߺࡅ࡙ߺܒߺ וࡋߺܩߺ𐬠ܒ߲ߺ𐬛 إ𐭦ߺוݏࡉܘ߳ וࡋߺܩߺܒߺו𐬛ࡋߺܘ߳❤️‍🔥";
    else check = true;
  }
  if (check) {
    index_start = (page_num_input) ? (page_num_input * 2222222222) - 2222222222 : 0;
    bonus = index_start;
    index_end = (index_start + 2222222222 > group.length) ? group.length : index_start + 2222222222;
    group = group.slice(index_start, index_end);
    group.forEach(commandGroup => msg += `\n${index_start += 1}. ➣ ${commandGroup.group.toUpperCase()} ☄️ `);
    msg += `\n\n『 ܤߺࡅ࡙ߺࡅ࠭ߺוࡅ𐫥ߺߺו 』\n ➣ [📖] וࡋߺࡅ𐫥ߺߺࡅٜߺݏࡉࡅ࡙ߺࡋߺ 1/1 \n➣ [☄️] ܩߺࡅ࠭ߺ أܒ߲ߺࡋߺ 𐬠ؤࡅ࡙ߺܘ߳ ܦ࠭ߺئܘ߳ וࡋߺأ𐬛וܩߺ𐬠 إܚࡅߺࡅ𐫥ߺߺב࠭ߺݏࡉܩߺ .ܦ߳ߺוئܩߺܘ߳ \n➣ [🌼]ܩߺࡅ࠭ߺ أܒ߲ߺࡋߺ 𐬠ؤࡅ࡙ߺܘ߳ ܭࡋߺ וࡋߺأ𐬛וܩߺ𐬠 إܚࡅߺࡅ𐫥ߺߺב࠭ߺݏࡉܩߺ .قائمة الكل \n➣ [🌎] المطور: ܒߺܚࡅߺࡅ࡙ߺࡅ࠭ߺ ࡅ࡙ߺ𐭦ߺܦ߳ߺ𐬛ࡅٜߺࡅ࡙ߺ [💓] ܦ߳ߺܩߺ ࡅٜߺוࡋߺ𐬠ݏࡉ 𐭦ߺࡋߺى וࡋߺ𐬠ܚࡅߺוࡋߺܘ߳ ܩߺࡅ࠭ߺ أܒ߲ߺࡋߺ ܩߺ𐬠𐩐ࡅ࡙ߺݏࡉ ܩߺࡅ࠭ߺ וࡋߺࡅ𐫥ߺߺܦ࠭ߺוࡎߺࡅ࡙ߺࡋߺ:.`;

    var msgg = { body: msg, attachment: imgP }
    return api.sendMessage(msgg, threadID, async (error, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        bonus: bonus,
        messageID: info.messageID,
        content: group
      });
    });
  }
};
    