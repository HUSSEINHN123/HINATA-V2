module.exports.config = {
    name: "تحذير",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Joshua Sy",
    description: "",
    commandCategory: "متعة",
    usages: "نص",
    cooldowns: 0,
    dependencies: {
        "fs-extra": "",
        "request": ""
    }
};
module.exports.run = async ({ api, event,args }) => {  {
    
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
	 const { threadID, messageID, senderID, body } = event;
	let juswa = args.toString().replace(/,/g,  '  ');
if (!juswa)
    return api.sendMessage(" ⚠️ |قم بإدخال نص", event.threadID, event.messageID);

	 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/biden.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/biden.png"),event.messageID);
	 return request(encodeURI(`https://api.popcat.xyz/caution?text=${juswa}`)).pipe(fs.createWriteStream(__dirname+'/cache/biden.png')).on('close',() => callback());     
}}
