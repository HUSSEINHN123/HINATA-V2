module.exports.config = {
    name: "نرد",
    version: "1.1.1",
    hasPermission: 0,
    credits: "DC-Nam mod D-Jukie and J-JRT / Adjusted by Draffodils",
    description: "العب لعبة النرد `كبير صغير` مباشرة في الرسالة ",
    commandCategory: "لعبة",
    usage: "نرد [كبير/صغير] + [مبلغ الرهان/الكل/50%]",
    cooldowns: 0,
    envConfig: {
        timeout: 3000,
        core: 3,
        api_key: "JRTvip_2200708248"
    }
}

module.exports.languages = {
    "vi": {
        // Vietnamese translations
    },
    "en": {
        "noOption1": "[⚜️]➜ يجب أن تراهن ب 'كبير' أو 'صغير' + مبلغ الرهان",
        "InvalidSelection": "[⚜️]➜ إختيارك غير صالح ❌\n[⚜️]➜ الخيارات الصحيحة ↓↓💦\n • %5: %4, %5, %6\n • %1: %1, %2, %3",
        "noOption2": "[⚜️]➜ أنت يجب أن تدخل مبلغ الرهان أو 'الكل', '50%'\n - 'الكل' سوف يكلفك خسارة كل مالك في رصيدك البنكي\n - '50%' ستتم مراهنة 50% من رصيدك الحالي",
        "InvalidBets": "[⚜️]➜ غير صالح او أقل من %1$ مبلغ الرهان المطلوب",
        "notEnoughMoney": "[⚜️]➜ غير كافي يجب ان تراهن ب  %1 دولار لكي تبدأ المراهنة , بحب عليك إدخال  %2 دولار من رصيدك البنكي",
        "rollTheDice": "[⚜️]➜ 🎲 النرد في طور الدحرجة...\n[⚜️]➜ حظا سعيدا :))",
        "win": "[⚜️]➜ النتيجة النهائية هي %1, لقد راهنت على %2 => لقد فزت 🥳\n - وتلقيت %3 دولار\n - الرصيد الحالي: %4 دولار",
        "lose": "[⚜️]➜ النتيجة هي %1, لقد راهنت على %2 => لقد خسرت 🥺\n - وتم الخصم منك %3$\n - الرصيد المتبقي : %4$",
        "error": "[⚜️]➜ %1, ❌ | حدث خطأ، يرجى المحاولة مرة أخرى بعد قليل!"
    }
}

const axios = require("axios")

module.exports.run = async ({ api, event, args, Currencies, getText }) => {
    const { threadID: tid, messageID: mid, senderID: sid } = event;
    try {
        if (!args[0]) return api.sendMessage(getText("noOption1"), tid, mid);
        
        const { name, envConfig } = this.config;
        const { timeout, core, api_key } = global.config[name];
        
        let get = (await axios.get(`https://docs-api.jrtxtracy.repl.co/game/taixiu`)).data;
        var moneyUsers = (await Currencies.getData(sid)).money;
        var choose = args[0].toLowerCase();
        var bets = parseInt(args[1]);
        var typeBig = ["كبير"];
        var typeSmall = ["صغير"];
        var other = ["الكل", "50%"];
        var arrayNew = [];
        
        if (!arrayNew.concat(typeBig, typeSmall).includes(choose)) return api.sendMessage(getText("InvalidSelection", typeSmall[0], typeSmall[1], typeSmall[2], typeBig[0]), tid, mid);
        
        if (!args[1]) return api.sendMessage(getText("noOption2"), tid, mid);
        
        if ((isNaN(bets) || bets < 100) && !other.includes(args[1])) return api.sendMessage(getText("InvalidBets", 100), tid, mid);
        
        if (bets > moneyUsers && !other.includes(args[1])) return api.sendMessage(getText("notEnoughMoney", ChangeCurrency(bets), ChangeCurrency(moneyUsers)), tid, mid);
        
        return api.sendMessage({
            body: getText("rollTheDice"),
            attachment: await DownLoad(get.gif)
        }, tid, (error, info) => {
            return setTimeout(CheckResult, (timeout || envConfig.timeout));
            
            async function CheckResult() {
                bets = args[1] == "الكل"? moneyUsers: args[1] == "50%"? moneyUsers / 2: bets;
                api.unsendMessage(info.messageID);
                
                if (typeBig.includes(choose)) {
                    choose = "كبير";
                } else choose = "صغير";
                
                if (choose == get.result) {
                    msg = "win", as = "increaseMoney", bets = bets * (core || envConfig.core), moneyUser = moneyUsers + parseInt(bets);
                } else msg = "lose", as = "decreaseMoney", bets = bets, moneyUser = moneyUsers - parseInt(bets);
                
                return api.sendMessage({
                    body: getText(msg, get.result + ' ' + get.total, choose, ChangeCurrency(bets), ChangeCurrency(moneyUser)),
                    attachment: await DownLoad(get.images)
                }, tid, () => Currencies[as](sid, bets), mid);
            }
        }, mid);
    } catch (e) {
        api.sendMessage(getText("error", e), tid);
    }
}

function ChangeCurrency(number) {
    return number.toLocaleString("en-US")
}

async function DownLoad(url) {
    if (typeof url == "object") {
        var attachment = [];
        
        for (let i of url) {
            var resp = (await axios.get(i, {
                responseType: "stream"
            })).data;
            
            attachment.push(resp);
        }
        
        return attachment;
    }
    
    return (await axios.get(url, {
        responseType: "stream"
    })).data;
  }
      