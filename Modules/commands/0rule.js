module.exports.config = {
    name: "قاعدة",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Zia_Rein",
    description: "رؤبة قاعدة البوت",
    commandCategory: "النظام",
    usages: "قاعدة البوت",
    cooldowns: 5,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) => {
    const axios = global.nodemodule["axios"];
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
    var ZiaRein3 = (`قٌـ,ـاعٌـِـِِـِـڊة الُـِـِِـِِِـِِـِـبـٌـٌٌـٌٌٌـٌٌـٌوُتـٌـٌٌـ\nٵڔڃــﯟڪ ڦــم ۛ ּبــڦــڔائــۃ ۛ ּاڸــڦــﯜاﻋــد حــٿــۍ اڸــڼــﮪــاڀــۃ\n『 • 』  ﻻ ٺــڦــم بــحــذڤ ڔڛــائــڷ اڵــبــﯟټ\n『 • 』  ۛ ּﻻ ۖ ٺــڦــم ۛ ּبــإڔڛــاڵ إٻــمــﯣچــٻــاٺ ۛ ּو ̨ﻻڀــڪــاټ ۛ ּبــڜــڬــڶ ּڪــٽــﯧْــڔ ۖ و ۛ ּڛــڕٻــ؏ ۖ ذاڵــڪ ڀــبــطــٸ ̨اڶــبــۏټ ۗ\n____________________________\n اڶــڦــۄا؏ــد ۛ ּبــڛــﯧْــطــۃ ̨ڣــڦــٹ ۛ ּﻋــڶــڪ ۖ إحــٿــڔامــﮪــ̍ا و ̨ٺــطــبــٻــڦــﮪــ̍ا ۛ ּﻻ ̨ٺــحــذڧ ڔڛــٱئــڵ ּاڷــبــۄټ ۖ و ּٺــڔڛــڶ ڕڛــائــڶ بــڜــڭــڷ ۛ ּﻋــڜــﯟائــېْ ۛ ּﯟڛــڔٻــ؏ ۖ و إذ̍ا ٺــم ۛ ּحــڟــڔگ ̨ڦــم ּبــٱڷــٿــﯜاڝــڵ ۖ مــ؏ اڶــمــطــﯡڕ ۗ\n__________________________\nhttps://www.facebook.com/profile.php?id=61552791186880`);
   var ZiaRein = [
"https://i.imgur.com/huumLca.jpg",
"https://i.imgur.com/EcryTGh.jpg",
"https://i.imgur.com/tu12HrQ.jpg",
"https://i.imgur.com/Vx25FHG.jpg",
"https://i.imgur.com/NcbC8Pn.jpg",
    ];
    var ZiaRein2 = () => api.sendMessage({ body: ZiaRein3, attachment: fs.createReadStream(__dirname + "/cache/ZiaRein1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/ZiaRein1.jpg"), event.messageID);
    return request(encodeURI(ZiaRein[Math.floor(Math.random() * ZiaRein.length)])).pipe(fs.createWriteStream(__dirname + "/cache/ZiaRein1.jpg")).on("close", () => ZiaRein2());
};
  