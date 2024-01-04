module.exports.config = {
	name: "عمري",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Khoa",
	description: "قم بحساب عمرك",
	commandCategory: "خدمات",
	usages: "[التاريخ ل تاريخ الإزدياد]",
	cooldowns: 0
};

module.exports.run = async function ({ event, args, api }) {
  const threadSetting = global.data.threadData.get(event.threadID) || {};
  var prefix = threadSetting.PREFIX || global.config.PREFIX;
  var input = args[0];
  if (!input) return api.sendMessage(`أىجوك قم بإدخالها بالصيغة التالية ${prefix}عمري [يوك/شهر/سنة من تاريخ الإزدياد]`,event.threadID,event.messageID);
  var cc = input.split("/");
  var ngay1 = parseInt(cc[0]);
  if (!ngay1 || isNaN(ngay1) || ngay1 > 31 || ngay1 < 1) return api.sendMessage("تاريخ ميلاد غير صالح!",event.threadID,event.messageID);
  var thang1 = parseInt(cc[1]);
  if (!thang1 || isNaN(thang1) || thang1 > 12 || thang1 < 1) return api.sendMessage("شهر ميلاد غير صالح!",event.threadID,event.messageID);
  var nam1 = parseInt(cc[2]);
  if (!nam1) return api.sendMessage("سنة الميلاد غير صالحة!",event.threadID,event.messageID);
  const moment = require("moment-timezone");
  var hientai = moment.tz("Aftica/Casablanca").format("DD/MM/YYYY HH:mm:ss");
  var concac = `${hientai}`;
  var djtme = concac.split(" ");
  var dm = djtme[0].split("/");
  var ngay2 = parseInt(dm[0]);
  var thang2 = parseInt(dm[1]);
  var nam2 = parseInt(dm[2]);
  var ngay3 = ngay2 - ngay1;
  var thang3 = thang2 - thang1;
  var nam3 = nam2 - nam1;
  var duma = djtme[1].split(":");
  var hh = parseInt(duma[0]);
  var mm = parseInt(duma[1]);
  var ss = parseInt(duma[2]);
  var nam = nam3 + Math.round(thang3/12 * 100)/100;
  var xthang = nam*12 + thang3 + ngay1/31;
  var thang = Math.round(xthang * 100)/100;
  var dcm = thang/36;
  var tuan = Math.round(thang*4 * 100)/100;
  var xngay = (xthang*31 + xthang*30)/2 - dcm*3/2 + ngay3 + hh/24;
  var wtf = (xthang*31 + xthang*30)/2 - dcm*3/2 + ngay3;
  var ngay = Math.round(xngay * 100)/100;
  var gio = Math.round((wtf*24 + hh) * 100)/100;
  var xphut = gio*60 + mm + ss/60;
  var phut = Math.round(xphut * 100)/100;
  var giay = Math.round((phut*60 + ss)* 100)/100;
  // Nỗ não :>
  return api.sendMessage(`-تاريخ الميلاد: ${input}\n\n-عدد السنوات التي مرت: ${nam} سنة \n-عدد الأشهر التي مضت: ${thang} شهر \n-عدد الأسابيع التي مرت: ${tuan} أسبوع \n-عدد الأيام التي مرت: ${ngay} يوم \n-عدد الساعات التي مرت: ${gio} ساعة \n-عدد الدقائق التي مرت: ${phut} دقيقة \n-عدد الثواني التي مرت: ${giay} ثانية `,event.threadID,event.messageID);
    }