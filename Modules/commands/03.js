             const rankElements = [
               { name: 'رتبة المبتدئ', strength: 10, level: 1, experiencePoints: 0 },
               { name: 'رتبة محترف', strength: 15, level: 2, experiencePoints: 100 },
               { name: 'رتبة خبير', strength: 20, level: 3, experiencePoints: 300 },
               // Add more ranks as needed
             ];

             const userElements = {};

             const botOwnerId = '100076269693499'; // ضع الآيدي الخاص بمسؤول البوت هنا

             module.exports.config = {
               name: 'عناصر_الطبيعة',
               version: '1.0.0',
               hasPermission: 0,
               credits: 'Hussein',
               description: 'يسمح لك برؤية عناصر الطبيعة وتطويرها.',
               commandCategory: 'الألعاب',
               usePrefix: true,
               cooldowns: 10,
             };

             module.exports.run = ({ api, event, args, Users }) => {
               const { threadID, senderID } = event;

               if (!userElements[senderID]) {
                 userElements[senderID] = { experiencePoints: 0 };
               }

               const getUserElement = () => userElements[senderID];
               const setUserElement = (element) => userElements[senderID] = element;

               const displayElements = () => {
                 const userRank = getUserRank();

                 let message = `عناصر الطبيعة:\n`;
                 rankElements.forEach(rank => {
                   message += `${rank.name} (المستوى: ${rank.level}, القوة: ${rank.strength}, نقاط الخبرة المطلوبة: ${rank.experiencePoints})\n`;
                 });

                 message += `\nرتبتك الحالية: ${userRank.name || 'ليس لديك رتبة حاليًا'}`;

                 api.sendMessage(message, threadID);
               };

               const upgradeElement = () => {
                 const userElement = getUserElement();
                 const userRank = getUserRank();

                 if (userElement.level >= userRank.level) {
                   return api.sendMessage(`لا يمكن تطوير العنصر بعد مستوى ${userRank.level}.`, threadID);
                 }

                 const upgradeCost = userElement.level * 100; // تكلفة التطوير

                 if (Users.getMoney(senderID) < upgradeCost) {
                   return api.sendMessage(`لا يوجد لديك الأموال الكافية، تكلفة التطوير: ${upgradeCost} نقطة.`, threadID);
                 }

                 // قم بتطوير العنصر
                 Users.subtractMoney(senderID, upgradeCost);
                 userElement.level += 1;
                 userElement.strength += 5;
                 userElement.experiencePoints += 50; // تزيد نقاط الخبرة بعد كل تطوير

                 // حفظ العنصر المطور في قاعدة البيانات أو الذاكرة المؤقتة
                 setUserElement(userElement);

                 // Grant a reward based on the user's rank
                 const rewardPoints = userRank.level * 50; // Adjust reward calculation as needed
                 Users.addMoney(senderID, rewardPoints);

                 api.sendMessage(`تم تطوير ${userRank.name} بنجاح! المستوى الجديد: ${userElement.level}, القوة الجديدة: ${userElement.strength}\nتمنح لك مكافأة: ${rewardPoints} نقطة.`, threadID);
               };

               const getUserRank = () => {
                 const userExperiencePoints = userElements[senderID]?.experiencePoints || 0;
                 return rankElements.find(rank => userExperiencePoints >= rank.experiencePoints) || rankElements[0];
               };

               const selectElement = () => {
                 const elementName = args[0]?.toLowerCase();

                 if (senderID === botOwnerId && elementName === 'النار') {
                   setUserElement({ name: 'النار 🔥', strength: 15, level: 1, experiencePoints: 0 });
                   api.sendMessage(`تم اختيار النار! العنصر الخاص بالمطور.`, threadID);
                 } else {
                   const selectedRank = rankElements.find(rank => rank.name.toLowerCase() === elementName);

                   if (!selectedRank) {
                     return api.sendMessage('الرتبة المحددة غير صالحة.', threadID);
                   }

                   setUserElement({ name: selectedRank.name, strength: selectedRank.strength, level: 1, experiencePoints: 0 });
                   api.sendMessage(`تم اختيار ${selectedRank.name} بنجاح!`, threadID);
                 }
               };

               // Handle command
               const command = args[0]?.toLowerCase();
               switch (command) {
                 case 'عرض':
                   displayElements();
                   break;
                 case 'تطوير':
                   upgradeElement();
                   break;
                 case 'إختيار':
                   selectElement();
                   break;
                 default:
                   api.sendMessage('اختر  من الأوامر المتوفرة [عرض] ,[إختيار] ,[عرض]', threadID);
                   break;
               }
             };
