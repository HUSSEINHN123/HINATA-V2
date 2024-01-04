module.exports.config = {
	name: "سرقة",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Md Rajib",
	description: "سرقة الأموال",
	commandCategory: "إقتصاد",
	usages: "",
  usePrefix:true,
  usePrefix:true,
	cooldowns: 5
};

module.exports.run = async function({ api, event, Users, Currencies }) {
	var alluser = global.data.allUserID
    let victim = alluser[Math.floor(Math.random() * alluser.length)];
    let nameVictim = (await Users.getData(victim)).name
    if (victim == api.getCurrentUserID() && event.senderID == victim) return api.sendMessage('عذرًا، لا يمكنك السرقة من هذا الشخص. حاول مرة اخرى إذا استطعت', event.threadID, event.messageID);
    var route = Math.floor(Math.random() * 2);
    if (route > 1 || route == 0) {
    const moneydb = (await Currencies.getData(victim)).money;
       var money = Math.floor(Math.random() * 1000) + 1;
        if (moneydb <= 0 || moneydb == undefined) return api.sendMessage(`أنت سرقت لتو ${nameVictim} إنه شخص فقير. لذالك أنت لم تسرق منه شيء حاول العثور على شخص غني`, event.threadID, event.messageID);
        else if (moneydb >= money) return api.sendMessage(`أنت سرقت لتو مبلغ يقدر ب ${money} دولار من  ${nameVictim} في المجموعة`, event.threadID, async () => {
            await Currencies.increaseMoney(victim, parseInt("-"+money))
            await Currencies.increaseMoney(event.senderID, parseInt(money))
        }, event.messageID);
        else if (moneydb < money) return api.sendMessage(`أنت سرقته كله لتو بمبلغ يقدر ب ${moneydb} من رصيد  ${nameVictim} في المجموعة`, event.threadID, async () => {
            await Currencies.increaseMoney(victim, parseInt("-"+money))
            await Currencies.increaseMoney(event.senderID, parseInt(money))
        }, event.messageID);
    }
    else if (route == 1) {
        var name = (await Users.getData(event.senderID)).name
        var moneyuser = (await Currencies.getData(event.senderID)).money
            if (moneyuser <= 0) return api.sendMessage("أنت ليس لديك مال، قم بالعمل يا صديقي للحصول على بعض المال..", event.threadID, event.messageID);
            else if (moneyuser > 0) return api.sendMessage(`لقد تمت سرقتك 🥺 ولقد تم الخصم منك ${moneyuser} دولار.`, event.threadID, () => api.sendMessage({ body: `تهانينا 🥳  ${nameVictim}! لقد قمت بسرقة ${name} بنجاح وقد حصلت على ${Math.floor(moneyuser / 2)} دولار كجائزة!`, mentions: [{ tag: nameVictim, id: victim }, { tag: name, id: event.senderID }] }, event.threadID, async () => {
                await Currencies.increaseMoney(event.senderID, parseInt("-"+ moneyuser))
                await Currencies.increaseMoney(victim, parseInt(Math.floor(moneyuser / 2))) 
            }), event.messageID);
        
    }
  }