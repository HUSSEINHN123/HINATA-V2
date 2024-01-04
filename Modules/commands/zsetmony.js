module.exports.config = {
	name: "ضبط_المال",
	version: "0.0.1",
	hasPermssion: 2,
	credits: "Md Rajib",
	description: "قم بتغيير كمية المال لنفسك أو للشخص اللذي تعمل منشن له",
	commandCategory: "النظام",
	usages: "ضبط_المال @[منشن]",
	cooldowns: 5,
	info: [
		{
			key: 'Tag',
			prompt: 'Leave blank or tag someone, you can tag more than one person',
			type: 'Document',
			example: '@Priyansh'
		}
	]
};

module.exports.run = async function({ api, event, args, Currencies, utils, Users}) {
var mention = Object.keys(event.mentions)[0];
    var prefix = ";"
    var {body} = event;
    			var content = body.slice(prefix.length + 9, body.length);
			var sender = content.slice(0, content.lastIndexOf(" "));
			var moneySet = content.substring(content.lastIndexOf(" ") + 1);
    			if (args[0]=='أنا'){
    			 return api.sendMessage(`تم تغيير رصيدك إلى ${moneySet} دولار`, event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(moneySet)), event.messageID)	
			}
			else if(args[0]=="حذف"){
if (args[1] == 'أنا'){
			var s = event.senderID;
			const moneyme =(await Currencies.getData(event.senderID)).money;
			api.sendMessage(`✅لقد تم حذف جميع أموالك\و💸المبلغ الذي سيتم حذفه هو ${moneyme}.`, event.threadID, async () => await Currencies.decreaseMoney(event.senderID, parseInt(moneyme)));
		}	
		else if (Object.keys(event.mentions).length == 1) {
var mention = Object.keys(event.mentions)[0];
		const moneydel = (await Currencies.getData(mention)).money;
		api.sendMessage(`✅تمت إزالة المبلغ بالكامل ${event.mentions[mention].replace("@", "")}\n💸المبلغ المراد حذفه هو ${moneydel}.`, event.threadID, async () => await Currencies.decreaseMoney(mention, parseInt(moneydel)));
		}
		
		else return	api.sendMessage(" ❌ |بناء جملة خاطئ", event.threadID, event.messageID);
		}
			else if (Object.keys(event.mentions).length == 1) {
			return api.sendMessage({
				body: (`تم تغيير الرصيد بالنسبة ل${event.mentions[mention].replace("@", "")} إلى ${moneySet} دولار`),
				mentions: [{
					tag: event.mentions[mention].replace("@", ""),
					id: mention
				}]
			}, event.threadID, async () => Currencies.increaseMoney(mention, parseInt(moneySet)), event.messageID)
		}
		else if(args[0]=="UID"){
		var id = args[1];
		var cut = args[2];
		let nameeee = (await Users.getData(id)).name
		   return api.sendMessage(`تم تغيير الرصيد ل ${nameeee} إلى ${cut} دولار`, event.threadID, () => Currencies.increaseMoney(id, parseInt(cut)), event.messageID)	

		}
else {
	api.sendMessage(" ❌ |بناء جملة خاطئ ", event.threadID, event.messageID)
	}
  }