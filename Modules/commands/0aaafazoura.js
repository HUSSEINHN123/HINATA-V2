const sendRiddle = (api, threadID, question) => {
  api.sendMessage(`حزورة: ${question}`, threadID);
};

const sendCorrectAnswer = async (api, threadID, messageID) => {
  try {
    await api.sendMessage('✅ | أحسنت، الإجابة صحيحة!', threadID);
    await api.setMessageReaction('✅', messageID);
  } catch (err) {
    console.error('Error sending correct answer:', err);
  }
};

const sendIncorrectAnswer = async (api, threadID, attempts, maxAttempts, correctAnswer, messageID) => {
  try {
    if (attempts >= maxAttempts) {
      await api.sendMessage(`❌ | للأسف، لقد فشلت في الإجابة بعد ${maxAttempts} محاولات. الإجابة الصحيحة هي: ${correctAnswer}`, threadID);
      await api.setMessageReaction('❌', messageID);
    } else {
      await api.sendMessage('❌ | الإجابة غير صحيحة. يمكنك المحاولة مرة أخرى.', threadID);
    }
  } catch (err) {
    console.error('Error sending incorrect answer:', err);
  }
};

module.exports.config = {
  name: 'فزورة',
  version: '1.1.0',
  hasPermission: 0,
  credits: 'Yamada KJ and HUSSEIN YACOUBI',
  description: 'يقوم البوت بإرسال حزورة من القائمة المحلية ويتيح للمستخدم الإجابة.',
  commandCategory: 'التسلية',
  usePrefix: true,
  cooldowns: 5
};

module.exports.run = ({ api, event, args, client }) => {
  const { threadID, senderID } = event;

  const riddles = [
    { question: 'ما هو الشيء الذي يأتي إلى الماء بينما لا يستطيع السباحة؟', answer: 'الماء' },
    { question: 'ما هو الشيء الذي يلتقط باليدين ولكن لا يمكن رميه باليدين؟', answer: 'الصورة' },
    { question: 'ما هو الشيء الذي يوجد في اللحظة التي قلبها مكسور؟', answer: 'البيضة' },
    { question: 'ما هو الشيء الذي يمشي بأربعة أرجل في الصباح، باثنين في الظهيرة، وثلاثة في المساء؟', answer: 'الإنسان' },
    { question: 'ما هو الشيء الذي يتحرك دون أن يتحرك؟', answer: 'الساعة' },
  ];

  const randomRiddle = riddles[Math.floor(Math.random() * riddles.length)];

  let attempts = 0;
  const correctAnswer = randomRiddle.answer;

  sendRiddle(api, threadID, randomRiddle.question);

  const messageListener = (message) => {
    if (message.threadID === threadID && message.senderID === senderID) {
      attempts++;

      if (message.body.toLowerCase() === correctAnswer.toLowerCase()) {
        sendCorrectAnswer(api, threadID, message.messageID);
        client.removeListener('onMessage', messageListener);
      } else {
        if (attempts >= 3) {
          sendIncorrectAnswer(api, threadID, attempts, 3, correctAnswer, message.messageID);
          client.removeListener('onMessage', messageListener);
        } else {
          api.sendMessage('❌ | الإجابة غير صحيحة. يمكنك المحاولة مرة أخرى.', threadID);
        }
      }
    }
  };

  client.onMessage(messageListener);
};
