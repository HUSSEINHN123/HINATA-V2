module.exports.config = {
	name: "مستخدم",
	version: "1.0.5",
	hasPermssion: 2,
	credits: "Mirai Team",
	description: "حظر أو إلغاء الحظر عن المساخدم",
  usePrefix: true,
	commandCategory: "المالك",
	usages: "[حظر/إلغاء_الحظر/بحث] [آيدي أو رد على الرسالة]",
	cooldowns: 5
};

module.exports.languages = {
	"en": {
		"reason": "Reason",
		"at": "At",
		"allCommand": "All commands",
		"commandList": "Commands",
		"banSuccess": "[ Ban User ] تم حظر المستخدم: %1",
		"unbanSuccess": "[ Unban User ] تم رفع الحظر عن المستخدم %1",
		"banCommandSuccess": "[ banCommand User ] تم حظر الأمر مع المستخدم : %1",
		"unbanCommandSuccess": "[ UnbanCommand User ] تم إلغاء حظر الأمر %1 بالنسبة للمستخدم : %2",
		"errorReponse": "%1 لا يمكنني أن أفعل ماتطلب",
		"IDNotFound": "%1 الآيدي اللذي أدخلته غير موجود في قاعدة البيانات",
		"existBan": "[ Ban User ] المستخدم %1 تم حظره من قبل %2 %3",
		"notExistBan": "[ Unban User ] هذا المستخدم لم يتم حظره من قبل",
		"missingCommandInput": "%1 يجب أن تدخل الأمر اللذي تريد أن تحظره!",
		"notExistBanCommand": "[ UnbanCommand User ] هذا الأمر لم يتم حظره من قبل بالنسبة للمستخدم",

		"returnBan": "[ Ban User ] أنت طلبت حظر المستخدم يجب عليك أولا إدخال:\n- آيدي و إسم المستخدم : %1%2\n\n❮ قم بالتفاعل مع هذه الرسالة من أجل تأكيد المتابعة ❯",
		"returnUnban": "[ Unban User ] أنت تطلب إلغاء الحظر أو رفعه من شخص ما أولا قم بإدخال:\n- آيدي و إسم المستخدم: %1\n\n❮ قم بالتفاعل مع هذه الرسالة من أجل تأكيد المتابعة ❯",
		"returnBanCommand": "[ banCommand User ] أنت تطلب حظر الأمر مع المستخدم عليك إدخالا أولا:\n - آيدي و إسم المستخدم: %1\n- الأوامر: %2\n\n❮ قم بالتفاعل مع هذه الرسالة من أجل تأكيد المتابعة ❯",
		"returnUnbanCommand": "[ UnbanCommand User ] أنت تكلب إلغاء أمر مع المستخدم قم بإدخال أولا:\n - آيدي و إسم المستخدم : %1\n- الأوامر: %2\n\n❮ قم بالتفاعل مع هذا الرسالة للمتابعة ❯",
		"returnResult": "هذه هي نتيجتك المحصلة عليها: \n",
		"returnNull": "لا يوجد أي نتيجة بالنسبة لما أدخلته!",
		"returnList": "[ User List ]\هناك %1 مستخدم محظور, هنا لدينا %2 مستخدم\n\n%3",
		"returnInfo": "[ Info User ] هنا بعض المعلومات حول الشخص تللذي تريد أن تجده أو تحاول البحث عنه:\n- إسم و آيدي المستخدم: %1n- هل هو محظور ؟: %2 %3 %4\n- هل تم حظر الأمر ؟: %5"
	}
}

module.exports.handleReaction = async ({ event, api, Users, handleReaction, getText }) => {
	if (parseInt(event.userID) !== parseInt(handleReaction.author)) return;
	const moment = require("moment-timezone");
	const { threadID } = event;
	const { messageID, type, targetID, reason, commandNeedBan, nameTarget } = handleReaction;
	
	const time = moment.tz("Africa/Casablanca").format("HH:MM:ss L");
	global.client.handleReaction.splice(global.client.handleReaction.findIndex(item => item.messageID == messageID), 1);
	
	switch (type) {
		case "حظر": {
			try {
				if(event.type == "message_reply") { targetID = event.messageReply.senderID }
				let data = (await Users.getData(targetID)).data || {};
				data.banned = true;
				data.reason = reason || null;
				data.dateAdded = time;
				await Users.setData(targetID, { data });
				global.data.userBanned.set(targetID, { reason: data.reason, dateAdded: data.dateAdded });
				return api.sendMessage(getText("banSuccess", `${targetID} - ${nameTarget}`), threadID, () => {
					return api.unsendMessage(messageID);
				});
			} catch { return api.sendMessage(getText("errorReponse", "[ Ban User ]"), threadID) };
		}

		case "إلغاء_الحظر": {
			try {
				if(event.type == "message_reply") { targetID = event.messageReply.senderID }
				let data = (await Users.getData(targetID)).data || {};
				data.banned = false;
				data.reason = null;
				data.dateAdded = null;
				await Users.setData(targetID, { data });
				global.data.userBanned.delete(targetID);
				return api.sendMessage(getText("unbanSuccess", `${targetID} - ${nameTarget}`), threadID, () => {
					return api.unsendMessage(messageID);
				});
			} catch { return api.sendMessage(getText("errorReponse", "[ Unban User ]"), threadID) };
		}

		case "حظر_الأمر": {
			try {	
				let data = (await Users.getData(targetID)).data || {};
				data.commandBanned = [...data.commandBanned || [], ...commandNeedBan];
				await Users.setData(targetID, { data });
				global.data.commandBanned.set(targetID, data.commandBanned);
				return api.sendMessage(getText("banCommandSuccess", `${targetID} - ${nameTarget}`), threadID, () => {
					return api.unsendMessage(messageID);
				});
			} catch (e) { return api.sendMessage(getText("errorReponse", "[ banCommand User ]"), threadID) };
		}

		case "إلغاء_حظر_الأمر": {
			try {
				let data = (await Users.getData(targetID)).data || {};
				data.commandBanned = [...data.commandBanned.filter(item => !commandNeedBan.includes(item))];
				await Users.setData(targetID, { data });
				global.data.commandBanned.set(targetID, data.commandBanned);
				if(data.commandBanned.length == 0) global.data.commandBanned.delete(targetID)
				return api.sendMessage(getText("unbanCommandSuccess", ((data.commandBanned.length == 0) ? getText("allCommand") : `${getText("commandList")}: ${commandNeedBan.join(", ")}`), `${targetID} - ${nameTarget}`), threadID, () => {
					return api.unsendMessage(messageID);
				});
			} catch (e) { return api.sendMessage(getText("errorReponse", "[ UnbanCommand User ]"), threadID) };
		}
	}
}

module.exports.run = async ({ event, api, args, Users, getText }) => {
	const { threadID, messageID } = event;
	const type = args[0];
	var targetID = String(args[1]);
	var reason = (args.slice(2, args.length)).join(" ") || null;

	if (isNaN(targetID)) {
		const mention = Object.keys(event.mentions);
		args = args.join(" ");
		targetID = String(mention[0]);
		reason = (args.slice(args.indexOf(event.mentions[mention[0]]) + (event.mentions[mention[0]] || "").length + 1, args.length)) || null;
	}

	switch (type) {
		case "حظر":
		case "-b": {
			if(event.type == "message_reply") { targetID = event.messageReply.senderID }
			if (!global.data.allUserID.includes(targetID)) return api.sendMessage(getText("IDNotFound", "[ Ban User ]"), threadID, messageID);
			if (global.data.userBanned.has(targetID)) {
				const { reason, dateAdded } = global.data.userBanned.get(targetID) || {};
				return api.sendMessage(getText("existBan", targetID, ((reason) ? `${getText("reason")}: "${reason}"` : ""), ((dateAdded) ? `${getText("at")} ${dateAdded}` : "")), threadID, messageID);
			}
			const nameTarget = global.data.userName.get(targetID) || await Users.getNameUser(targetID);
			return api.sendMessage(getText("returnBan", `${targetID} - ${nameTarget}`, ((reason) ? `\n- ${getText("reason")}: ${reason}` : "")), threadID, (error, info) => {
				global.client.handleReaction.push({
					type: "ban",
					targetID,
					reason,
					nameTarget,
					name: this.config.name,
					messageID: info.messageID,
					author: event.senderID,
					
				});
			}, messageID);
		}

		case "إلغاء_الحظر":
		case "-ub": {
			if(event.type == "message_reply") { targetID = event.messageReply.senderID }
			if (!global.data.allUserID.includes(targetID)) return api.sendMessage(getText("IDNotFound", "[ Unban User ]"), threadID, messageID);
			if (!global.data.userBanned.has(targetID)) return api.sendMessage(getText("notExistBan"), threadID, messageID);
			const nameTarget = global.data.userName.get(targetID) || await Users.getNameUser(targetID);
			return api.sendMessage(getText("returnUnban", `${targetID} - ${nameTarget}`), threadID, (error, info) => {
				global.client.handleReaction.push({
					type: "unban",
					targetID,
					nameTarget,
					name: this.config.name,
					messageID: info.messageID,
					author: event.senderID,
					
				});
			}, messageID);
		}

		case "بحث":
		case "-s": {
			const contentJoin = reason || "";
			const getUsers = (await Users.getAll(['userID', 'name'])).filter(item => !!item.name);
			var matchUsers = [], a = '', b = 0;
			getUsers.forEach(i => {
				if (i.name.toLowerCase().includes(contentJoin.toLowerCase())) {
					matchUsers.push({
						name: i.name,
						id: i.userID
					});
				}
			});
			matchUsers.forEach(i => a += `\n${b += 1}. ${i.name} - ${i.id}`);
			(matchUsers.length > 0) ? api.sendMessage(getText("returnResult", a), threadID) : api.sendMessage(getText("returnNull"), threadID);
			return;
		}
		
		case "حظر_الأمر":
		case "-bc": {
			if (!global.data.allUserID.includes(targetID)) return api.sendMessage(getText("IDNotFound", "[ BanCommand User ]"), threadID, messageID);
			if (reason == null || reason.length == 0) return api.sendMessage(getText("missingCommandInput", "[ BanCommand User ]"), threadID, messageID);
			if (reason == "all") {
				var allCommandName = [];
				const commandValues = global.client.commands.keys();
				for (const cmd of commandValues) allCommandName.push(cmd);
				reason = allCommandName.join(" ");
			}
			const commandNeedBan = reason.split(" ");
			const nameTarget = global.data.userName.get(targetID) || await Users.getNameUser(targetID);
			return api.sendMessage(getText("returnBanCommand", `${targetID} - ${nameTarget}`, ((commandNeedBan.length == global.client.commands.size) ? getText("allCommand") : commandNeedBan.join(", "))), threadID, (error, info) => {
				global.client.handleReaction.push({
					type: "banCommand",
					targetID,
					commandNeedBan,
					nameTarget,
					name: this.config.name,
					messageID: info.messageID,
					author: event.senderID,
					
				});
			}, messageID);
		}

		case "إلغاء_حظر_الأمر":
		case "-ubc": {
			if (!global.data.allUserID.includes(targetID)) return api.sendMessage(getText("IDNotFound", "[ UnbanCommand User ]"), threadID, messageID);
			if (!global.data.commandBanned.has(targetID)) return api.sendMessage(getText("notExistBanCommand"), threadID, messageID);
			if (reason == null || reason.length == 0) return api.sendMessage(getText("missingCommandInput", "[ UnbanCommand User ]"), threadID, messageID);
			if (reason == "all") {
				reason = (global.data.commandBanned.get(targetID)).join(" ");
			}
			const commandNeedBan = reason.split(" ");
			const nameTarget = global.data.userName.get(targetID) || await Users.getNameUser(targetID);
			return api.sendMessage(getText("returnUnbanCommand", `${targetID} - ${nameTarget}`, ((commandNeedBan.length == global.data.commandBanned.get(targetID).length) ? getText("allCommand") : commandNeedBan.join(", "))), threadID, (error, info) => {
				global.client.handleReaction.push({
					type: "unbanCommand",
					targetID,
					commandNeedBan,
					nameTarget,
					name: this.config.name,
					messageID: info.messageID,
					author: event.senderID,
					
				});
			}, messageID);
		}

		case "قائمة":
		case "-l": {
			var listBan = [], i = 0;
			const threadData = global.data.userBanned.keys();
			for (; ;) {
				let idUser = String(threadData.next().value);
				if (typeof idUser == "undefined") {
					const userName = (await Users.getData(idUser)).name || "unknown";
					listBan.push(`${i+=1}/ ${idUser} - ${userName}`);
				}
				if (i == global.data.userBanned.size || i == (parseInt(reason) || 10)) break;
			}
			return api.sendMessage(getText("returnList",(global.data.userBanned.size || 0), listBan.length, listBan.join("\n")), threadID, messageID);
		}

		case "معلومات":
		case "-i": {
			if(event.type == "message_reply") { targetID = event.messageReply.senderID }
			if (!global.data.allUserID.includes(targetID)) return api.sendMessage(getText("IDNotFound", "[ Info User ]"), threadID, messageID);
			if (global.data.commandBanned.has(targetID)) { var commandBanned = global.data.commandBanned.get(targetID) || [] };
			if (global.data.userBanned.has(targetID)) { var { reason, dateAdded } = global.data.userBanned.get(targetID) || {} };
			const nameTarget = global.data.userName.get(targetID) || await Users.getNameUser(targetID);
			return api.sendMessage(getText("returnInfo", `${targetID} - ${nameTarget}`, ((!dateAdded) ? "YES" : "NO"), ((reason) ? `${getText("reson")}: "${reason}"` : ""), ((dateAdded) ? `${getText("at")}: ${dateAdded}` : ""), ((commandBanned) ? `YES: ${(commandNeedBan.length == global.client.commands.size) ? getText("allCommand") : commandNeedBan.join(", ")}` : "NO")), threadID, messageID);
		}
	}
    }