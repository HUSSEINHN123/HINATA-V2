module.exports.config = {
  name: "ألوان",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "BerVer",
  description: "تغيير محادثة اللون بشكل مستمر حسب الرقم",
  commandCategory: "النظام",
  usages: "قوس_قزح [تغيير]",
  cooldowns: 0,
  dependencies: []
};

module.exports.run = async({
  api,
  event,
  args,
  client,
  __GLOBAL
})=> {
  var value = args.join();
  if (isNaN(value)) return api.sendMessage(`ليس رقما`, event.threadID, event.messageID);
  if (value > 10000) return api.sendMessage(`يجب أن بكون أقل من ${'10000'}!`, event.threadID, event.messageID);
  var color = ['196241301102133', '169463077092846', '2442142322678320', '234137870477637', '980963458735625', '175615189761153', '2136751179887052', '2058653964378557', '2129984390566328', '174636906462322', '1928399724138152', '417639218648241', '930060997172551', '164535220883264', '370940413392601', '205488546921017', '809305022860427'];
  for (var i = 0; i < value; i++) {
    api.changeThreadColor(color[Math.floor(Math.random() * color.length)], event.threadID)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return;
}