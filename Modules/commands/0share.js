const axios = require("axios");
const fs = require("fs").promises;
const { PasteClient } = require("pastebin-api");

const axiosClient = axios.create();
axiosClient.defaults.timeout = 10000;

module.exports.config = {
  name: "مشاركة",
  version: "2.6",
  hasPermission: 0,
  credits: "Arjhil",
  description: "( قم بمشاركة ملف )",
  usePrefix: true,
  commandCategory: "المالك",
  usages: "( قم بمشاركة ملف في الخاص )",
  cooldowns: 0,
  dependencies: {
    "pastebin-api": "",
    cheerio: "",
    request: "",
  },
};

module.exports.run = async function ({ api, event, args }) {
  const permission = ["61552791186880", ""];
  if (!permission.includes(event.senderID)) {
    return api.sendMessage(
      "‼️ آسفة لكنك لست حسين 🥺..",
      event.threadID,
      event.messageID
    );
  }

  const picture = (
    await axios.get(
      "https://drive.google.com/uc?export=download&id=1rKtZI_KT-vT_DvDRDhhdtZ-nCEGWbx2U",
      { responseType: "stream" }
    )
  ).data;

  const hmm = moment().tz("Africa/Casablanca").format("DD/MM/YYYY || HH:mm:ss");
  const { senderID, threadID, messageID, messageReply, type } = event;
  const name = args[0];

  let uid, text;

  if (type === "message_reply") {
    text = messageReply.body;
    uid = event.messageReply.senderID;
  } else {
    uid = event.senderID;
  }

  if (!text && !name) {
    return api.sendMessage(
      { body: `الوقت: ${hmm} `, attachment: picture },
      threadID,
      messageID
    );
  }

  try {
    const filePath = `./modules/commands/${args[0]}.js`;
    const data = await fs.readFile(filePath, "utf-8");

    const client = new PasteClient("R02n6-lNPJqKQCd5VtL4bKPjuK6ARhHb");

    async function createPaste(name) {
      const url = await client.createPaste({
        code: data,
        expireDate: "N",
        format: "javascript",
        name: name,
        publicity: 1,
      });

      const id = url.split("/")[3];
      return "https://pastebin.com/raw/" + id;
    }

    const link = await createPaste(args[1] || "noname");

    const threadInfo = await api.getThreadInfo(event.threadID);
    const groupName = threadInfo.name;
    const senderName = global.data.userName.get(event.senderID);

    api.sendMessage(
      `➤ مشاركة ملف\n\nإيم المجموعة: ${groupName}\nالوقت: ${hmm}\nإسم الملف: ${args.join(
        " "
      )}\nتم إرساله من طرف: ${senderName} `,
      threadID,
      messageID
    );

    api.sendMessage(
      {
        body: `➤ مشاركة ملف\n\nالوقت: ${hmm}\nرابط الملف: ${link}\nإسم الملف: ${args[0]}\nإسم المجموعة: ${groupName}\nتكت المشاركة من كرف: ${senderName}`,
        attachment: picture,
      },
      uid
    );
  } catch (error) {
    console.error(error);
    api.sendMessage(
      {
        body: `Error occurred: ${error.message}`,
        attachment: picture,
      },
      threadID,
      messageID
    );
  }
};
