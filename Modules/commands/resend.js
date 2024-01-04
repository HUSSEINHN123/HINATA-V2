module.exports.config = {
	name: "إعادة_الإرسال",
	version: "2.0.0",
	hasPermssion: 1,
	credits: "Thọ & Mod By DuyVuong",
	description: "إعادة إرسال الرسائل المحذوفة",
  usePrefix: true,
	commandCategory: "النظام", 
	usages: "إعادة إرسال الرسائل المحذوفة تلقائيا",
	cooldowns: 0,
  hide:true,
  dependencies: {"request":"",       
                 "fs-extra":"",
                 "axios":""
                }

};

module.exports.handleEvent = async function ({ event, api, client, Users }) {
    const request = global.nodemodule["request"];
    const axios = global.nodemodule["axios"]
    const { writeFileSync, createReadStream } = global.nodemodule["fs-extra"];
  let {messageID, senderID, threadID, body:content } = event;
     if (!global.logMessage) global.logMessage = new Map();	
     if (!global.data.botID) global.data.botID = api.getCurrentUserID();
  
  const thread = global.data.threadData.get(parseInt(threadID)) || {};
  
  if (typeof thread["resend"] != "undefined" && thread["resend"] == false) return;
  if (senderID == global.data.botID) return;

        
     if(event.type != "message_unsend") global.logMessage.set(messageID,{
        msgBody: content,
        attachment:event.attachments
      })
    if(event.type == "message_unsend") {
      var getMsg = global.logMessage.get(messageID);
      if(!getMsg) return;
     let name = await Users.getNameUser(senderID);
      if(getMsg.attachment[0] == undefined) return api.sendMessage(`لقد قام ${name} بحذف رسالة 🙂 \n\nمحتوى الرسالة 📩: ${getMsg.msgBody}`,threadID)
      else {
            let num = 0
            let msg = {
              body:`لقد قام ${name} بحذف مرفق 🙂  \n${getMsg.attachment.length} المرفقات 📥 ${(getMsg.msgBody != "") ? `\n\nالمحتوى 📥: ${getMsg.msgBody}` : ""}`,
              attachment:[],
              mentions:{tag:name,id:senderID}
            }
          for (var i of getMsg.attachment) {
            num += 1;
        var getURL = await request.get(i.url);
        var pathname = getURL.uri.pathname;
        var ext = pathname.substring(pathname.lastIndexOf(".") + 1);
        var path = __dirname + `/cache/${num}.${ext}`;
        var data = (await axios.get(i.url, { responseType: 'arraybuffer' })).data;
        writeFileSync(path, Buffer.from(data, "utf-8"));
      msg.attachment.push(createReadStream(path));
  }
        api.sendMessage(msg, threadID);
        }
      }
   }

module.exports.run = async function({ api, event, Threads }) {
	const { threadID, messageID } = event;

	var data = (await Threads.getData(threadID)).data;
	
	if (typeof data["resend"] == "undefined" || data["resend"] == false) data["resend"] = true;
	else data["resend"] = false;
	
	await Threads.setData(parseInt(threadID), { data });
	global.data.threadData.set(parseInt(threadID), data);
	
	return api.sendMessage(`قد أصبحت ${(data["إعادة_الإرسال"] == true) ? "شغالة" : "مطفئة"} بنجاح ✔️`, threadID, messageID);
          }