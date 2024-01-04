module.exports.config = {
    name: "بنك",
    version: "2.0.5",
    hasPermssion: 0,
    credits: "MintDaL mod by JRT",
    commandCategory: "إقتصاد",
    description:'قم بتفقد حسابك البنكي من أجل إيداع و سحب و تحويل مع بطاقة بنكية و كلمة سر خاصة بك ',
    usages: "بنك",
    usePrefix:true,
    cooldowns: 5
};


module.exports.run = async function ({ api, event, args, Currencies, Users }) {
    const { senderID, messageID, threadID } = event;
    const axios = require('axios');
    const checkBank = (await axios.get(`https://docs-api.jrtxtracy.repl.co/bank/check?ID=${senderID}`)).data   
    const { createReadStream } = require(`fs-extra`);
    switch(args[0]) {
        case 'تسجيل':
        case '-r':
        case 'r': {
            const res = (await axios.get(`https://docs-api.jrtxtracy.repl.co/bank/register?senderID=${senderID}&name=${encodeURI((await Users.getData(senderID)).name)}`)).data
            if(res.status == false) return api.sendMessage(res.message, threadID, messageID);
            api.sendMessage('كلمة مرور البنك الخاص بك هي: ' + res.message.password, senderID);
            return api.sendMessage(`=== 『 ${res.message.noti} 』 ===\n[👤]➜ صاحب الحساب: ${res.message.name}\n[💳]➜ البطاقة_البنكية: ${res.message.STK}\n[💰]➜ الرصيد: ${res.message.money}\n[🔐]➜ كلمة المرور: تم إرساله إليك، يرجى التحقق من رسائلك الخاصة (أو البريد العشوائي )`, threadID, messageID)
        }
        
         case "جد":
        case "-f": {
            if (checkBank.status == false) api.sendMessage("[⚜️]➜ أليس لديك حساب مصرفي بعد!", threadID, messageID)
            if (args[1] != "بطاقة_إئتمانية" && args[1] != "آيدي") {
                api.sendMessage("[⚜️]➜ الرجاء تحديد نوع البيانات الصحيح (بطاقة_إئتمانية أو آيدي)", threadID, messageID)
            }
            let { data } = (await axios.get(`https://docs-api.jrtxtracy.repl.co/bank/find?type=${args[1].toUpperCase()}&${args[1].toUpperCase()}=${args[2]}`))
            const name = data.message.name
            const stk = data.message.data.STK
            const soDu = data.message.data.money
            return api.sendMessage(`=== 『 🏦 هيناتا 🏦 』 ===\n[👤]➜ صاحب الحساب: ${name}\n[💳]➜ البطاقة الإئتمانية: ${stk}\n[💰]➜ الرصيد الحالي هو : ${soDu}$`, threadID, messageID)
        }
      case 'رصيدي':
      case '-i':
      case 'تفقد':
      case '-c': {
        var a = event.senderID;
        if(checkBank.status == false) return api.sendMessage('[⚜️]➜ أليس لديك حساب مصرفي بعد!', threadID, messageID);
        const res = (await axios.get(`https://docs-api.jrtxtracy.repl.co/bank/find?type=ID&ID=${a}`)).data  
          return api.sendMessage(`=== 『 بنك ريم 』 ===\n[👤]➜ صاحب الحساب: ${res.message.name}\n[💳]➜ البطاقة_الإئتمانية: ${res.message.data.STK}\n[💰]➜ لديك رصيد يقدر ب: ${res.message.data.money}$`, threadID, messageID)
      }
        case 'إستخراح':
        case 'سحب': {
            if(checkBank.status == false) return api.sendMessage('[⚜️]➜ أليس لديك حساب مصرفي بعد!', threadID, messageID);
            if(!args[1]) return api.sendMessage('[⚜️]➜ إستخدام غير صالح أكتب: إستخراح أو سحب [مبلغ المال]', threadID, messageID);
            api.sendMessage('[⚜️]➜ أكمل الخطوة الأخيرة في رسالة الانتظار', threadID, messageID);
            return api.sendMessage('[⚜️]➜ يرجى الرد على هذه الرسالة وإدخال كلمة مرور البنك الخاص بك لسحب الأموال!', senderID, (error, info) => 
                global.client.handleReply.push({
                    name: this.config.name,
                    type: 'getMoney',
                    messageID: info.messageID,
                    author: event.senderID,
                    money: args[1],
                    threadID: threadID
                })
            );
        }
         case 'توب':
         case '-t':{
            if(checkBank.status == false) return api.sendMessage('[⚜️]➜ أليس لديك حساب مصرفي بعد إذهب و أحصل على واحد!', threadID, messageID);
            const res = (await axios.get(`https://docs-api.jrtxtracy.repl.co/bank/top`)).data  
            if(res.status == false) return api.sendMessage('[⚜️]➜ لا يوجد حاليا أي بيانات متاحة!', threadID, messageID);
            var msg = res.message + '\n'
            for (let i of res.ranking) {
                msg += `${i.rank}. ${i.name} \n[💰]➜ الرصيد الحالي: ${i.money}$\n===========\n`
            }
            return api.sendMessage(msg, threadID, messageID);
        }
        case 'تحويل':
        case '-p': {
            if(checkBank.status == false) return api.sendMessage('[⚜️]➜ ليس لديك حساب مصرفي بعد! إذهب وأحصل على واحد', threadID, messageID);
            if(!args[1] || !args[2] || !args[3]) return api.sendMessage('[⚜️]➜ الرجاء إدخال نوع البيانات الصحيح: دفع بطاقة_إئتمانية [البطاقة الإئتمانية للمتلقي أو الآيدي] [مبلغ المال]', threadID, messageID);
            if(args[1] == 'بطاقة_إئتمانية') {
                api.sendMessage('[⚜️]➜ أكمل الخطوة الأخيرة في الخاص ', threadID, messageID);
                return api.sendMessage('[⚜️]➜ الرجاء الرد على هذه الرسالة وإدخال كلمة المرور البنكية الخاصة بك لتحويل الأموال!', senderID, (error, info) => 
                    global.client.handleReply.push({
                        name: this.config.name,
                        type: 'paySTK',
                        messageID: info.messageID,
                        author: event.senderID,
                        STK: args[2],
                        money: args[3],
                        threadID: threadID
                    })
                );
            }
            if(args[1] == 'id') {
                if(checkBank.status == false) return api.sendMessage('[⚜️]➜ ليس لديك حساب مصرفي بعد!', threadID, messageID);
                api.sendMessage('[⚜️]➜ أكمل الخطوة الأخيرة في رسالة الانتظار', threadID, messageID);
                return api.sendMessage('[⚜️]➜ الرجاء الرد على هذه الرسالة وإدخال كلمة المرور البنكية الخاصة بك لتحويل الأموال!', senderID, (error, info) => 
                    global.client.handleReply.push({
                        name: this.config.name,
                        type: 'payID',
                        messageID: info.messageID,
                        author: event.senderID,
                        ID: args[2],
                        money: args[3],
                        threadID: threadID
                    })
                );
            }
            break;
        }
        case 'إيداع':
        case 'إدخال':
        case 'nạp': {
            if(checkBank.status == false) return api.sendMessage('[⚜️]➜ ليس لديك حساب مصرفي بعد!', threadID, messageID);
            if(!args[1]) return api.sendMessage('[⚜️]➜ الرجاء إدخال المبلغ المراد إيداعه!\nإدخال أو إيداع [المبلغ للإيداع]', threadID, messageID);
            var check = await checkMoney(senderID, args[1])
            if (check == false) return api.sendMessage('[⚜️]➜ أين هو المال لإيداع؟', threadID, messageID);
            await Currencies.decreaseMoney(senderID, parseInt(args[1]))
            const res = (await axios.get(`https://docs-api.jrtxtracy.repl.co/bank/send?senderID=${senderID}&money=${args[1]}`)).data  
            return api.sendMessage(`${res.message.noti}\n[👤]➜ صاحب الحساب: ${res.message.name}\n[💰]➜ أنت لديك  : ${res.message.money}$`, threadID, messageID)
            break;
    }
        case 'كلمة_السر':
        case 'كلمة_المرور': {
            if(checkBank.status == false) return api.sendMessage('[⚜️]➜ ليس لديك حساب مصرفي حتى الآن!', threadID, messageID);
            var type = args[1];
            switch(type) {
                case 'عرض': {
                    const res = (await axios.get(`https://docs-api.jrtxtracy.repl.co/bank/password?bka=${type}&dka=${senderID}`)).data 
                    api.sendMessage('[⚜️]➜ يتم إرسال كلمة المرور الخاصة بك إلى الخاص تفقد هناك', threadID, messageID);
                    return api.sendMessage(`[⚜️]➜ كلمة المرور الخاصة بك هي: ${res.message.password}`, senderID);
                }
                case 'إستعادة':
                case 'جديد': {
                    api.sendMessage('[⚜️]➜ أكمل الخطوة الأخيرة في رسالة الانتظار', threadID, messageID);
                    return api.sendMessage('[⚜️]➜ الرجاء الرد على هذه الرسالة لإدخال كلمة المرور الجديدة!', senderID, (error, info) => 
                        global.client.handleReply.push({
                            name: this.config.name,
                            type: 'newPassword',
                            messageID: info.messageID,
                            author: event.senderID,
                            threadID: threadID
                        })
                    );
                }
                default: {
                    return api.sendMessage("[⚜️]➜ يرجى استخدام عرض (للحصول على كلمة المرور) أو جديد أو إستعادة (لإدخال كلمة المرور الجديدة)", threadID, messageID);
                }
            }
        }
        default: {
        
                           
        return api.sendMessage({body:`[⚜️]=== 『  🏦 هيناتا 🏦 』 ===[⚜️]\n◆━━━━━━━━━━━━━━━━◆\n\n[⚜️]➜ تسجيل ➜ للتسجيل \n[⚜️]➜ معلومات ➜ لعرض معلومات حسابك\n[⚜️]➜ جد ➜ للعثور على الحسابات المصرفية \n[⚜️]➜ سحب ➜ لسحب الأموال \n[⚜️]➜ توب ➜ لرؤية الأغنى على نظام الخادم  \n[⚜️]➜ تحويل ➜ لتحويل الأموال \n[⚜️]➜ إيداع ➜ قم بإيداع الأموال في حسابك \n[⚜️]➜ كلمة_المرور ➜ استرجع كلمة المرور الخاصة بك أو قم بتغيير كلمة مرور حسابك المصرفي`, attachment: createReadStream(__dirname + `/cache/banking123.jpg`)}, threadID, messageID);
        }
    }
async function checkMoney(senderID, maxMoney) {
    var i, w;
    i = (await Currencies.getData(senderID)) || {};
    w = i.money || 0
    if (w < parseInt(maxMoney)) return false;
    else return true;
  }
}
module.exports.handleReply = async function ({ api, event, handleReply, Currencies }) {
    const axios = require('axios')
    const { senderID, messageID, threadID , body } = event;
    switch(handleReply.type) {
        case 'paySTK': {
            const res = (await axios.get(`https://docs-api.jrtxtracy.repl.co/bank/pay?type=STK&senderID=${senderID}&STK=${handleReply.STK}&money=${handleReply.money}&password=${body}`)).data 
            if(res.status == false) return api.sendMessage(res.message, threadID, messageID);
            api.sendMessage(`${res.message.noti}\n${res.message.data.message}`, threadID, messageID);
            return api.sendMessage(`${res.message.noti}\n\n${res.message.data.message}`, handleReply.threadID);
        }
        case 'payID': {
            const res = (await axios.get(`https://docs-api.jrtxtracy.repl.co/bank/pay?type=ID&senderID=${senderID}&userID=${handleReply.ID}&money=${handleReply.money}&password=${body}`)).data 
            if(res.status == false) return api.sendMessage(res.message, threadID, messageID);
            api.sendMessage(`${res.message.noti} ${res.message.data.message}`, threadID, messageID);
            return api.sendMessage(`${res.message.noti}\n\n${res.message.data.message}`, handleReply.threadID);
        }
        case 'getMoney': {
            const res = (await axios.get(`https://docs-api.jrtxtracy.repl.co/bank/get?ID=${senderID}&money=${handleReply.money}&password=${body}`)).data  
            if(res.status == false) return api.sendMessage(res.message, threadID, messageID);
            await Currencies.increaseMoney(senderID, parseInt(handleReply.money))
            api.sendMessage(`${res.message.noti}\n[👤]➜ صاحب الحساب: ${res.message.name}\n[💰]➜ الرصيد المتبقي: ${res.message.money}`, threadID, messageID);
            return api.sendMessage(`${res.message.noti}\n[👤]➜ صاحب الحساب: ${res.message.name}\n[💰]➜ الرصيد المتبقي: ${res.message.money}`, handleReply.threadID);
        }
        case 'newPassword': {
            const res = (await axios.get(`https://docs-api.jrtxtracy.repl.co/bank/password?bka=recovery&dka=${senderID}&fka=${body}`)).data  
            if(res.status == false) return api.sendMessage(res.message, threadID, messageID);
            api.sendMessage(`${res.message.noti}\n[👤]➜ صاحب الحساب: ${res.message.name}`, handleReply.threadID);
            return api.sendMessage(`[⚜️]➜ تم تغيير الرقم السري بنجاح!\n[⚜️]➜ كلمة السر الحالية: ${res.message.password}`, threadID, messageID)
        }
    }
  }