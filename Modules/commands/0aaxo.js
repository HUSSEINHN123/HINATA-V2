module.exports.config = {
    name: "حجر_ورقة_مقص",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Kaizen",
    description: "قم بلعب لعبة حجر ورقة مقص ",
    commandCategory: "لعبة",
    usages: "!حجر ورقة مقص",
    cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
    let choices = ['حجر', 'ورقة', 'مقص'];
    let computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    if (!args || args.length === 0) {
        api.sendMessage("أرجوك قم بإختيار 'حجر'🪨, 'ورقة📃', أو 'مقص'✂️", event.threadID);
        return;
    }

    let userChoice = args[0];
    
    if (!userChoice || !choices.includes(userChoice)) {
        api.sendMessage("إحتيار غير صالح , المرجو إختيار أحد الإختيارات التالية : 'حجر', 'ورقة', أو 'مقص'", event.threadID);
        return;
    }
    
    if (userChoice === computerChoice) {
        api.sendMessage("إنه تعادل كلاكما أنت والبوت  " + userChoice, event.threadID);
    } else if (userChoice === 'حجر' && computerChoice === 'مقص') {
        api.sendMessage("لقد فزت الحجر🪨👊 يهزم المقص ✂️✌🖕", event.threadID);
    } else if (userChoice === 'ورقة' && computerChoice === 'حجر') {
        api.sendMessage("لفد فزت ! الورقة 📃🖐️ تهزم الحجر 🪨👊", event.threadID);
    } else if (userChoice === 'مقص' && computerChoice === 'ورقة') {
        api.sendMessage("لقد فزت ! المقص✂️✌️ يهزم الورقة📃🖐️", event.threadID);
    } else {
        api.sendMessage("لقد خسرت!❌ " + computerChoice + " يهزم " + userChoice, event.threadID);
    }
};
                   