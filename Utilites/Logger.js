/* Logger by LeonusDH (aka RADIO) */

//===========================================================//

const fs = require("fs");
const logFilePath = "./Structures/Logs";
const logFileName = "Latest";

//===========================================================//

//var time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[1]; - Old time var

//===========================================================//
function Info(text) {
    console.info(construct('console') + `\x1b[1;32m[  INFO  ]:  ` + text + `\x1b[0m`);
    writeFile(logFilePath + '/' + logFileName, `[  INFO  ]:  ` + text);
}

//===========================================================//
function Success(text) {
    console.log(construct('console') + `\x1b[34m[ SUCCESS ]: ` + text + `\x1b[0m`);
    writeFile(logFilePath + '/' + logFileName, `[ SUCCESS ]: ` + text);
}

//===========================================================//
function Message(text) {
    console.log(construct('console') + `\x1b[0m[ MESSAGE ]: ` + text + `\x1b[0m`);
    writeFile(logFilePath + '/' + logFileName, `[ MESSAGE ]: ` + text);
}

//===========================================================//
function Warning(text) {
    console.warn(construct('console') + `\x1b[1;33m[ WARNING ]: ` + text + `\x1b[0m`);
    writeFile(logFilePath + '/' + logFileName, `[ WARNING ]: ` + text);
}

//===========================================================//
function Error(text) {
    console.error(construct('console') + `\x1b[1;31m[  ERROR  ]: ` + text + `\x1b[0m`);
    writeFile(logFilePath + '/' + logFileName, `[  ERROR  ]: ` + text);
}

//===========================================================//

exports.Info = Info;
exports.Success = Success;
exports.Message = Message;
exports.Warning = Warning;
exports.Error = Error;

//===========================================================//
function writeFile(path, content) {
    var newContent = content;

    try {
        if(!fs.existsSync(logFilePath)) {
            fs.mkdirSync(logFilePath);
            fs.writeFileSync(path, new Date().toLocaleDateString() + '\r\n\r\n');
            Info(`Folder Created Successfully.`);
        }
        else if(fs.existsSync(path)) {
            fs.readFile(path, 'utf-8', (err, data) => {
                if(err) return Error(err);
                newContent = data + content;
            });
        }
    } catch (err) { 
        Error(err) 
    }

    fs.appendFile(path, construct('file') + newContent + "\r\n", function(err) {
        if(err) return Error(err);
    });
}

//===========================================================//
function construct(opt) {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    if(opt == 'console') return `[ \x1b[1;36m${time}\x1b[0m ]`;
    else if(opt == 'file') return `[ ${date} ][ ${time} ]`;
}