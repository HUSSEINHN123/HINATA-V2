module.exports.config = {
	name: "كهف",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Huy",
	description: "كسب المال من العمل في المناجم",
	commandCategory: "إقتصاد",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 43200000
    }
};

module.exports.languages = {
    "vi": {
        "cooldown": "Bạn đã làm cave trong hôm nay, để tránh kiệt sức hãy quay lại sau: %1 phút %2 giây.",
        "rewarded": "لقد قمت بعمل الكهف وحصلت عليه %2$",
        "job1": "لقد قمت ببيع الأسهم الخاصة بك!",
    },
    "en": {
        "cooldown": "لقد عملت اليوم، لتجنب الإرهاق يرجى العودة بعد ذلك: %1 ساعة %2 دقيقة %3 ثانية.",
        "rewarded": "لقد قمت بالعمل في الكهوف اليوم و حصلت على مبلغ: %2 دولار",
        "job1": " لقد قمت ببيع الأسهم الخاصة بك!",
    }
}

module.exports.run = async ({ event, api, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    if (typeof data !== "undefined" && cooldown - (Date.now() - data.workTime) > 0) {
        var time = cooldown - (Date.now() - data.workTime),
            seconds = Math.floor( (time/1000) % 60 ),
            minutes = Math.floor( (time/1000/60) % 60 ),
            hours = Math.floor( (time/(1000*60*60)) % 24 );
        
		return api.sendMessage(getText("cooldown", hours, minutes, (seconds < 10 ? "0" + seconds : seconds)), event.threadID, event.messageID);
    }
    else {
        const job = [
            getText("job1"),
        ];
        const amount = Math.floor(Math.random() * 3000);
        return api.sendMessage(getText("rewarded", job[Math.floor(Math.random() * job.length)], amount), threadID, async () => {
            await Currencies.increaseMoney(senderID, parseInt(amount));
            data.workTime = Date.now();
            await Currencies.setData(event.senderID, { data });
            return;
        }, messageID);
    }     
}