module.exports.config = {
  name: "adminNoti",
  eventType: [
    "log:thread-admins",
    "log:thread-name",
    "log:user-nickname",
    "log:thread-call",
    "log:thread-icon",
    "log:thread-color",
    "log:link-status",
    "log:magic-words",
    "log:thread-approval-mode",
    "log:thread-poll"
  ],
  version: "1.0.1",
  credits: "Mirai Team & mod by Yan Maglinte",
  description: "Group Information Update",
  envConfig: {
    autoUnsend: true,
    sendNoti: true,
    timeToUnsend: 10
  }
};

module.exports.run = async function({ event, api, Threads, Users }) {
  const { author, threadID, logMessageType, logMessageData, logMessageBody } = event;
  const { setData, getData } = Threads;
  const fs = require("fs");
  const iconPath = __dirname + "/cache/emoji.json";
  if (!fs.existsSync(iconPath)) fs.writeFileSync(iconPath, JSON.stringify({}));
  if (author === threadID) return;

  try {
    let dataThread = (await getData(threadID)).threadInfo;

    switch (logMessageType) {
      case "log:thread-admins": {
        if (logMessageData.ADMIN_EVENT === "add_admin") {
          dataThread.adminIDs.push({ id: logMessageData.TARGET_ID });
          api.sendMessage(`[ 💮تحديثات على مستوى المجموعة💮 ]\n❯ 💮تحديثات المستخدم💮 ${Users.getNameUser(logMessageData.TARGET_ID)} قد أصبح مسؤولا في المجموعة`, threadID);
        } else if (logMessageData.ADMIN_EVENT === "remove_admin") {
          dataThread.adminIDs = dataThread.adminIDs.filter(item => item.id !== logMessageData.TARGET_ID);
          api.sendMessage(`[ 💮تحديثات على مستوى المجموعة💮 ]\n❯ تمت إزالة منصب المجموعة بالنسبة لآيدي المستخدم : ${logMessageData.TARGET_ID}`, threadID);
        }
        break;
      }
      case "log:user-nickname": {
        const { participant_id, nickname } = logMessageData;
        if (participant_id && nickname) {
          dataThread.nicknames = dataThread.nicknames || {};
          dataThread.nicknames[participant_id] = nickname;
          const participantName = await Users.getNameUser(participant_id);
          const formattedNickname = nickname || "تم حذف اللقب";
          api.sendMessage(`[ 💮تحديثات على مستوى المجموعة💮 ]\n❯ تم التحديث اللقب من ${participantName} إلى: ${formattedNickname}.`, threadID);
        }
        break;
      }
      case "log:thread-name": {
        dataThread.threadName = logMessageData.name || null;
        api.sendMessage(`[ 💮تحديثات المجموعة💮 ]\n❯ ${(dataThread.threadName) ? `تم تغيير إسم المجموعة إلى: ${dataThread.threadName}` : 'تم حذف إسم المجموعة'}.`, threadID);
        break;
      }
      case "log:thread-icon": {
        const preIcon = JSON.parse(fs.readFileSync(iconPath));
        dataThread.threadIcon = logMessageData.thread_icon || "👍";
        if (global.configModule[this.config.name].sendNoti) {
          api.sendMessage(`[ 💮تحديثات على مستوى المجموعات 💮 ]\n❯ ${logMessageBody.replace("إيموجي", "إيقونة")}\n❯ الإيموجي الإصلي: ${preIcon[threadID] || "غير معروف"}`, threadID, async (error, info) => {
            preIcon[threadID] = dataThread.threadIcon;
            fs.writeFileSync(iconPath, JSON.stringify(preIcon));
            if (global.configModule[this.config.name].autoUnsend) {
              await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
              return api.unsendMessage(info.messageID);
            }
          });
        }
        break;
      }
      case "log:thread-call": {
        if (logMessageData.event === "group_call_started") {
          const name = await Users.getNameUser(logMessageData.caller_id);
          api.sendMessage(`[ 💮تحديثات على مستوى المجموعة💮 ]\n❯ ${name} تم بدأ ${(logMessageData.video) ? 'فيديو ' : ''}إتصال.`, threadID);
        } else if (logMessageData.event === "group_call_ended") {
          const callDuration = logMessageData.call_duration;
          const hours = Math.floor(callDuration / 3600);
          const minutes = Math.floor((callDuration - (hours * 3600)) / 60);
          const seconds = callDuration - (hours * 3600) - (minutes * 60);
          const timeFormat = `${hours}:${minutes}:${seconds}`;
          api.sendMessage(`[ 💮تحديثات على مستوى المجموعة💮 ]\n❯ ${(logMessageData.video) ? 'فيديو' : ''} الإتصال قد إنتهى.\n❯ مدة المكالمة: ${timeFormat}`, threadID);
        } else if (logMessageData.joining_user) {
          const name = await Users.getNameUser(logMessageData.joining_user);
          api.sendMessage(`❯ [ 💮تحديثات على مستوى المجموعة💮 ]\n❯ ${name} قد إنضم ${(logMessageData.group_call_type == '1') ? 'فيديو' : ''} إتصال.`, threadID);
        }
        break;
      }
      case "log:link-status": {
        api.sendMessage(logMessageBody, threadID);
        break;
      }
      case "log:magic-words": {
        api.sendMessage(`» [ 💮تحديثات على مستوى المجموعة💮 ] Theme ${logMessageData.magic_word} تم إضافة تأثير: ${logMessageData.theme_name}\nالإيموجي: ${logMessageData.emoji_effect || "لا إيموجي "}\nالمجموع ${logMessageData.new_magic_word_count} الكلمة المؤثرة`, threadID)
        break;
      }
      case "log:thread-poll": {
        const obj = JSON.parse(logMessageData.question_json);
        if (logMessageData.event_type === "question_creation" || logMessageData.event_type === "update_vote") {
          api.sendMessage(logMessageBody, threadID);
        }
        break;
      }
      case "log:thread-approval-mode": {
        api.sendMessage(logMessageBody, threadID);
        break;
      }
      case "log:thread-color": {
        dataThread.threadColor = logMessageData.thread_color || "🌤";
        if (global.configModule[this.config.name].sendNoti) {
          api.sendMessage(`[ 💮تحديثات على مستوى المجموعة💮 ]\n❯ ${logMessageBody.replace("السمة", "اللون")}`, threadID, async (error, info) => {
            if (global.configModule[this.config.name].autoUnsend) {
              await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
              return api.unsendMessage(info.messageID);
            }
          });
        }
        break;
      }
    }

    await setData(threadID, { threadInfo: dataThread });
  } catch (error) {
    console.log(error);
  }
};