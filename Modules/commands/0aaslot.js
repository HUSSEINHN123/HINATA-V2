module.exports.config = {
    name: "سلوت",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Mirai Team",
    description: "القمار على شكل فاكهة",
    commandCategory: "إقتصاد",
    usages: "[مبلغ الرهان 💵]",
    cooldowns: 5,
};

module.exports.languages = {
    "vi": {
        "missingInput": "[ slot ] Số tiền đặt cược không được để trống hoặc là số âm",
        "moneyBetNotEnough": "[ SLOT ] Số tiền bạn đặt lớn hơn hoặc bằng số dư của bạn!",
        "limitBet": "[ SLOT ] Số coin đặt không được dưới 50$!",
        "returnWin": "╭────────╮\nㅤ🎰 %1 | %2 | %3 🎰ㅤ💰💰💰\n╰────────╯\n𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐭𝐡𝐚̆́𝐧𝐠 𝐯𝐚̀ 𝐧𝐡𝐚̣̂𝐧 %4$ 💸",
        "returnLose": "╭────────╮\nㅤ🎰 %1 | %2 | %3 🎰ㅤ💰💰💰\n╰────────╯\n𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐭𝐡𝐮𝐚 𝐯𝐚̀ 𝐛𝐚𝐲 %4$ 💸"
    },
    "en": {
        "missingInput": "[ رهانات ]\n ⚠️ | يجب ألا يكون مبلغ الرهان فارغًا أو رقمًا سالبًا",
        "moneyBetNotEnough": "[ رهانات ]\n ⚠️ | المال اللذي تريد المراهنة به هو أكبر من رصيدك\nتفقد رصيدك ثم أعد المحاولة",
        "limitBet": "[ رهانات ]\n ⚠️ |المبلغ اللذي راهنت به لتو هو قليل نسبيا راهن على الأقل ب [50 دولار 💵]",
        "returnWin": "╭────────╮\n🎰 %1 | %2 | %3 🎰\n╰────────╯\nتهانينا 🥳\n لقد ربحت لتو %4 دولار",
        "returnLose": "╭────────╮\n🎰 %1 | %2 | %3 🎰\n╰────────╯\nمع الأسف 😥\nلقد خسرت لتو %4 دولار"
    }
}

module.exports.run = async function({ api, event, args, Currencies, getText }) {
    const { threadID, messageID, senderID } = event;
    const { getData, increaseMoney, decreaseMoney } = Currencies;
    const slotItems = ["🍇", "🍉", "🍊", "🍏", "7⃣", "🍓", "🍒", "🍌", "🥝", "🥑", "🌽", "🍋"];
    const moneyUser = (await getData(senderID)).money;

    var moneyBet = parseInt(args[0]);
    if (isNaN(moneyBet) || moneyBet <= 0) return api.sendMessage(getText("missingInput"), threadID, messageID);
  if (moneyBet > moneyUser) return api.sendMessage(getText("moneyBetNotEnough"), threadID, messageID);
  if (moneyBet < 50) return api.sendMessage(getText("limitBet"), threadID, messageID);
    var number = [], win = false;
    for (i = 0; i < 3; i++) number[i] = Math.floor(Math.random() * slotItems.length);
    if (number[0] == number[1] && number[1] == number[2]) {
        moneyBet *= 9;
        win = true;
    }
    else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
        moneyBet *= 2;
        win = true;
    }
    switch (win) {
        case true: {
            api.sendMessage(getText("returnWin", slotItems[number[0]], slotItems[number[1]], slotItems[number[2]], moneyBet), threadID, messageID);
            await increaseMoney(senderID, moneyBet);
            break;
        }
        case false: {
            api.sendMessage(getText("returnLose", slotItems[number[0]], slotItems[number[1]], slotItems[number[2]], moneyBet), threadID, messageID);
            await decreaseMoney(senderID, moneyBet);
            break;
        }
    }
}