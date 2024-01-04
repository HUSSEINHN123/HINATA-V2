const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "معلومات_فلم",
  version: "1.0.0",
  hasPermission: 0,
  credits: "August Quinn",
  description: "قم بالحصول على معلومات جول فلم معين",
  usages: "معلومات_فلم [العنوان]",
  commandCategory: "خدمات",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const apiKey = "db4f9cfb";
  const youtubeApiKey = "AIzaSyBkeljYcuoBOHfx523FH2AEENlciKnm3jM";
  const title = args.join(" ");

  if (!title) {
    api.sendMessage("أرجوك قم بإدخال إسم الفلم.", event.threadID, event.messageID);
    return;
  }

  const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const movieData = response.data;

    if (movieData.Response === "False") {
      api.sendMessage("لم يتم العثور على الفلم .", event.threadID, event.messageID);
      return;
    }

    const title = movieData.Title;
    const year = movieData.Year;
    const cast = movieData.Actors;
    const plot = movieData.Plot;
    const ratings = movieData.Ratings.map(rating => `${rating.Source}: ${rating.Value}`).join("\n");
    const posterUrl = movieData.Poster;

    let path = __dirname + "/cache/movie_poster.jpg";
    let hasError = false;

    try {
      let imageResponse = await axios.get(posterUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(path, Buffer.from(imageResponse.data, "binary"));
    } catch (error) {
      console.log(error);
      hasError = true;
    }

    const trailerUrl = await getMovieTrailer(title, youtubeApiKey);
    const movieInfo = `
🎬 معلومات حول الفلم "${title}" (${year}):

🎭 كاست: ${cast}
📖 حبكة: ${plot}
📊 التقييمات:\n${ratings}
🎥 ترايلر: ${trailerUrl} 
🖼️رابط صورة الفلم : ${posterUrl}
`;

    if (!hasError) {
      api.sendMessage({
        body: movieInfo,
        attachment: fs.createReadStream(path)
      }, event.threadID, async () => {
        fs.unlinkSync(path);
        try {
          const trailerVideoBuffer = await getTrailerVideo(trailerUrl);
          api.sendMessage({
            body: "فيديو الترايلر:",
            attachment: fs.createReadStream(trailerVideoBuffer.path)
          }, event.threadID, () => {
            fs.unlinkSync(trailerVideoBuffer.path);
          });
        } catch (error) {
          console.error(error);
          api.sendMessage("فشل جلب الفيديو الدعائي.", event.threadID);
        }
      });
    } else {
      api.sendMessage(movieInfo, event.threadID, event.messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("حدث خطأ أثناء جلب معلومات الفيلم.", event.threadID, event.messageID);
  }
};

async function getMovieTrailer(movieTitle, apiKey) {
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(
    `${movieTitle} official trailer`
  )}&key=${apiKey}&maxResults=1&type=video`;

  try {
    const response = await axios.get(searchUrl);
    const videoId = response.data.items[0].id.videoId;
    const trailerUrl = `https://www.youtube.com/watch?v=${videoId}`;
    return trailerUrl;
  } catch (error) {
    console.error(error);
    return "لم يتم العثور على الترايلر.";
  }
}

async function getTrailerVideo(trailerUrl) {
  const path = __dirname + "/cache/trailer_video.mp4";
  const response = await axios.get(trailerUrl, { responseType: "arraybuffer" });
  fs.writeFileSync(path, Buffer.from(response.data, "binary"));
  return { path };
        }
      