module.exports.config = {
  name: "أنمي2",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "Keyl",
  description: "مجموعة من صور الأنمي",
  commandCategory: "صور",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "axios": ""
  }
}

module.exports.handleReply = async ({ api, event, handleReply }) => {
  const axios = require("axios");
const { threadID, messageID, body } = event;
    switch(handleReply.type) {
        case "reply": {
            switch(body) {

					case "1": {
                const res = await axios.get("https://APIURL.miraiofficials123.repl.co");
//lấy data trên web api
const data = res.data.url;
//tải ảnh xuống
let download = (await axios.get(data, {
			responseType: "stream"
		})).data;
            api.unsendMessage(handleReply.messageID);
          return api.sendMessage({body: ` آنيا <3`, attachment: download}, threadID, messageID);
          };
			break;

        case "2": {
                const res = await axios.get("https://apikanna.ngochan6666.repl.co");
//lấy data trên web api
const data = res.data.data;
//tải ảnh xuống
let download2 = (await axios.get(data, {
			responseType: "stream"
		})).data;
    api.unsendMessage(handleReply.messageID);
          return api.sendMessage({body: ` كانا`, attachment: download2}, threadID, messageID);
          };
			break;

        case "3": {
                const res = await axios.get("https://api.xlshsad.repl.co/images/mirai");
//lấy data trên web api
const data = res.data.url;
//tải ảnh xuống
let download3 = (await axios.get(data, {
			responseType: "stream"
		})).data;
          api.unsendMessage(handleReply.messageID);
          return api.sendMessage({body: `ميراي <3`, attachment: download3}, threadID, messageID);
          };
			break; 

        case "4": {
                const res = await axios.get("https://APIURLChitanda.miraiofficials123.repl.co");
//lấy data trên web api
const data = res.data.url;
//tải ảnh xuống
let download4 = (await axios.get(data, {
			responseType: "stream"
		})).data;
          api.unsendMessage(handleReply.messageID);
          return api.sendMessage({body: ` شيتاندا <3`, attachment: download4}, threadID, messageID);
          };
			break;
                
        case "5": {
                const res = await axios.get("https://APIURLLoLi.miraiofficials123.repl.co");
//lấy data trên web api
const data = res.data.url;
//tải ảnh xuống
let download5 = (await axios.get(data, {
			responseType: "stream"
		})).data;
          api.unsendMessage(handleReply.messageID);
          return api.sendMessage({body: `لولي <3`, attachment: download5}, threadID, messageID);
          };
			break;

        case "6": {
                const res = await axios.get("https://APIdoraemon.miraiofficials123.repl.co");
//lấy data trên web api
const data = res.data.data;
//tải ảnh xuống
let download6 = (await axios.get(data, {
			responseType: "stream"
		})).data;
          api.unsendMessage(handleReply.messageID);
          return api.sendMessage({body: `دورايمون <3`, attachment: download6}, threadID, messageID);
          };
			break;

        case "7": {
                const res = await axios.get("https://APIURLViolet.miraiofficials123.repl.co");
//lấy data trên web api
const data = res.data.url;
//tải ảnh xuống
let download7 = (await axios.get(data, {
			responseType: "stream"
		})).data;
          api.unsendMessage(handleReply.messageID);
          return api.sendMessage({body: `ڤايوليت <3`, attachment: download7}, threadID, messageID);
          };
			break;

        case "8": {
                const res = await axios.get("https://api.apidata.repl.co/gentle");
//lấy data trên web api
const data = res.data.data;
//tải ảnh xuống
let download8 = (await axios.get(data, {
			responseType: "stream"
		})).data;
          api.unsendMessage(handleReply.messageID);
          return api.sendMessage({body: `جنتل <3`, attachment: download8}, threadID, messageID);
          };
			break;     

        case "9": {
                const res = await axios.get("https://apiboy.thanhduongtran465.repl.co/");
//lấy data trên web api
const data = res.data.data;
//tải ảnh xuống
let download9 = (await axios.get(data, {
			responseType: "stream"
		})).data;
          api.unsendMessage(handleReply.messageID);
          return api.sendMessage({body: `أومزيم`, attachment: download9}, threadID, messageID);
          };
			break;         
    
					default:
				const choose = parseInt(body);
            	if (isNaN(body)) return api.sendMessage("💟 قم بالإختيار من 1 إلى 9 ", threadID, messageID);
            	if (choose > 9 || choose < 1) return api.sendMessage("هذا الخيار لم يتم إبجاده", threadID, messageID); 
			}
		}
	}
}

module.exports.run = async ({ api, event, handleReply }) => {
	return api.sendMessage({ body: 
    "⠀ ⠀ = الأنميات المتاحة =" +
    "\n\n1. آنيا" +
    "\n2. كانا" +
    "\n3. ميراي" +
    "\n4. شيتانادا" +
    "\n5. لولي" +
    "\n6. دورايمون" +
    "\n7. ڤايوليت" +
    "\n8. جنتل" +
    "\n9. أومزيم" +
    "\n\nقم بالرد بالرقم للأنمي اللذي عريد رؤية صوره"
            }, event.threadID, (error, info) => {
        global.client.handleReply.push({
            type: "reply",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        })  
    })
                  } 