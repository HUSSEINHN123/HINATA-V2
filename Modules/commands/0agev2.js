module.exports.config = {
	name: "عمري2",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "L", //thay gì thì thay :Đ
	description: "قم بمعرفة عمىك إنطلاقا من تاريخ الإزدياد",
	commandCategory: "خدمات",
	usages: "[يوم/شهر/سنة]",
	cooldowns: 0
};

module.exports.run = function ({ event, args, api, getText }) {
var dau = args[0];
if (!dau) return api.sendMessage(`أرجوك قم بإدخال الصيغة الصحيحة: عمري + يوم/شهر/سنة تاريخ الإزدياد`,event.threadID,event.messageID);
else {
	const axios = require('axios');
	const moment = require("moment-timezone");
	var hientai = moment.tz("Aftica/Casablanca").format("DD/MM/YYYY");
	var time = `${dau}`;
	axios.get(`https://le31.glitch.me/other/date-calculator?first=${time}&second=${hientai}`).then(res => {
     var nam = res.data.years;
     var thang = res.data.months;
     var tuan = res.data.weeks;
     var ngay = res.data.days;
     var gio = res.data.hours;
     var phut = res.data.minutes;
     var giay = res.data.seconds;
     return api.sendMessage(`📆 تاريخ الإزدياد: ${dau}\n\n⏱ عدد السنوات التي مرت: ${nam} سنة \n\n⏱ عدد الأشهر التي مرت: ${thang} شهر \n\n⏱ عدد الاسابيع اجتاز: ${tuan} أسبوع \n\n⏱ عدد الأيام التي مرت: ${ngay} يوم \n\n⏱ عدد الساعات التي مرت: ${gio} ساعة \n\n⏱ عدد الدقائق التي مرت: ${phut} دقيقة \n\n⏱ عدد الثواني التي مرت: ${giay} ثانية `,event.threadID,event.messageID);
	});
}
                                 }
    module.exports.config = {
	name: "عمري2",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "L", //thay gì thì thay :Đ
	description: "قم بمعرفة عمىك إنطلاقا من تاريخ الإزدياد",
	commandCategory: "خدمات",
	usages: "[يوم/شهر/سنة]",
	cooldowns: 0
};

module.exports.run = function ({ event, args, api, getText }) {
var dau = args[0];
if (!dau) return api.sendMessage(`أرجوك قم بإدخال الصيغة الصحيحة: عمري + يوم/شهر/سنة تاريخ الإزدياد`,event.threadID,event.messageID);
else {
	const axios = require('axios');
	const moment = require("moment-timezone");
	var hientai = moment.tz("Aftica/Casablanca").format("DD/MM/YYYY");
	var time = `${dau}`;
	axios.get(`https://le31.glitch.me/other/date-calculator?first=${time}&second=${hientai}`).then(res => {
     var nam = res.data.years;
     var thang = res.data.months;
     var tuan = res.data.weeks;
     var ngay = res.data.days;
     var gio = res.data.hours;
     var phut = res.data.minutes;
     var giay = res.data.seconds;
     return api.sendMessage(`📆 تاريخ الإزدياد: ${dau}\n\n⏱ عدد السنوات التي مرت: ${nam} سنة \n\n⏱ عدد الأشهر التي مرت: ${thang} شهر \n\n⏱ عدد الاسابيع اجتاز: ${tuan} أسبوع \n\n⏱ عدد الأيام التي مرت: ${ngay} يوم \n\n⏱ عدد الساعات التي مرت: ${gio} ساعة \n\n⏱ عدد الدقائق التي مرت: ${phut} دقيقة \n\n⏱ عدد الثواني التي مرت: ${giay} ثانية `,event.threadID,event.messageID);
	});
}
                                 }
    