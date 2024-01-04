module.exports.config = {
    name: "إنتهت_اللعبة",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Zia Rein",
    description: "",
    commandCategory: "متعة",
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
	let text = args.toString().replace(/,/g,  '  ');
if (!text)
    return api.sendMessage(" ⚠️  | قم بإضافة نص ", event.threadID, event.messageID);

	 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/biden.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/biden.png"),event.messageID);
	 return request(encodeURI(`https://caliphapi.com/api/textpro/gameover?text=PLAY&text2=${text}&apikey=7z7fKcNE`)).pipe(fs.createWriteStream(__dirname+'/cache/biden.png')).on('close',() => callback());     
}}
