module.exports.config = {
  name: "بوكيمون",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "D-Jukie",
  description: "عرض معلومات أي بوكيمون",
  commandCategory: "لعبة",
  usages: "[إسم البوكيمون]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const axios = global.nodemodule['axios'];

  const namePoke = args.join(" ");
  if (!namePoke) return api.sendMessage('⚠️ | يرجى إدخال اسم البوكيمون!', event.threadID, event.messageID);

  try {
    const res = await axios.get(`https://some-random-api.ml/pokedex?pokemon=${namePoke}`);
    const data = res.data;
    const stt = data.stats;

    return axios(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q=${data.description}`))
      .then(response => {
        const retrieve = response.data[0];
        let text = '';

        retrieve.forEach(item => (item[0]) ? text += item[0] : '');

        const fromLang = (retrieve[2] === retrieve[8][0][0]) ? retrieve[2] : retrieve[8][0][0];

        api.sendMessage(`
» الإسم: ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}
» النوع: ${data.type}
» الجيل: ${data.generation}
» صِنف: ${data.species.join(', ')}
» مجموعة البيضة: ${data.egg_groups.join(', ')}
» القدرة: ${data.abilities.join(', ')}
» الطول: ${data.height}
» الوزن: ${data.weight}
» الصحة ${stt.hp}, الهجوم: ${stt.attack}, دفاع: ${stt.defense}, السرعة: ${stt.speed}
» خط تطور العائلة مع الزمن: ${data.family.evolutionLine.join(' => ')}
» الوصف: ${text}`, event.threadID, event.messageID);
      })
      .catch(() => api.sendMessage('🚫 | حدث خطأ أثناء جلب معلومات حول هذا البوكيمون!', event.threadID, event.messageID));
  } catch {
    return api.sendMessage('🚫 | حدث خطأ أثناء جلب معلومات حول هذا البوكيمون!', event.threadID, event.messageID);
  }
};
