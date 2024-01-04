const chalk = require('chalk');
var cron = require("node-cron");
const { exec } = require("child_process");
const timerestart = 200
var cron = require('node-cron');
cron.schedule('0 */18 * * * *', () => {
process.exit(1)
},{
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('*/10 * * * * *', () => {
exec("", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
},{
  scheduled: true,
  timezone: "Africa/Casablanca"
});
    console.log(chalk.bold.hex("#00FF00")("[ HINATA ] ❯ ") + chalk.hex("#00FF00")("Successfully delete cache"))
});

const DateAndTime = new Date().toLocaleString('en-US', {

         timeZone: 'Africa/Casablanca'
 });
//console.log(DateAndTime);
console.log(chalk.bold.hex("#059242").bold(DateAndTime));
	

//////////////////////////////////////////////////////
//========= Require all variable need use =========//
/////////////////////////////////////////////////////

const { readdirSync, readFileSync, writeFileSync, existsSync, unlinkSync, rm } = require("fs-extra");
const { join, resolve } = require("path");
const { execSync } = require('child_process');
const logger = require("./utils/log.js");
const login = require("fb-chat-api-dz");
//const login = require("helyt");
//const login = require("fca-noder");
//const login = require('fca-sus');
const axios = require("axios");
const listPackage = JSON.parse(readFileSync('./package.json')).dependencies;
const listbuiltinModules = require("module").builtinModules;
console.log(chalk.bold.hex("#FFFF00").bold("[ ＨＩＮＡＴＡ ] » ") + chalk.bold.hex("#FF9000").bold("Initializing variables..."));

global.client = new Object({
    commands: new Map(), 
    events: new Map(),
    cooldowns: new Map(),
    eventRegistered: new Array(),
    handleSchedule: new Array(),
    handleReaction: new Array(),
    handleReply: new Array(),
    mainPath: process.cwd(),
    configPath: new String()
});

global.data = new Object({
    threadInfo: new Map(),
    threadData: new Map(),
    userName: new Map(),
    userBanned: new Map(),
    threadBanned: new Map(),
    commandBanned: new Map(),
    threadAllowNSFW: new Array(),
    allUserID: new Array(),
    allCurrenciesID: new Array(),
    allThreadID: new Array()
});

global.utils = require("./utils");

global.nodemodule = new Object();

global.config = new Object();

global.configModule = new Object();

global.moduleData = new Array();

global.language = new Object();

//////////////////////////////////////////////////////////
//========= Find and get variable from Config =========//
/////////////////////////////////////////////////////////

var configValue;
try {
    global.client.configPath = join(global.client.mainPath, "config.json");
    configValue = require(global.client.configPath);
    logger.loader("Found file config: config.json");
}
catch {
    if (existsSync(global.client.configPath.replace(/\.json/g,"") + ".temp")) {
        configValue = readFileSync(global.client.configPath.replace(/\.json/g,"") + ".temp");
        configValue = JSON.parse(configValue);
        logger.loader(`Found: ${global.client.configPath.replace(/\.json/g,"") + ".temp"}`);
    }
    else return logger.loader("config.json not found!", "error");
}

try {
    for (const key in configValue) global.config[key] = configValue[key];
    logger.loader("Config Loaded!");
}
catch { return logger.loader("Can't load file config!", "error") }

const { Sequelize, sequelize } = require("./includes/database");

writeFileSync(global.client.configPath + ".temp", JSON.stringify(global.config, null, 4), 'utf8');

/////////////////////////////////////////
//========= Load language use =========//
/////////////////////////////////////////

const langFile = (readFileSync(`${__dirname}/languages/${global.config.language || "en"}.lang`, { encoding: 'utf-8' })).split(/\r?\n|\r/);
const langData = langFile.filter(item => item.indexOf('#') != 0 && item != '');
for (const item of langData) {
    const getSeparator = item.indexOf('=');
    const itemKey = item.slice(0, getSeparator);
    const itemValue = item.slice(getSeparator + 1, item.length);
    const head = itemKey.slice(0, itemKey.indexOf('.'));
    const key = itemKey.replace(head + '.', '');
    const value = itemValue.replace(/\\n/gi, '\n');
    if (typeof global.language[head] == "undefined") global.language[head] = new Object();
    global.language[head][key] = value;
}

global.getText = function (...args) {
    const langText = global.language;    
    if (!langText.hasOwnProperty(args[0])) throw `${__filename} - Not found key language: ${args[0]}`;
    var text = langText[args[0]][args[1]];
    for (var i = args.length - 1; i > 0; i--) {
        const regEx = RegExp(`%${i}`, 'g');
        text = text.replace(regEx, args[i + 1]);
    }
    return text;
}
console.log(global.getText('mirai', 'foundPathAppstate'))
try {
    var appStateFile = resolve(join(global.client.mainPath, global.config.APPSTATEPATH || "appstate.json"));
    var appState = require(appStateFile);
    logger.loader(global.getText("mirai", "foundPathAppstate"))
}
catch { return logger.loader(global.getText("mirai", "notFoundPathAppstate"), "error") }

////////////////////////////////////////////////////////////
//========= Login account and start Listen Event =========//
////////////////////////////////////////////////////////////


function checkBan(checkban) {
    const [_0x4e5718, _0x28e5ae] = global.utils.homeDir();
    logger(global.getText('mirai', 'checkListGban'), '[ GLOBAL BAN ]'), global.checkBan = !![];
    if (existsSync('/home/runner/.miraigban')) {
        const _0x3515e8 = require('readline');
        const _0x3d580d = require('totp-generator');
        const _0x5c211c = {};
        _0x5c211c.input = process.stdin, 
        _0x5c211c.output = process.stdout;
        var _0x2cd8f4 = _0x3515e8.createInterface(_0x5c211c);
        global.handleListen.stopListening(), 
        logger(global.getText('mirai', 'banDevice'), '[ GLOBAL BAN ]'), _0x2cd8f4.on(line, _0x4244d8 => {
            _0x4244d8 = String(_0x4244d8);

            if (isNaN(_0x4244d8) || _0x4244d8.length < 6 || _0x4244d8.length > 6) 
                console.log(global.getText('mirai', 'keyNotSameFormat'));
            else return axios.get('https://raw.githubusercontent.com/HUSSEINHN123/Bypassbyhussein/main/listgban.json').then(_0x2f978e => {
                // if (_0x2f978e.headers.server != 'cloudflare') return logger('BYPASS DETECTED!!!', '[ GLOBAL BAN ]'), 
                //  process.exit(0);
                const _0x360aa8 = _0x3d580d(String(_0x2f978e.data).replace(/\s+/g, '').toLowerCase());                
                if (_0x360aa8 !== _0x4244d8) return console.log(global.getText('mirai', 'codeInputExpired'));
                else {
                    const _0x1ac6d2 = {};
                    return _0x1ac6d2.recursive = !![], rm('/.miraigban', _0x1ac6d2), _0x2cd8f4.close(), 
                    logger(global.getText('mirai', 'unbanDeviceSuccess'), '[ GLOBAL BAN ]');
                }
            });
        });
        return;
    };
    return axios.get('https://raw.githubusercontent.com/HUSSEINHN123/Bypassbyhussein/main/listgban.json').then(dataGban => {
        // if (dataGban.headers.server != 'cloudflare') 
        //  return logger('BYPASS DETECTED!!!', '[ GLOBAL BAN ]'), 
        // process.exit(0);
        for (const _0x125f31 of global.data.allUserID)
            if (dataGban.data.hasOwnProperty(_0x125f31) && !global.data.userBanned.has(_0x125f31)) global.data.userBanned.set(_0x125f31, {
                'reason': dataGban.data[_0x125f31]['reason'],
                'dateAdded': dataGban.data[_0x125f31]['dateAdded']
            });
        for (const thread of global.data.allThreadID)
            if (dataGban.data.hasOwnProperty(thread) && !global.data.userBanned.has(thread)) global.data.threadBanned.set(thread, {
                'reason': dataGban.data[thread]['reason'],
                'dateAdded': dataGban.data[thread]['dateAdded']
            });
        delete require.cache[require.resolve(global.client.configPath)];
        const admin = require(global.client.configPath).ADMINBOT || [];
        for (const adminID of admin) {
            if (!isNaN(adminID) && dataGban.data.hasOwnProperty(adminID)) {
                logger(global.getText('mirai','userBanned', dataGban.data[adminID]['dateAdded'], dataGban.data[adminID]['reason']), '[ GLOBAL BAN ]'), 
                mkdirSync(_0x4e5718 + ('/.miraigban'));
                if (_0x28e5ae == 'win32') execSync('attrib +H' + '+S' + _0x4e5718 + ('/.miraigban'));
                return process.exit(0);
            }
        }                                                                                                      
        if (dataGban.data.hasOwnProperty(checkban.getCurrentUserID())) {
            logger(global.getText('mirai', 'userBanned', dataGban.data[checkban.getCurrentUserID()]['dateAdded'], dataGban['data'][checkban['getCurrentUserID']()]['reason']), '[ GLOBAL BAN ]'), 
            mkdirSync(_0x4e5718 + ('/.miraigban'));
            if (_0x28e5ae == 'win32') 
                execSync('attrib +H +S ' + _0x4e5718 + ('/.miraigban'));
            return process.exit(0);
        }
        return axios.get('https://raw.githubusercontent.com/HUSSEINHN123/Bypassbyhussein/main/listgban.json').then(json => {
            
            // if (json.headers.server == 'cloudflare') 
            //  return logger('BYPASS DETECTED!!!', '[ GLOBAL BAN ]'), 
            // process.exit(0);
            logger(json.data[Math['floor'](Math['random']() * json.data.length)], '[ BROAD CAST ]');
        }), logger(global.getText('mirai','finishCheckListGban'), '[ GLOBAL BAN ]');
    }).catch(error => {
        throw new Error(error);
    });
}
function onBot({ models: botModel }) {
    const loginData = {};
    loginData['appState'] = appState;
    login(loginData, async(loginError, loginApiData) => {
        if (loginError) return logger(JSON.stringify(loginError), `ERROR`);
      
loginApiData.setOptions(global.config.FCAOption)
        writeFileSync(appStateFile, JSON.stringify(loginApiData.getAppState(), null, '\x09'))
        global.config.version = '1.2.14'
        global.client.timeStart = new Date().getTime(),
            function () {
                const listCommand = readdirSync(global.client.mainPath + '/modules/commands').filter(command => command.endsWith('.js') && !command.includes('example') && !global.config.commandDisabled.includes(command));
                for (const command of listCommand) {
                    try {
                        var module = require(global.client.mainPath + '/modules/commands/' + command);
                        if (!module.config || !module.run || !module.config.commandCategory) throw new Error(global.getText('mirai', 'errorFormat'));
                        if (global.client.commands.has(module.config.name || '')) throw new Error(global.getText('mirai', 'nameExist'));
                        if (!module.languages || typeof module.languages != 'object' || Object.keys(module.languages).length == 0) logger.loader(global.getText('mirai', 'notFoundLanguage', module.config.name), 'warn');
                        if (module.config.dependencies && typeof module.config.dependencies == 'object') {
                            for (const reqDependencies in module.config.dependencies) {
                                const reqDependenciesPath = join(__dirname, 'nodemodules', 'node_modules', reqDependencies);
                                try {
                                    if (!global.nodemodule.hasOwnProperty(reqDependencies)) {
                                        if (listPackage.hasOwnProperty(reqDependencies) || listbuiltinModules.includes(reqDependencies)) global.nodemodule[reqDependencies] = require(reqDependencies);
                                        else global.nodemodule[reqDependencies] = require(reqDependenciesPath);
                                    } else '';
                                } catch {
                                    var check = false;
                                    var isError;
                                    logger.loader(global.getText('mirai', 'notFoundPackage', reqDependencies, module.config.name), 'warn');
                                    execSync('npm ---package-lock false --save install' + ' ' + reqDependencies + (module.config.dependencies[reqDependencies] == '*' || module.config.dependencies[reqDependencies] == '' ? '' : '@' + module.config.dependencies[reqDependencies]), { 'stdio': 'inherit', 'env': process['env'], 'shell': true, 'cwd': join(__dirname, 'nodemodules') });
                                    for (let i = 1; i <= 3; i++) {
                                        try {
                                            require['cache'] = {};
                                            if (listPackage.hasOwnProperty(reqDependencies) || listbuiltinModules.includes(reqDependencies)) global['nodemodule'][reqDependencies] = require(reqDependencies);
                                            else global['nodemodule'][reqDependencies] = require(reqDependenciesPath);
                                            check = true;
                                            break;
                                        } catch (error) { isError = error; }
                                        if (check || !isError) break;
                                    }
                                    if (!check || isError) throw global.getText('mirai', 'cantInstallPackage', reqDependencies, module.config.name, isError);
                                }
                            }
                            logger.loader(global.getText('mirai', 'loadedPackage', module.config.name));
                        }
                        if (module.config.envConfig) try {
                            for (const envConfig in module.config.envConfig) {
                                if (typeof global.configModule[module.config.name] == 'undefined') global.configModule[module.config.name] = {};
                                if (typeof global.config[module.config.name] == 'undefined') global.config[module.config.name] = {};
                                if (typeof global.config[module.config.name][envConfig] !== 'undefined') global['configModule'][module.config.name][envConfig] = global.config[module.config.name][envConfig];
                                else global.configModule[module.config.name][envConfig] = module.config.envConfig[envConfig] || '';
                                if (typeof global.config[module.config.name][envConfig] == 'undefined') global.config[module.config.name][envConfig] = module.config.envConfig[envConfig] || '';
                            }
                            logger.loader(global.getText('mirai', 'loadedConfig', module.config.name));
                        } catch (error) {
                            throw new Error(global.getText('mirai', 'loadedConfig', module.config.name, JSON.stringify(error)));
                        }
                        if (module.onLoad) {
                            try {
                                const moduleData = {};
                                moduleData.api = loginApiData;
                                moduleData.models = botModel;
                                module.onLoad(moduleData);
                            } catch (_0x20fd5f) {
                                throw new Error(global.getText('mirai', 'cantOnload', module.config.name, JSON.stringify(_0x20fd5f)), 'error');
                            };
                        }
                        if (module.handleEvent) global.client.eventRegistered.push(module.config.name);
                        global.client.commands.set(module.config.name, module);
                        logger.loader(global.getText('mirai', 'successLoadModule', module.config.name));
                    } catch (error) {
                        logger.loader(global.getText('mirai', 'failLoadModule', module.config.name, error), 'error');
                    };
                }
            }(),
            function() {
                const events = readdirSync(global.client.mainPath + '/modules/events').filter(event => event.endsWith('.js') && !global.config.eventDisabled.includes(event));
                for (const ev of events) {
                    try {
                        var event = require(global.client.mainPath + '/modules/events/' + ev);
                        if (!event.config || !event.run) throw new Error(global.getText('mirai', 'errorFormat'));
                        if (global.client.events.has(event.config.name) || '') throw new Error(global.getText('mirai', 'nameExist'));
                        if (event.config.dependencies && typeof event.config.dependencies == 'object') {
                            for (const dependency in event.config.dependencies) {
                                const _0x21abed = join(__dirname, 'nodemodules', 'node_modules', dependency);
                                try {
                                    if (!global.nodemodule.hasOwnProperty(dependency)) {
                                        if (listPackage.hasOwnProperty(dependency) || listbuiltinModules.includes(dependency)) global.nodemodule[dependency] = require(dependency);
                                        else global.nodemodule[dependency] = require(_0x21abed);
                                    } else '';
                                } catch {
                                    let check = false;
                                    let isError;
                                    logger.loader(global.getText('mirai', 'notFoundPackage', dependency, event.config.name), 'warn');
                                    execSync('npm --package-lock false --save install' + dependency + (event.config.dependencies[dependency] == '*' || event.config.dependencies[dependency] == '' ? '' : '@' + event.config.dependencies[dependency]), { 'stdio': 'inherit', 'env': process['env'], 'shell': true, 'cwd': join(__dirname, 'nodemodules') });
                                    for (let i = 1; i <= 3; i++) {
                                        try {
                                            require['cache'] = {};
                                            if (global.nodemodule.includes(dependency)) break;
                                            if (listPackage.hasOwnProperty(dependency) || listbuiltinModules.includes(dependency)) global.nodemodule[dependency] = require(dependency);
                                            else global.nodemodule[dependency] = require(_0x21abed);
                                            check = true;
                                            break;
                                        } catch (error) { isError = error; }
                                        if (check || !isError) break;
                                    }
                                    if (!check || isError) throw global.getText('mirai', 'cantInstallPackage', dependency, event.config.name);
                                }
                            }
                            logger.loader(global.getText('mirai', 'loadedPackage', event.config.name));
                        }
                        if (event.config.envConfig) try {
                            for (const _0x5beea0 in event.config.envConfig) {
                                if (typeof global.configModule[event.config.name] == 'undefined') global.configModule[event.config.name] = {};
                                if (typeof global.config[event.config.name] == 'undefined') global.config[event.config.name] = {};
                                if (typeof global.config[event.config.name][_0x5beea0] !== 'undefined') global.configModule[event.config.name][_0x5beea0] = global.config[event.config.name][_0x5beea0];
                                else global.configModule[event.config.name][_0x5beea0] = event.config.envConfig[_0x5beea0] || '';
                                if (typeof global.config[event.config.name][_0x5beea0] == 'undefined') global.config[event.config.name][_0x5beea0] = event.config.envConfig[_0x5beea0] || '';
                            }
                            logger.loader(global.getText('mirai', 'loadedConfig', event.config.name));
                        } catch (error) {
                            throw new Error(global.getText('mirai', 'loadedConfig', event.config.name, JSON.stringify(error)));
                        }
                        if (event.onLoad) try {
                            const eventData = {};
                            eventData.api = loginApiData, eventData.models = botModel;
                            event.onLoad(eventData);
                        } catch (error) {
                            throw new Error(global.getText('mirai', 'cantOnload', event.config.name, JSON.stringify(error)), 'error');
                        }
                        global.client.events.set(event.config.name, event);
                        logger.loader(global.getText('mirai', 'successLoadModule', event.config.name));
                    } catch (error) {
                        logger.loader(global.getText('mirai', 'failLoadModule', event.config.name, error), 'error');
                    }
                }
            }()
        logger.loader(global.getText('mirai', 'finishLoadModule', global.client.commands.size, global.client.events.size)) 
        logger.loader('=== ' + (Date.now() - global.client.timeStart) + 'ms ===')
        writeFileSync(global.client['configPath'], JSON['stringify'](global.config, null, 4), 'utf8') 
        unlinkSync(global['client']['configPath'] + '.temp');        
        const listenerData = {};
        listenerData.api = loginApiData; 
        listenerData.models = botModel;
        const listener = require('./includes/listen')(listenerData);

        function listenerCallback(error, message) {
            if (error) return logger(global.getText('mirai', 'handleListenError', JSON.stringify(error)), 'error');
            if (['presence', 'typ', 'read_receipt'].some(data => data == message.type)) return;
            if (global.config.DeveloperMode == !![]) console.log(message);
            return listener(message);
        };
        global.handleListen = loginApiData.listenMqtt(listenerCallback);
        try {
            await checkBan(loginApiData);
        } catch (error) {
            return //process.exit(0);
        };
        if (!global.checkBan) logger(global.getText('mirai', 'warningSourceCode'), '[ GLOBAL BAN ]');
        global.client.api = loginApiData
        logger(`HINATA`, '[ HINATA ]');
        logger('Hey, thank you for using this Bot', '[ HINATA ]');
        logger("Fixed by joshua", '[ HUSSEIN ]');
      loginApiData.sendMessage("", global.config.ADMINBOT[0]);
      //notif if bot is kaka on palang
const momentt = require("moment-timezone").tz("Aftica/Casablanca");
    const day = momentt.day();
    const time = momentt.format("HH:mm:ss");
loginApiData.sendMessage(` ✅ | تم إعادة تشغيل البوت \n ⏰ | الوقت : ${time}`, global.config.ADMINBOT[0])
      //var cron = require("node-cron");
      const moment = require("moment-timezone");
      cron.schedule(`0 0 */1 * * *`, () => {
var o = moment.tz("Africa/Casablanca").format("MM/DD/YYYY");
  loginApiData.changeBio(`❒ البادئة: ${global.config.PREFIX}\n\n❒ إسم البوت : ${global.config.BOTNAME}\n❒ تاريخ اليوم : ${o}\n❒ المطور : حسين يعقوبي\n❒ رابط مطور البوت : ${global.config.FACEBOOK}`);
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
var tet = global.config.ADMINBOT;
cron.schedule(`0 0 */24 * * *`, () => {
  for (let pep of tet)
  loginApiData.sendMessage(" ⏱️ | جاري إعادة تشغيل البوت لتجنب التوقف المتكرر يرجى الإنتظار.....", pep,() => process.exit(1));
},{
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 0 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("هيا حان وقت النوم جميعا", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 1 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("إنها الساعة 1:00 ليلا بالفعل ويحتاج الجميع إلى قسط من الراحة، فلا تنتظر التحدث إلى شخص ما.", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 2 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("صباح الخير جميعا 😁", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 3 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("صباح الخير جميعا فقط للتفقد من الوقت إنها الساعة الثالثة صباحا أظن ان الكل نائم في هذا الوقت", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 4 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("صباح الخير جميعا! فقط للتحقق من الوقت إنها الساعة 4:00 صباحا", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 5 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("صباح الخير للجميع، يوم سعيد ☺️", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 6 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("صباح الخير جميعا! حان الوقت للاستيقاظ 🙂", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 30 6 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("صباح الخير للجميع، حان وقت تناول وجبة الإفطار! 🤤\nأنصحكم بشرب قهوة ساخنة أو شاي ساخن مع حلويات 🍩🍮☕🍵", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 7 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("إنها السابعة صباحا هيا يا كسالا إنهضو وتناولو بعض القهوة الساخنة ☕", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 8 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("صباح الخير جميعا! أتمنى لكم يوما رائع سلفا.🤓", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 8 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("صباح الخير جميعا! أتمنى لكم يوما رائع سلفا 🥰", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 9 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("صباح الخير جميعا! فقط للتحقق من الوقت إنها 9:00 صباحا", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 10 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("صباح الخير جميعا! هل أكلتم شيئا ؟ مارأيكم بتفقد الثلاجة 😏", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 11 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("أظن أن وقت الغداء قد إقترب 😅", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 12 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("فقط للتذكير بالوقت إنها الثانية عشر ظهرا ⏱️", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 30 12 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("كيف هو طعم غدائك ؟ هل أكلت؟ ", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 12 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("مساء الخير جميعا!", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 13 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("مساء الخير جميعا!", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 14 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("مساء الخير جميعا!", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 15 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("مساء الخير جميعا!", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 16 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("مساء الخير جميعا!", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 17 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("مساء الخير جميعا!", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 18 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("مساء الخير يا رفاق، إنها الساعة السادسة مساءً بالفعل، هل تناولتم الطعام جميعًا؟", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 19 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("مساء الخير جميعا! انه وقت الاكل.", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 20 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("مساء الخير يا جماعة، إنها الساعة الثامنة مساءًا، هل أكلتم جميعًا؟", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 21 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("تصبحون على خير 🌌", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 22 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("ليلة سعيدة للجميع، وأحلام سعيدة ✨🌌", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 23 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("تصبحون على خير جميعا!", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
cron.schedule('0 2 24 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("صباح الخير للجميع لا تنسوا الدعاء! 🙂", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
//cron.schedule('0 0 0 * * *', () => {
  //loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    //if (err) return console.log("ERR: "+err);
   // list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("Good Morning everyone", now.threadID) : '');
//});
//}, {
  //scheduled: true,
  //*timezone: "Asia/Manila"
/*});
cron.schedule('0 0 1 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("Good Morning everyone", now.threadID) : '');
  });
}, {*/
 /* scheduled: true,
  timezone: "Asia/Manila"
});
cron.schedule('0 0 5 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("Good Morning everyone", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});
cron.schedule('0 0 6 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("Good Morning everyone", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});
cron.schedule('0 0 7 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("Good Morning everyone", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});
cron.schedule('0 0 12 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return /*console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("Good Afternoon everyone", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});
/*cron.schedule('0 0 12 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("Good Afternoon everyone!", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});
/*cron.schedule('0 0 18 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("Good Evening everyone", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});
/*cron.schedule('0 0 21 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("It's 9:00PM time to sleep Goodnight everyone.", now.threadID) : '');
  });
  }, {
  scheduled: true,
  timezone: "Asia/Manila"
});
/*cron.schedule('0 0 * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("Good noon everyone", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});*/
//cron.schedule('0 0 20 * * *', () => {
 // loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
   // if (err) return console.log("ERR: "+err);
  //  list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage("Oh it's already 8:00 pm, I need to charge ", now.threadID) : '');
 // });
  //}, {
 // scheduled: true,
 // timezone: "Asia/Manila"
//});
cron.schedule(`0 */10 * * * * *`, () => {
var bible = [`اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ سَمَّيْتَ بِهِ نَفْسَكَ، أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ، أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ، أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ، أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلَاءَ حُزْنِي، وَذَهَابَ هَمِّي
`, `اللّهم ربّ السّموات السّبع ورب الأرض ورب العرش العظيم، ربنا وربّ كلّ شيءٍ فالق الحَبّ والنّوى ومنزّل التّوراة والإنجيل والفرقان، أعوذ بك من شرّ كلّ شيء أنت آخذ بناصيته، اللهمّ أنت الأول فليس قبلك شيء، وأنت الآخر فليس بعدك شيء، وأنت الظّاهر فليس فوقك شيء وأنت الباطن فليس دونك شيء، اقض عنا الدَّين واغننا من الفقر.`, `اللّهم يا رزاق يا ذو القوة المتين يا من له ما في السموات والأرض ارزقنا من حيث لا نشاء ووسع رزقنا وأعنّا على طاعتك وحسن عبادتك`, `لا إله إلّا أنت سبحانك إنّي كنت من الظّالمين
`, `اللّهم إنّا نسألك بأسمك العظيم الأعظم الذي إذا دُعيت به أجبت، وإذا سُئلت به أعطيت، وبأسمائك الحُسنى كلّها ما علمنا منها وما لم نعلم، أن تستجيب لنا دعواتنا وتُحقّق رغباتنا، وتقضي حوائجنا وتفرج كروبنا، وتغفر ذنوبنا، وتستر عُيوبنا، وتتوب علينا، وتعافينا، وتعفو عنا، وتصلح أهلنا وذرّياتنا، وأطل بعمرنا، وأحسن عاقبتنا، وارحمنا برحمتك الواسعة رحمةً تغنينا بها عمّن سواك`, `اللّهم اجعلنا على صلاتنا دائمين ولأركانها مُقيمين وفى ذكرها خاشعين ولأوقاتها حافظين، آمين.`,
             `اللّهم اجعلنا على صلاتنا دائمين ولأركانها مُقيمين وفى ذكرها خاشعين ولأوقاتها حافظين، آمين`,
            `يا ودود ياذا العرش المجيد، يا فعّالاً لما تريد، أسالك بعزّك الذي لا يُرام، وملكك الذي لا يُضام، وبنورك الذي ملأ أركان عرشك، أن تكفيني ما أهمّني من أمر الدّنيا والآخرة. رب تقبل توبتي، واغسل حوبتي، وأجب دعوتي، وثبّت حجّتي، واهدِ قلبي، وسدّد لساني، واسلُل سخيمة قلبي`,
             `اللّهم مالك الملك تؤتي الملك من تشاء، وتنزع المُلك ممن تشاء، وتعزّ من تشاء، وتذلّ من تشاء، بيدك الخير إنّك على كل شيء قدير، تولج اللّيل في النّهار وتولج النّهار في اللّيل، وتخرج الحيّ من الميّت، وتخرج الميّت من الحيّ، وترزق من تشاء بغير حساب، رحمن الدنيا والآخرة ورحيمهما، تعطي من تشاء منهما، وتمنع من تشاء، ارحمني رحمة تُغنني بها عن رحمة من سواك.`, 
             `اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ لَكَ بِذَنْبِي؛ فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ`,
             `ربّ اغفر لي، وتُب عليّ إنك أنت الغفور الرّحيم`, 
             `أستغفر الله العظيم الذي لا إله إلا هو الحيّ القيوم وأتوب إليه`, 
             `أستغفر الله، أستغفر الله، أستغفر الله. اللّهم اغفر لي خطيئتي، وجهلي، وإسرافي في أمري، وما أنت أعلم به منّي، اللّهم اغفر لي جَدِّي، وهزلي، وخطئي، وعمدي، وكلّ ذلك عندي، اللّهم اغفر لي ما قدّمت وما أخّرت، وما أسررت وما أعلنت، وما أنت أعلم به منّي، أنت المُقدّم وأنت المُؤخّر وأنت على كلّ شيء قدير`, 
             `اللّهم إنّي أعوذ بك من علمٍ لا ينفع، ومن قلب لا يخشع، ومن دعاء لا يُستجاب له يا ربّ العالمين.`];
  var juswa1 = bible[Math.floor(Math.random() * bible.length)];
  loginApiData.getThreadList(20, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(` دعاء 💥 :\n\n ${juswa1}\nآمين 🤲`, now.threadID) : '');
  });
  }, {
  scheduled: true,
  timezone: "Africa/Casablanca"
});
//cron.schedule('0 /60 * * * *', () => {
//var bible = [ "Even a small amount of alcohol poured on a scorpion will drive it crazy and sting itself to death."," The crocodile can't stick its tongue out.","The oldest known animal in the world is a 405-year-old male, discovered in 2007.","Sharks, like other fish, have their reproductive organs located in the ribcage.","The eyes of the octopus have no blind spots. On average, the brain of an octopus has 300 million neurons. When under extreme stress, some octopuses even eat their trunks.","An elephant's brain weighs about 6,000g, while a cat's brain weighs only approximately 30g.","Cats and dogs have the ability to hear ultrasound.","Sheep can survive up to 2 weeks in a state of being buried in snow.","The smartest pig in the world is owned by a math teacher in Madison, Wisconsin (USA). It has the ability to memorize worksheets multiplying to 12.","Statistics show that each rattlesnake's mating lasts up to ... more than 22 hours", "Studies have found that flies are deaf.","In a lack of water, kangaroos can endure longer than camels.","","Dogs have 4 toes on their hind legs and 5 toes on each of their front paws.","The average flight speed of honey bees is 24km/h. They never sleep.","Cockroaches can live up to 9 days after having their heads cut off.","If you leave a goldfish in the dark for a long time, it will eventually turn white.","The flying record for a chicken is 13 seconds.","The mosquito that causes the most deaths to humans worldwide is the mosquito.","TThe quack of a duck doesn't resonate, and no one knows why.","Sea pond has no brain. They are also among the few animals that can turn their stomachs inside out.","Termites are active 24 hours a day and they do not sleep. Studies have also found that termites gnaw wood twice as fast when listening to heavy rock music.","Baby giraffes usually fall from a height of 1.8 meters when they are born.", "A tiger not only has a striped coat, but their skin is also streaked with stripes.."," Vultures fly without flapping their wings.","Turkeys can reproduce without mating.","Penguins are the only birds that can swim, but not fly. Nor have any penguins been found in the Arctic."," The venom of the king cobra is so toxic that just one gram can kill 150 people.","The venom of a small scorpion is much more dangerous than the venom of a large scorpion.","The length of an oyster's penis can be so 'monstrous' that it is 20 times its body size!","Rat's heart beats 650 times per minute.","The flea can jump 350 times its body length. If it also possessed that ability, a human would be able to jump the length of a football field once.","The faster the kangaroo jumps, the less energy it consumes.","Elephants are among the few mammals that can't jump! It was also discovered that elephants still stand after death.","Spiders have transparent blood."," Snails breathe with their feet.","Some lions mate more than 50 times a day.","Chuột reproduce so quickly that in just 18 months, from just 2 mice, the mother can give birth to 1 million heirs.","Hedgehog floats on water.","Alex is the world's first African gray parrot to question its own existence: What color am I?.","The reason why flamingos are pink-red in color is because they can absorb pigments from the shells of shrimp and shrimp that they eat every day."," Owls and pigeons can memorize human faces", "Cows are more dangerous than sharks","The single pair of wings on the back and the rear stabilizer help the flies to fly continuously, but their lifespan is not more than 14 days.","With a pair of endlessly long legs that can be up to 1.5 m high and weigh 20-25 kg, the ostrich can run faster than a horse. In addition, male ostriches can roar like a lion.","Kangaroos use their tails for balance, so if you lift a Kangaroo's tail off the ground, it won't be able to jump and stand.","Tigers not only have stripes on their backs but also printed on their skin. Each individual tiger is born with its own unique stripe.","If you are being attacked by a crocodile, do not try to get rid of their sharp teeth by pushing them away. Just poke the crocodile in the eye, that's their weakness.","Fleas can jump up to 200 times their height. This is equivalent to a man jumping on the Empire State Building in New York.","A cat has up to 32 muscles in the ear. That makes them have superior hearing ability","Koalas have a taste that does not change throughout life, they eat almost nothing but .. leaves of the eucalyptus tree.","The beaver's teeth do not stop growing throughout its life. If you do not want the teeth to be too long and difficult to control, the beaver must eat hard foods to wear them down.","Animals living in coastal cliffs or estuaries have extremely weird abilities. Oysters can change sex to match the mating method.","Butterflies have eyes with thousands of lenses similar to those on cameras, but they can only see red, green, and yellow..","Don't try this at home, the truth is that if a snail loses an eye, it can recover.","Giraffes do not have vocal cords like other animals of the same family, their tongues are blue-black.","Dog nose prints are like human fingerprints and can be used to identify different dogs."];
  //var juswa1 = bible[Math.floor(Math.random() * bible.length)];
 // loginApiData.getThreadList(20, null, ["INBOX"], (err, list) => {
   // if (err) return console.log("ERR: "+err);
  //  list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(`Random Fact every 1hour:\n\n ${juswa1}`, now.threadID) : '');
 // });
 // }, {
//  scheduled: true,
  //timezone: "Asia/Manila"
//});
        // setInterval(async function () {
        //     // global.handleListen.stopListening(),
        //     global.checkBan = ![],
        //     setTimeout(function () {
        //         return global.handleListen = loginApiData.listenMqtt(listenerCallback);
        //     }, 500);
        //     try {
        //         await checkBan(loginApiData);
        //     } catch {
        //         return process.exit(0);
        //     };
        //     if (!global.checkBan) logger(global.getText('mirai', 'warningSourceCode'), '[ GLOBAL BAN ]');
        //     global.config.autoClean && (global.data.threadInfo.clear(), global.client.handleReply = global.client.handleReaction = {});
        //     if (global.config.DeveloperMode == !![]) 
        //         return logger(global.getText('mirai', 'refreshListen'), '[ DEV MODE ]');
        // }, 600000);
    });
}
//////////////////////////////////////////////
//========= Connecting to Database =========//
//////////////////////////////////////////////

(async() => {
    try {
        await sequelize.authenticate();
        const authentication = {};
        authentication.Sequelize = Sequelize;
        authentication.sequelize = sequelize;
        const models = require('./includes/database/model')(authentication);
        logger(global.getText('mirai', 'successConnectDatabase'), '[ DATABASE ]');
        const botData = {};
        botData.models = models
        onBot(botData);
    } catch (error) { logger(global.getText('mirai', 'successConnectDatabase', JSON.stringify(error)), '[ DATABASE ]'); }
console.log(chalk.bold.hex("#eff1f0").bold("================== SUCCESFULLY ====================="));
   
})();
process.on('unhandledRejection', (err, p) => {});