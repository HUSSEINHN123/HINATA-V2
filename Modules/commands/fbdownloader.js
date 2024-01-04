const axios = require("axios");

module.exports.config = {
  name: 'فيسبوك_فيديو',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'kira',// palitan mo nalang kasi nigga ka.
  usePrefix: false,
  description: 'قم بتحميل فيديوهات فيسبوك عن طريق الروابط',
  commandCategory: 'خدمات',
  usages: 'فيسبوك_فيديو [رابط فيسبوك]',
  cooldowns: 3,
};

module.exports.run = async function ({ api, args, event }) {
  if (!args[0]) {
    return api.sendMessage(" ⚠️ |رابط ضائع", event.threadID);
  }

  try {
    const videoUrl = args[0];


    const apiUrl = `https://alln1.gay-api.repl.co/api/fbdl?url=${encodeURIComponent(videoUrl)}`;


    api.sendMessage('.⏱️ | جاري التنزيل يرجى الإنتظار...', event.threadID);


    const response = await axios.get(apiUrl, { responseType: 'stream' });

    // Check if the response status is OK (200)
    if (response.status === 200) {
      const videoStream = response.data;


      api.sendMessage(
        {
          attachment: videoStream,
        },
        event.threadID
      );
    } else {
      api.sendMessage("Error downloading video.", event.threadID);
    }
  } catch (error) {
    console.error('Error downloading video:', error.message);
    api.sendMessage(" ❌ |حدث خطأ أثناء تنزيل الفيديو.", event.threadID);
  }
};