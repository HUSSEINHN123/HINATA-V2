module.exports.config = {
    name: "معلومات_عامة",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Mirai Team",
    description: "",
    commandCategory: "النظام",
    usages: "",
    cooldowns: 4,
    dependencies: {
        "request": "",
        "fs": ""
    }
    
};

module.exports.run = async({api,event,args}) => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
     if (args.length == 0) return api.sendMessage(`يمطنك إستخدام:\n\n${prefix}${this.config.name} مستخدم => سوف يريك معلوماتك الشخصية.\n\n${prefix}${this.config.name} مستخدم @[تاغ] => سوف يعرض اك معلومات صديقك الشخصية.\n\n${prefix}${this.config.name} مجموعة => سبعرض عليك معلومات المجموعة (عدد الاعضاء, عدد المسؤولين,الموافقة إلخ...)\n\n${prefix}${this.config.name} مستخدم مجموعة [آيدي || آيدي المستخدم المجموعة.:\n\n${prefix}${this.config.name} المالك => معلومات حول مالك البوت]`, event.threadID, event.messageID);
    if (args[0] == "مجموعة") {
           if(args[1]){ let threadInfo = await api.getThreadInfo(args[1]);
           let imgg = threadInfo.imageSrc;
           var gendernam = [];
            var gendernu = [];
                for (let z in threadInfo.userInfo) {
                var gioitinhone = threadInfo.userInfo[z].gender;
                if(gioitinhone == "MALE"){gendernam.push(gioitinhone)
                }else{gendernu.push(gioitinhone)
                }};
             var nam = gendernam.length;
             var nu = gendernu.length;
             let sex = threadInfo.approvalMode;
       var pd = sex == false ? "تم إطفائها" : sex == true ? "تم تشغيلها" : "NS";
       if(!imgg) api.sendMessage(`إسم المجموعة: ${threadInfo.threadName}\nآيدي المجموعة: ${args[1]}\nميزة الموافقة: ${pd}\nإيموجي المجموعة: ${threadInfo.emoji}\nمعلومات حول الأعضاء: \n»${threadInfo.participantIDs.length} عضو و ${threadInfo.adminIDs.length} مسؤول.\n»من ضمنها ${nam} ولد و ${nu} بنت.\n»إجمالي عدد الرسائل: ${threadInfo.messageCount}.`,event.threadID,event.messageID);
        else var callback = () => api.sendMessage({body:`إسم المجموعة: ${threadInfo.threadName}\nآي المجموعة: ${args[1]}\nميزة الموافقة: ${pd}\nإيموجي المجموعة: ${threadInfo.emoji}\nمعلومات حول الأعضاء: \n»${threadInfo.participantIDs.length} عضو و ${threadInfo.adminIDs.length}مسؤول.\n»من ضمنها ${nam} ولد و ${nu} بنت.\n»إجمال عدد الرسائل: ${threadInfo.messageCount}.`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID); 
      return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
      
      }
          
            let threadInfo = await api.getThreadInfo(event.threadID);
            let img = threadInfo.imageSrc;
            var gendernam = [];
            var gendernu = [];
                for (let z in threadInfo.userInfo) {
                var gioitinhone = threadInfo.userInfo[z].gender;
                if(gioitinhone == "MALE"){gendernam.push(gioitinhone)
                }else{gendernu.push(gioitinhone)
                }};
             var nam = gendernam.length;
             var nu = gendernu.length;
             let sex = threadInfo.approvalMode;
       var pd = sex == false ? "تم تعطيلها" : sex == true ? "تم تشغيلها" : "NS";
          if(!img) api.sendMessage(`إسم المجموعة: ${threadInfo.threadName}\nآيدي المجموعة: ${event.threadID}\nميزة الموافقة: ${pd}\nإيموجي المجموعة: ${threadInfo.emoji}\nمعلومات: \n»${threadInfo.participantIDs.length} عضو و ${threadInfo.adminIDs.length} مسؤول.\n»من ضمنها ${nam} ولد و ${nu} بنت.\n»إجمالي عدد الرسائل: ${threadInfo.messageCount}.`,event.threadID,event.messageID)
          else  var callback = () => api.sendMessage(`إسم المجموعة: ${threadInfo.threadName}\nآيدي المجموعة: ${event.threadID}\nميزة الموافقة: ${pd}\nإيموجي المجموعة: ${threadInfo.emoji}\nمعلومات: \n»${threadInfo.participantIDs.length} عضو و ${threadInfo.adminIDs.length} مسؤول.\n»من ضمنها ${nam} ولد و ${nu} بنت.\n»إجمالي عدد الرسائل: ${threadInfo.messageCount}..`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);   
      return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    }
               if (args.length == 0) return api.sendMessage(`يمكن إستخدام:\n\n${prefix}${this.config.name} مستخدم => سوف يعرض عليك معلوماتك الخاصة.\n\n${prefix}${this.config.name} user @[تاغ] => سيعرض عليك معلومات صديقك.\n\n${prefix}${this.config.name} مجموعة => سيعرض عليك معلومات المجموعة مثل عدد الأعضاءو تلمسؤولين أو ميزة الموافقة إلخخ....)\n\n${prefix}${this.config.name} مستخدم مجموعة [آيدي المستخدم || آيدي المجموعة]`, event.threadID, event.messageID);
    if (args[0] == "المالك") {
      var callback = () => api.sendMessage(
  {body:`———»🄾🅆🄽🄴🅁 🄱🄾🅃«———\n❯الإسم : حسين يعقوبي (人◕‿◕)\n❯ رابط فيسبوك: https://www.facebook.com/profile.php?id=61552791186880&mibextid=ZbWKwL\n❯ شكرا على إستخدام ${global.config.BOTNAME} البوت`,
    attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => 
    fs.unlinkSync(__dirname + "/cache/1.png"));  
      return request(encodeURI(`https://graph.facebook.com/100049456655701/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(
fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    
      };

if (args[0] == "مستخدم") { 
    if(!args[1]){
    if(event.type == "message_reply") id = event.messageReply.senderID
    else id = event.senderID;
    let data = await api.getUserInfo(id);
    let url = data[id].profileUrl;
    let b = data[id].isFriend == false ? "لا !" : data[id].isFriend == true ? "نعم !" : "اللعنة";
    let sn = data[id].vanity;
    let name = await data[id].name;
    var sex = await data[id].gender;
    var gender = sex == 2 ? "ذكر" : sex == 1 ? "أنثى""جنس آخر";
    var callback = () => api.sendMessage({body:`الإسم: ${name}` + `\nرابط المستخدم: ${url}` + `\nإسم المستخدم: ${sn}\nآيدي: ${id}\nالجنس: ${gender}\nهل هو صديق البوت: ${b}`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
       return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
   }
    else {
    
    if (args.join().indexOf('@') !== -1){
    var mentions = Object.keys(event.mentions)
    let data = await api.getUserInfo(mentions);
    let url = data[mentions].profileUrl;
    let b = data[mentions].isFriend == false ? "لا !" : data[mentions].isFriend == true ? "نعم !" : "اللعنة";
    let sn = data[mentions].vanity;
    let name = await data[mentions].name;
    var sex = await data[mentions].gender;
    var gender = sex == 2 ? "ذكر" : sex == 1 ? "أنثى" : "جنس آخر";
    var callback = () => api.sendMessage({body:`الإسم: ${name}` + `\nالرابط الشخصي: ${url}` + `\n💦إسم المستخدم: ${sn}\nالآيدي: ${mentions}\nالجنس: ${gender}\nهل قام بتكوين صداقة مع البوت ؟: ${b}`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
       return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    }
    else {
    let data = await api.getUserInfo(args[1]);
    let url = data[args[1]].profileUrl;
    let b = data[args[1]].isFriend == false ? "لا !" : data[args[1]].isFriend == true ? "نعم !" : "اللعنة";
    let sn = data[args[1]].vanity;
    let name = await data[args[1]].name;
    var sex = await data[args[1]].gender;
    var gender = sex == 2 ? "ذكر" : sex == 1 ? "أنثى" : "جنس آخر";
    var callback = () => api.sendMessage({body:`الإسم: ${name}` + `\nالرابك الشخصي: ${url}` + `\nإسم المستخدم: ${sn}\nآيدي المستخدم: ${args[1]}\nالجنس: ${gender}\nهل هو صديق البوت ؟: ${b}`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
       return request(encodeURI(`https://graph.facebook.com/${args[1]}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    }
     }
     }
  }