module.exports.config = {
    name: "تحويل",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Mirai Team",
    description: "تحويل الأموال إلى الآخرين",
    commandCategory: "إقتصاد",
    usages: "[منشن المستخدم] [المبلغ لتحويل]",
    cooldowns: 5
};

module.exports.languages = {
    "vi": {
        "missingTag": "[ PAY ] Bạn phải tag người cần chuyển tiền",
        "overTagLength": "[ PAY ] Vui lòng chỉ tag một người duy nhất",
        "userNotExist": "[ PAY ] Người dùng bạn cần chuyển không tồn tại trong hệ thống!",
        "invalidInput": "[ PAY ] Số tiền bạn nhập không phù hợp để chuyển",
        "payerNotExist": "[ PAY ] Hiện tại bạn không tồn tại trong hệ thống, vui lòng chờ 5 giây sau đó thử lại",
        "notEnoughMoney": "[ PAY ] Bạn không đủ tiền để thực hiện giao dịch!",
        "paySuccess": "[ PAY ] Đã chuyển thành công %1$ (15% tax) cho người dùng: %2",
        "error": "[ PAY ] Đã xảy ra lỗi không mong muốn trong lúc thực hiện giao dịch"
    },
    "en": {
        "missingTag": "[ عملية التحويل ] لا مستقبل ممنشن قم بعمل منشن أرجوك ❌.",
        "overTagLength": "[ عملية التحويل ] يجب أن تقوم بعمل منشن على شخص واحد.",
        "userNotExist": "[ عملية التحويل ] مستقبل غير صالح ولايستحق تحويل المال إليه.",
        "invalidInput": "[ عملية التحويل ] Invailid amount.",
        "payerNotExist": "[ عملية التحويل ] من فضلك انتظر 5 ثواني ليتم تسجيلك بالكامل لأنك لست عضوا بعد.",
        "notEnoughMoney": "[ عملية التحويل ] رصيدك غير كاف. يرجى التحقق من المبلغ الخاص بك.",
        "paySuccess": "[ عملية التحويل ] تم بنجاح تحويل  %1$ إلى %2 (15% الضريبة المتضمنة على ذالك)",
        "error": "[ عملية التحويل ] حدث خطأ غير معروف، يرجى الاتصال بالمسؤول إستخدم الأمر *نداء."
    }
}

module.exports.run = async function ({ api, event, Currencies, Users, args, getText }) {
    const { increaseMoney, decreaseMoney, getData } = Currencies;
    const { threadID, messageID, senderID } = event;
	var targetID = String(args[1]);
	var moneyPay = (args.slice(2, args.length)).join(" ") || null;

	if (isNaN(targetID)) {
		const mention = Object.keys(event.mentions);
        if (mention.length == 0) return api.sendMessage(getText("missingTag"), threadID, messageID);
        if (mention.length > 1) return api.sendMessage(getText("overTagLength"), threadID, messageID);
		args = args.join(" ");
		targetID = String(mention[0]);
		moneyPay = (args.slice(args.indexOf(event.mentions[mention[0]]) + (event.mentions[mention[0]] || "").length + 1, args.length)) || null;
	}

    if (!global.data.allCurrenciesID.includes(targetID)) return api.sendMessage(getText("userNotExist"), threadID, messageID);

    if (isNaN(moneyPay) && moneyPay < 1) return api.sendMessage(getText("invalidInput"), threadID, messageID);
    const taxed = (parseInt(moneyPay) * 15) / 100;
    
    try {
        const moneyPayer = (await getData(senderID)).money;
        if (!moneyPayer) return api.sendMessage(getText("payerNotExist"), threadID, messageID);
        if (moneyPayer < moneyPay) return api.sendMessage(getText("notEnoughMoney"), threadID, messageID);
        const nameTarget = global.data.userName.get(targetID) || await Users.getNameUser(targetID);
        await decreaseMoney(senderID, parseInt(moneyPay));
        await increaseMoney(targetID, parseInt(moneyPay) - taxed);
        return api.sendMessage(getText("paySuccess", (parseInt(moneyPay) - taxed), `${targetID} - ${nameTarget}`), threadID, messageID);
    } catch { return api.sendMessage(getText("error"), threadID, messageID) }
      }
          