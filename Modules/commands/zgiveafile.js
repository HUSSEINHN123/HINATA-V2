module.exports.config = {
  name: 'إعطاء_ملف',
  version: '1.0.0',
  hasPermssion: 2,
  credits: 'NTKhang',
  description: '',
  commandCategory: 'المالك',
  usages: 'القيام بأعطاء ملف',
  cooldowns: 5,
  dependencies: {"fs-extra":""}
};

module.exports.run = async ({ args, api, event }) => {
  const fs = require("fs-extra"); 
  const permission = ["100088309851834", ""];
    if (!permission.includes(event.senderID)) return api.sendMessage(" ⛔ |ليست لديك الصلاحية لإستخدام هذا الأمر فقط حسين يعقوبي يمكنه ذالك", event.threadID, event.messageID);
  var path = [],
    pathrn = [],
    pathrntxt = [];
  var msg = '';
  var notfound = "";
  for(let file of args) {
   if(!fs.existsSync(__dirname+"/"+file)) {
     notfound += ' ❓ | أين هو الملف ؟ : '+file;
     continue;
   };
    if (file.endsWith('.js')) {
      fs.copyFile(__dirname + '/'+file, __dirname + '/'+ file.replace(".js",".txt"));
      pathrn.push(
        fs.createReadStream(__dirname + '/' + file.replace('.js', '.txt'))
      );
      pathrntxt.push(file.replace('.js', '.txt'));
    } else {
      path.push(fs.createReadStream(__dirname + '/' + file));
    }
  }

  var mainpath = [...path, ...pathrn];
  if (pathrn.length != 0)
    msg +=
      'لأن الفيسبوك يمنع الإرسال .js ملفات, لهذا قمنا بتغيير الملفات بامتداد .js امتدادا من .txt إلى إمتداد.';
  api.sendMessage({ body: msg+"\n"+notfound, attachment: mainpath }, event.threadID);
  pathrntxt.forEach(file => {
    fs.unlinkSync(__dirname + '/' + file);
  });
};