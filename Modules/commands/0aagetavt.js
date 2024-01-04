module.exports.config = {
    name: "بروفايل",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Jukie",
    description: "",
    commandCategory: "خدمات",
    usages: "",
    cooldowns: 3,
    dependencies: {
        "request": "",
        "fs": ""
    }
    
};

module.exports.run = async({api,event,args,Users}) => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
     if (args.length == 0) return api.sendMessage(`يمكنك استخدام.:\n\n${prefix}${this.config.name} بروفايل => سوف ترى صورة بروفايل الخاصة بك .\n\n${prefix}${this.config.name} بروفايل @[تاغ] => ستريك صور  بروفايل للشخص اللذي قمت بعمل تاغ له.\n\n${prefix}${this.config.name} المجموعة => ستريك صورة المجموعة\n\n${prefix}${this.config.name} المستخدم أو المجموعة آيدي] من أجل رؤية صورة المجموعة أو صورة المستخدم`, event.threadID, event.messageID);
    if (args[0] == "المجموعة") {
           if(args[1]){ let threadInfo = await api.getThreadInfo(args[1]);
           let imgg = threadInfo.imageSrc;
       if(!imgg) api.sendMessage(`تفضل هاهيا ذي صورة المجموعة ${threadInfo.threadName} `,event.threadID,event.messageID);
        else var callback = () => api.sendMessage({body:`صورة المجموعة ${threadInfo.threadName} `,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID); 
      return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
      
      }
          
            let threadInfo = await api.getThreadInfo(event.threadID);
            let img = threadInfo.imageSrc;
          if(!img) api.sendMessage(`صورة المجموعة ${threadInfo.threadName} `,event.threadID,event.messageID)
          else  var callback = () => api.sendMessage({body:`صورة المجموعة . ${threadInfo.threadName} `,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);   
      return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    
      };

if (args[0] == "مستخدم") { 
    if(!args[1]){
    if(event.type == "message_reply") id = event.messageReply.senderID
    else id = event.senderID;
    var name = (await Users.getData(id)).name
    var callback = () => api.sendMessage({body:`هنا هي صورة البروفايل الخاصة بك`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
       return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=750&width=750&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
   }
    else {
    if (args.join().indexOf('@') !== -1){
    var mentions = Object.keys(event.mentions)
    var name = (await Users.getData(mentions)).name
    var callback = () => api.sendMessage({body:`صورة البروفايل الخاصة ب ${name} `,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
       return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?height=750&width=750&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    }
    else {
    var name = (await Users.getData(args[1])).name
    var callback = () => api.sendMessage({body:`صورة البروفايل الخاصة ب${name} `,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
       return request(encodeURI(`https://graph.facebook.com/${args[1]}/picture?height=750&width=750&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    }
     }
     }
                                                                                                                                                                                                         }