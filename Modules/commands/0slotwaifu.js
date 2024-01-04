module.exports.config = {
    name: "رهان_الزوجات",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "Binee",
    description: "لعبة رهان زوجات الأنمي",
    commandCategory: "متعة",
    usages: "[أومارو/نامي/شيتاندا/ميراي/إلينا/ميكاسا] أو إستخدم[🔥/⚡/🍙/🦞/🦵/🐱] <ثم ضع المبلغ  50.دولار)>",
    cooldowns: 0
  };
  
  module.exports.run = async function({ api, event, args, Currencies, getText, permssion }) {
    try {
      const { threadID, messageID, senderID } = event;
      const { getData, increaseMoney, decreaseMoney } = Currencies;
      const request = require('request');
      const axios = require('axios');
      if (this.config.credits != 'Binee') {
        console.log(`\x1b[33m[ WARN ]\x1b[37m » Change credits to your mother's dick, dog:))`);
        return api.sendMessage('[ WARN ] Detect bot operator ' + global.config.BOTNAME + ' change credits modules "' + this.config.name + '"', threadID, messageID);
      }
      const { readdirSync, readFileSync, writeFileSync, existsSync, copySync, createWriteStream, createReadStream } = require("fs-extra");
      const slotItems = ["أومارو", "نامي", "شيتاندا", "ميراي", "إلينا", "ميكاسا"];
      const money = (await getData(senderID)).money;
      if (isNaN(args[1]) == true) return api.sendMessage('مبلغ الرهان اللذي قمت بإدخاله ليس صالحا 😡!', threadID, messageID);
      var moneyBet = parseInt(args[1]);
      if (isNaN(moneyBet) || moneyBet <= 50) return api.sendMessage('لا بمكنك أن تراهن بمبلغ أقل من  أو يساوي 50 دولار 🤨', threadID, messageID);
      if (moneyBet > money) return api.sendMessage('ليس لديك مال كاف يا صديقي أو صديقتي قم أو قومي بإستخدام الأوامر التالية عمل أو كهف أو قبلة 🙃.', threadID, messageID);
      var number = [], list = [], listimg = [], win = false;
      var baucua1 = slotItems[Math.floor(Math.random() * slotItems.length)];
      var baucua2 = slotItems[Math.floor(Math.random() * slotItems.length)];
      var baucua3 = slotItems[Math.floor(Math.random() * slotItems.length)];
      // ARGS
      let content = args[0];
      var content1;
      if (content == 'أوكارو' || content == '🔥') {
        content1 = 'أومارو';
      }
      else if (content == 'نامي' || content == '⚡') {
        content1 = 'نامي';
      }
      else if (content == 'شيتاندا' || content == '🍙') {
        content1 == 'شيتاندا';
      }
      else if (content == 'ميراي' || content == '🦞') {
        content1 = 'ميراي';
      }
      else if (content == 'إلينا' || content == '🦵') {
        content1 = 'إلينا';
      }
      else if (content == 'ميكاسا' || content == '🐱') {
        content1 = 'ميكاسا';
      }
      else {
        return api.sendMessage(`صيغة خاطئة إستخدم\n${global.config.PREFIX}${this.config.name} [أومارو/نامي/شيتاندا/ميراي/إلينا/ميكاسا] أو إستخدم[🔥/⚡/🍙/🦞/🦵/🐱] <ثم ضع المبلغ  50 دولار)>`, threadID, messageID);
      }
      // request
      if (!existsSync(__dirname + '/cache/umaru.jpg')) {
        request('https://imgur.com/PJ8xGcA.jpg').pipe(createWriteStream(__dirname + '/cache/umaru.jpg'));
      }
      if (!existsSync(__dirname + '/cache/nami.jpg')) {
        request('https://imgur.com/n6TShJP.jpg').pipe(createWriteStream(__dirname + '/cache/nami.jpg'));
      }
      if (!existsSync(__dirname + '/cache/chitanda.jpg')) {
        request('https://imgur.com/tp4Pjo1.jpg').pipe(createWriteStream(__dirname + '/cache/chitanda.jpg'));
      }
      if (!existsSync(__dirname + '/cache/mirai.jpg')) {
        request('https://imgur.com/mf4EMOx.jpg').pipe(createWriteStream(__dirname + '/cache/mirai.jpg'));
      }
      if (!existsSync(__dirname + '/cache/elaina.jpg')) {
        request('https://imgur.com/wYJwU3y.jpg').pipe(createWriteStream(__dirname + '/cache/elaina.jpg'));
      }
      if (!existsSync(__dirname + '/cache/mikasa.jpg')) {
        request('https://imgur.com/C0XFKxy.jpg').pipe(createWriteStream(__dirname + '/cache/mikasa.jpg'));
      }
      if (!existsSync(__dirname + '/cache/quybu.gif')) {
        request('https://imgur.com/KqBXv0U.gif').pipe(createWriteStream(__dirname + '/cache/quybu.gif'));
      }
      // baucua 1
      if (baucua1 == 'أومارو') {
        var bau1 = 'أومارو';
        var bau_1 = __dirname + '/cache/umaru.jpg';
      }
      else if (baucua1 == 'نامي') {
        var bau1 = 'نامي';
        var bau_1 = __dirname + '/cache/nami.jpg';
      }
      else if (baucua1 == 'شيتاندا') {
        var bau1 = 'شيتاندا';
        var bau_1 = __dirname + '/cache/chitanda.jpg';
      }
      else if (baucua1 == 'ميراي') {
        var bau1 = 'ميراي';
        var bau_1 = __dirname + '/cache/mirai.jpg';
      }
      else if (baucua1 == 'إلينا') {
        var bau1 = 'إلينا';
        var bau_1 = __dirname + '/cache/elaina.jpg';
      }
      else if (baucua1 == 'ميكاسا') {
        var bau1 = 'ميكاسا';
        var bau_1 = __dirname + '/cache/mikasa.jpg';
      }
      // baucua 2
      if (baucua2 == 'أومارو') {
        var bau2 = 'أومارو';
        var bau_2 = __dirname + '/cache/umaru.jpg';
      }
      else if (baucua2 == 'نامي') {
        var bau2 = 'نامي';
        var bau_2 = __dirname + '/cache/nami.jpg';
      }
      else if (baucua2 == 'شيتاندا') {
        var bau2 = 'شيتاندا';
        var bau_2 = __dirname + '/cache/chitanda.jpg';
      }
      else if (baucua2 == 'ميراي') {
        var bau2 = 'ميراي';
        var bau_2 = __dirname + '/cache/mirai.jpg';
      }
      else if (baucua2 == 'إلينا') {
        var bau2 = 'إلينا';
        var bau_2 = __dirname + '/cache/elaina.jpg';
      }
      else if (baucua2 == 'ميكاسا') {
        var bau2 = 'ميكاسا';
        var bau_2 = __dirname + '/cache/mikasa.jpg';
      }
      // baucua 3
      if (baucua3 == 'أومارو') {
        var bau3 = 'أومارو';
        var bau_3 = __dirname + '/cache/umaru.jpg';
      }
      else if (baucua3 == 'نامي') {
        var bau3 = 'نامي';
        var bau_3 = __dirname + '/cache/nami.jpg';
      }
      else if (baucua3 == 'شيتاندا') {
        var bau3 = 'شيتاندا';
        var bau_3 = __dirname + '/cache/chitanda.jpg';
      }
      else if (baucua1 == 'ميراي') {
        var bau3 = 'ميراي';
        var bau_3 = __dirname + '/cache/mirai.jpg';
      }
      else if (baucua3 == 'إلينا') {
        var bau3 = 'إلينا';
        var bau_3 = __dirname + '/cache/elaina.jpg';
      }
      else if (baucua3 == 'ميكاسا') {
        var bau3 = 'ميكاسا';
        var bau_3 = __dirname + '/cache/mikasa.jpg';
      }
      // array baucua
      list.push(bau1);
      list.push(bau2);
      list.push(bau3);
      // array img
      listimg.push(createReadStream(__dirname + '/cache/' + bau1 + '.jpg'))
      listimg.push(createReadStream(__dirname + '/cache/' + bau2 + '.jpg'))
      listimg.push(createReadStream(__dirname + '/cache/' + bau3 + '.jpg'))
      // ICON
      // icon 1
      if (bau1 == 'أومارو') {
        var icon1 = '🔥';
      }
      else if (bau1 == 'نامي') {
        var icon1 = '⚡'
      }
      else if (bau1 == 'شيتاندا') {
        var icon1 = '🍙';
      }
      else if (bau1 == 'ميراي') {
        var icon1 = '🦞';
      }
      else if (bau1 == 'إلينا') {
        var icon1 = '🦵';
      }
      else if (bau1 == 'ميكاسا') {
        var icon1 = '🐱';
      }
      // icon 2
      if (bau2 == 'أومارو') {
        var icon2 = '🔥';
      }
      else if (bau2 == 'نامي') {
        var icon2 = '⚡'
      }
      else if (bau2 == 'شيتاندا') {
        var icon2 = '🍙';
      }
      else if (bau2 == 'ميراي') {
        var icon2 = '🦞';
      }
      else if (bau2 == 'إلينا') {
        var icon2 = '🦵';
      }
      else if (bau2 == 'ميكاسا') {
        var icon2 = '🐱';
      }
      // icon 3
      if (bau3 == 'أومارو') {
        var icon3 = '🔥';
      }
      else if (bau3 == 'نامي') {
        var icon3 = '⚡'
      }
      else if (bau3 == 'شيتانادا') {
        var icon3 = '🍙';
      }
      else if (bau3 == 'ميراي') {
        var icon3 = '🦞';
      }
      else if (bau3 == 'إلينا') {
        var icon3 = '🦵';
      }
      else if (bau3 == 'ميكاسا') {
        var icon3 = '🐱';
      }
      // sendMessage
      api.sendMessage({
        body: 'حظا سعيدا 🙃 :3333 ',
        attachment: createReadStream(__dirname + '/cache/quybu.gif')
      }, threadID, (err, info) => {
        if (err) return api.sendMessage(err, threadID, messageID);
        setTimeout(() => {
          api.unsendMessage(info.messageID);
          var check = list.findIndex(i => i.toString() == content1);
          var check2 = list.includes(content1);
          //console.log(check);
          //console.log(icon1 + icon2 + icon3);
          if (check >= 0 || check2 == true) {
            return api.sendMessage({
              body: `أيقونات شخصيات الأنمي: ${icon1} | ${icon2} | ${icon3}\n🥳لقد فزت وحصلت على ${moneyBet * 5} دولار`,
              attachment: listimg
            }, threadID, () => Currencies.increaseMoney(senderID, moneyBet * 5), messageID);
          }
          else if (check < 0 || check2 == false) {
            return api.sendMessage({
              body: `أيقونات شخصيات الأنمي: ${icon1} | ${icon2} | ${icon3}\n😢لقد.خسرت و تم الخصم منك ${moneyBet} دولار`,
              attachment: listimg
            }, threadID, () => Currencies.decreaseMoney(senderID, moneyBet), messageID);
          }
          else {
            return api.sendMessage('خطأ! حدث خطأ. الرجاء معاودة المحاولة في وقت لاحق. يرجى المحاولة مرة أخرى خلال 5 ثواني', threadID, messageID);
          }
        }, 3000);
      }, messageID);
    }
    catch (err) {
      console.error(err);
      return api.sendMessage(err, event.threadID, event.messageID);
    }
        }