module.exports.config = {
	name: "معلومات_أنمي",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Mr.Aik3ro",
	description: "البحث عن أنمي في قائمة الأنمي الخاصة بي",
	commandCategory: "أنمي",
	usages: "[إسم الأنمي]",
	cooldowns: 5
};


module.exports.run = async ({ api, event }) => {
	const axios = require("axios");
    const Scraper = require('mal-scraper');
	const request = require('request');
	const fs = require("fs");

let input = event.body;

  var query = input;     query = input.substring(5)
let data = input.split(" ");
  
    let Replaced = query.replace(/ /g, " ");
  api.sendMessage(`🔎 | جاري البحث  "${Replaced}"...`, event.threadID, event.messageID);

const Anime = await Scraper.getInfoFromName(Replaced)
 .catch(err => {
                     api.sendMessage("⚠️" + err, event.threadID, event.messageID);
           }); 
    
   console.log(Anime)                
    let getURL = Anime.picture;

    let ext = getURL.substring(getURL.lastIndexOf(".") + 1);
    
       if (!Anime.genres[0] || Anime.genres[0] === null) Anime.genres[0] = "None";

    var title = Anime.title;
var japTitle = Anime.japaneseTitle
var type = Anime.type;
var status = Anime.status;
var premiered = Anime.premiered;
var broadcast = Anime.broadcast;
var aired = Anime.aired;
var producers = Anime.producers;
var studios = Anime.studios;
var source = Anime.source;
var episodes = Anime.episodes;
var duration = Anime.duration;
var genres = Anime.genres.join(", ");    
var popularity = Anime.popularity;
var ranked = Anime.ranked;
var score = Anime.score;    
var rating = Anime.rating;
var url = Anime.url;  
var endD = Anime.end_date;

    
        let callback = function () {           
 api.sendMessage({
     body:`العنوان: ${title}\nباليابانية: ${japTitle}\nالنوع: ${type}\nStatus: ${status}\nالعرض الأول: ${premiered}\nإذاعة: ${broadcast}\nتم بثها: ${aired}\nالمنتجين: ${producers}\nالأوستوديو: ${studios}\nالمصدر: ${source}\nالحلقات: ${episodes}\nالمدة: ${duration}\nالنوع: ${genres}\nالشعبية: ${popularity}\nالتصنيف: ${ranked}\n: ${score}\nالتقييم: ${rating}\nالرابط: ${url}`, 
					attachment: fs.createReadStream(__dirname + `/cache/mal.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/mal.${ext}`), event.messageID)
				}
    
 //   }
        request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/mal.${ext}`)).on("close", callback)           
}		


  