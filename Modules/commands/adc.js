module.exports.config = {
  name: "أدس",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "D-Jukie",
  description: "تطبيق الكود أو رفعه من باست بين",
  commandCategory: "المالك",
  usages: "[قم بالرد أو نص]",
  cooldowns: 0,
  dependencies: {
      "pastebin-api": "",
      "cheerio": "",
      "request": ""
  }
};

module.exports.run = async function ({ api, event, args }) {

  const axios = require('axios');
  const fs = require('fs');
  const request = require('request');
  const cheerio = require('cheerio');
  const { join, resolve } = require("path");
  const { senderID, threadID, messageID, messageReply, type } = event;
  var name = args[0];
  if (type == "message_reply") {
      var text = messageReply.body;
  }
  if(!text && !name) return api.sendMessage('❗ | يرجى الرد على الرابط الذي تريد تطبيق الكود عليه أو كتابة اسم الملف لتحميل الكود إلى باست بين!', threadID, messageID);
  if(!text && name) {
      var data = fs.readFile(
        `${__dirname}/${args[0]}.js`,
        "utf-8",
        async (err, data) => {
          if (err) return api.sendMessage(`الأمر ${args[0]} غير موجود!.`, threadID, messageID);
          const { PasteClient } = require('pastebin-api')
          const client = new PasteClient("R02n6-lNPJqKQCd5VtL4bKPjuK6ARhHb");
          async function pastepin(name) {
            const url = await client.createPaste({
              code: data,
              expireDate: 'N',
              format: "javascript",
              name: name,
              publicity: 1
            });
            var id = url.split('/')[3]
            return 'https://pastebin.com/raw/' + id
          }
          var link = await pastepin(args[1] || 'noname')
          return api.sendMessage(link, threadID, messageID);
        }
      );
      return
  }
  var urlR = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  var url = text.match(urlR);
  if (url[0].indexOf('pastebin') !== -1) {
      axios.get(url[0]).then(i => {
          var data = i.data
          fs.writeFile(
              `${__dirname}/${args[0]}.js`,
              data,
              "utf-8",
              function (err) {
                  if (err) return api.sendMessage(`❌ حدث خطأ أثناء تطبيق الكود في  ${args[0]}.js`, threadID, messageID);
                  api.sendMessage(`✅ تم تطبيق الكود إلى${args[0]}.js, إستخدم الأمر تحميل من أجل الإستخدام!`, threadID, messageID);
              }
          );
      })
  }

  if (url[0].indexOf('buildtool') !== -1 || url[0].indexOf('tinyurl.com') !== -1) {
      const options = {
          method: 'GET',
          url: messageReply.body
      };
      request(options, function (error, response, body) {
          if (error) return api.sendMessage('❗ يرجى الرد فقط على الرابط (لا يحتوي على أي شيء آخر غير الرابط)', threadID, messageID);
          const load = cheerio.load(body);
          load('.language-js').each((index, el) => {
              if (index !== 0) return;
              var code = el.children[0].data
              fs.writeFile(`${__dirname}/${args[0]}.js`, code, "utf-8",
                  function (err) {
                      if (err) return api.sendMessage(`حدث خطأ اثناء تكبيق الكود إلى "${args[0]}.js".`, threadID, messageID);
                      return api.sendMessage(`✅ تمت إضافة الكود
"${args[0]}.js", إستخدم تحميل من أحل الإستخدام!`, threadID, messageID);
                  }
              );
          });
      });
      return
  }
  if (url[0].indexOf('drive.google') !== -1) {
    var id = url[0].match(/[-\w]{25,}/)
    const path = resolve(__dirname, `${args[0]}.js`);
    try {
      await utils.downloadFile(`https://drive.google.com/u/0/uc?id=${id}&export=download`, path);
      return api.sendMessage(`تمت إضافة هذا الكود "${args[0]}.js" إذا كان هناك خطأ، قم بتغيير ملف محرك الأقراص إلى txt!`, threadID, messageID);
    }
    catch(e) {
      return api.sendMessage(` ❌ حدث خطأ أثناء تطبيق الكود الجديد على "${args[0]}.js".`, threadID, messageID);
    }
  }
      }