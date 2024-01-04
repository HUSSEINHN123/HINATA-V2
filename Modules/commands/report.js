const axios = require('axios');

module.exports.config = {
    name: "تقرير",
    version: "22.1.0",
    hasPermssion: 2,
    credits: "yukihira soma",
    description: "حرق الموجز",
    commandCategory: "خدمات",
    usages: "تقرير (الرابط)",
    cooldowns: 5
};

module.exports.handleReply = async function ({ api, event, handleReply, client }) {
    if (event.senderID !== handleReply.author) return;
    switch (handleReply.Case) {
        case 1: {
            return api.sendMessage("الرجاء الرد على هذه الرسالة وإدخال الاسم الحقيقي لمستخدم الفيسبوك الذي تريد الإبلاغ عنه!", event.threadID, (error, info) => {
                global.client.handleReply.push({ Link: event.body, RealName: event.body, Gmail: null, Content: null, Time: null, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 2 });
            });
        }
        case 2: {
            return api.sendMessage("الرجاء الرد على هذه الرسالة وإدخال جيمايل الخاص بك لتلقي إشعارات الفيسبوك!", event.threadID, (error, info) => {
                global.client.handleReply.push({ Link: handleReply.Link, RealName: handleReply.RealName, Gmail: event.body, Content: null, Time: null, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 3 });
            });
        }
        case 3: {
            return api.sendMessage("أرجوك قم بالرد على خذه الرسالة بالمحتوى اللذي تريد الإبلاغ عنه!", event.threadID, (error, info) => {
                global.client.handleReply.push({ Link: handleReply.Link, RealName: handleReply.RealName, Gmail: handleReply.Gmail, Content: event.body, Time: null, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 4 });
            });
        }
        case 4: {
            return api.sendMessage("الرجاء الرد على هذه الرسالة وإدخال عدد المرات التي تريد فيها الإبلاغ عن هذا الضحية!", event.threadID, (error, info) => {
                global.client.handleReply.push({ Link: handleReply.Link, RealName: handleReply.RealName, Gmail: handleReply.Gmail, Content: handleReply.Content, Time: event.body, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 5 });
            });
        }
        case 5: {
            var Time = parseInt(event.body);
            if (isNaN(event.body)) {
                return api.sendMessage("الرجاء إعادة إدخال عدد الضحايا المبلغ عنهم!", event.threadID, (error, info) => {
                    global.client.handleReply.push({ Link: handleReply.Link, RealName: handleReply.RealName, Gmail: handleReply.Gmail, Content: handleReply.Content, Time: event.body, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 5 });
                });
            }
            if (event.body > 100) {
                return api.sendMessage("الرجاء إدخال ما لا يزيد عن 100 مرة تم الإبلاغ عنها للضحايا!", event.threadID, (error, info) => {
                    global.client.handleReply.push({ Link: handleReply.Link, RealName: handleReply.RealName, Gmail: handleReply.Gmail, Content: handleReply.Content, Time: event.body, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 5 });
                });
            }
            if (event.body < 1) {
                return api.sendMessage("الرجاء إدخال عدد الضحايا المبلغ عنهم مرة واحدة على الأقل!", event.threadID, (error, info) => {
                    global.client.handleReply.push({ Link: handleReply.Link, RealName: handleReply.RealName, Gmail: handleReply.Gmail, Content: handleReply.Content, Time: event.body, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 5 });
                });
            }
            return api.sendMessage("لقد طلبت الإبلاغ عن الضحية بالمعلومات التالية:\nالإسم الحقيقي: " + handleReply.RealName + "\nالبريد الإلكتروني (ملكك): " + handleReply.Gmail + "\nالمحتوى: " + handleReply.Content + "\nعدد البلاغات: " + (handleReply.Time || Time), event.threadID, (error, info) => {
                api.sendMessage("أرجوك قم بالرد ب 'حسنا' لكي تأكد على الإبلاغ 💀", event.threadID, (err, info) => {
                    global.client.handleReply.push({ Link: handleReply.Link, RealName: handleReply.RealName, Gmail: handleReply.Gmail, Content: handleReply.Content, Time: handleReply.Time || Time, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 6 });
                });
            });
        }
        case 6: {
            if (event.body !== "حسنا") return api.sendMessage("أرجوك قم بالرد ب 'حسنا' لتأكيد إطلاق التقرير 💀", event.threadID, (error, info) => {
                global.client.handleReply.push({ Link: handleReply.Link, RealName: handleReply.RealName, Gmail: handleReply.Gmail, Content: handleReply.Content, Time: handleReply.Time, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 6 });
            });
            for (let i = 0; i < (handleReply.Time || Time); i++) {
                try {
                    const endpoint = `https://mahirosunogcmd--cyberinstitute.repl.co/sunog?cookie=EAAD6V7os0gcBOZBxLq2u3ffHlON1p7iZA5HyVlZBNSu7R3SpzrxGvRG6ZAWWh153GHPVDIdTZBpOIrZBQIkceJdRwNjdyVI5pEUGx94Kg4qWRKpZAtnn45EonQ24cz1nMwA0qEVlIWZALvmiLn7RX4sly2mhYVQc8r9dMO5IODGcRkKzgQnDZB1ZBmqU9U6DuNV6IuFwZDZD&id=${handleReply.Link}`;
                    const response = await axios.get(endpoint);

                    console.log(i + "/ Report " + response.data);
                    await new Promise(resolve => setTimeout(resolve, 1 * 1000));
                } catch (e) {
                    console.log(e);
                    return api.sendMessage("مجهول خطأ\n" + e, event.threadID);
                }
            }
            return api.sendMessage(`تك إرسال: ${(handleReply.Time || Time)} التقريرات إلى الضحية ${handleReply.RealName}!`, event.threadID);
        }
    }
};

module.exports.run = async function ({ api, event, client }) {
    return api.sendMessage("يرجى الرد على هذه الرسالة وإدخال رابط الفيسبوك الخاص بالشخص الذي تريد الإبلاغ عنه!", event.threadID, (error, info) => {
        global.client.handleReply.push({ Link: null, RealName: null, Gmail: null, Content: null, Time: null, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 1 });
    });
};
