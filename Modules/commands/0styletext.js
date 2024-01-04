module.exports.config = {
  name: "زخرفة",
  version: "1.0.1",
  hasPermission: 0,
  credits: "Andrey",
  description: "زخرفة عربية",
  commandCategory: "خدمات",
  usages: "أ، ب، ت، ث، ج، ح، خ، د، ذ، ر، ز، س، ش، ص، ،ض، ط، ظ، ع، غ، ف، ق، ك، ل، م، ن، هـ، و، ي",
  cooldowns: 5
};

module.exports.run = async ({ event, api, args }) => {
  const text = args.join("").toLowerCase()
    .replace(/\./g, "")
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|أ/g, "أ")
    .replace(/ب/g, "ب")
    .replace(/ت/g, "تہ")
    .replace(/ث|đ/g, "جہ")
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|ج/g, "𝐄")
    .replace(/ح/g, "حہ")
    .replace(/خ/g, "خہ")
    .replace(/د/g, "د")
    .replace(/ذ/g, "ذ")
    .replace(/ì|í|ị|ỉ|ĩ|ر/g, "ر")
    .replace(/ز/g, "ز")
    .replace(/س/g, "سہ")
    .replace(/ش/g, "شہ")
    .replace(/ص/g, "ص")
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|ض/g, "ض")
    .replace(/ط/g, "طہ")
    .replace(/ظ/g, "ظ")
    .replace(/ع/g, "عہ")
    .replace(/غ/g, "غہ")
    .replace(/ف/g, "فہ")
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|ق/g, "ق")
    .replace(/ك/g, "كہ")
    .replace(/ل/g, "لہ")
    .replace(/ỳ|ý|ỵ|ỷ|ỹ|م/g, "م")
    .replace(/ن/g, "ن")
    .replace(/ه/g, "هـ")
    .replace(/و/g, "و")
    .replace(/ي/g, "يہ")
    .replace(/أ/g, "أ")
    .replace(/ب/g, "ب")
    .replace(/تہ/g, "تہ")
    .replace(/جہ/g, "جہ")
    .replace(/𝐄/g, "𝐄")
    .replace(/حہ/g, "حہ")
    .replace(/خہ/g, "خہ")
    .replace(/ر/g, "ر")
    .replace(/ز/g, "ز")
    .replace(/سہ/g, "سہ")
    .replace(/شہ/g, "شہ")
    .replace(/ص/g, "ص")
    .replace(/ض/g, "ض")
    .replace(/طہ/g, "طہ")
    .replace(/ظ/g, "ظ")
    .replace(/عہ/g, "عہ")
    .replace(/غہ/g, "غہ")
    .replace(/فہ/g, "فہ")
    .replace(/ق/g, "ق")
    .replace(/كہ/g, "كہ")
    .replace(/لہ/g, "لہ")
    .replace(/م/g, "م")
    .replace(/ن/g, "ن")
    .replace(/هـ/g, "هـ")
    .replace(/و/g, "و")
    .replace(/يہ/g, "يہ")
    .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");

  const arr = text.replace("\n", "").split("\n").filter(item => item.length !== 0);
  const num = (arr.length / 6) - 1;
  const main = arr.slice(0, 6);
  const extra = arr.splice(6);
  let msg = "";
  const mainlength = main.length;

  for (let i = 0; i < mainlength; i++) {
    let txt = main[i];
    for (let o = 0; o < num; o++) {
      txt += extra[i + (o * 6)];
    }
    msg += txt + "\n";
  }

  return api.sendMessage(msg + "\n", event.threadID, event.messageID);
};
