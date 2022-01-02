/* Logger by LeonusDH (aka RADIO) */

const fs = require("fs");
const logFilePath = "./Structures/Logs/latest";

//===========================================================
function Info(text) {
    var time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[1];
    
    console.log(`\x1b[0m[ ${time} ][ INFO ]: ` + text + `\x1b[0m`);
    writeFile(logFilePath, `[ ${time} ][ INFO ]: ` + text + "\r\n");
}

//===========================================================
function Success(text) {
    var time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[1];
    
    console.log(`\x1b[1;32m[ ${time} ][ SUCCESS ]: ` + text + `\x1b[0m`);
    writeFile(logFilePath, `[ ${time} ][ SUCCESS ]: ` + text + "\r\n");
}

//===========================================================
function Message(text) {
    var time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[1];
    
    console.log(`\x1b[0m[ ${time} ][ MESSAGE ]: ` + text + `\x1b[0m`);
    writeFile(logFilePath, `[ ${time} ][ MESSAGE ]: ` + text + "\r\n");
}

//===========================================================
function Warning(text) {
    var time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[1];
    
    console.log(`\x1b[0;33m[ ${time} ][ WARNING ]: ` + text + `\x1b[0m`);
    writeFile(logFilePath, `[ ${time} ][ WARNING ]: ` + text + "\r\n");
}

//===========================================================
function Error(text) {
    var time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[1];
    
    console.log(`\x1b[1;31m[ ${time} ][ ERROR ]: ` + text + `\x1b[0m`);
    writeFile(logFilePath, `[ ${time} ][ ERROR ]: ` + text + "\r\n");
}

//===========================================================

exports.Info = Info;
exports.Success = Success;
exports.Message = Message;
exports.Warning = Warning;
exports.Error = Error;

//===========================================================
function writeFile(path, content) {
    var newContent = content;

    try {
        if(fs.existsSync(logFilePath)) {
            fs.readFile(path, 'utf-8', (err, data) => {
                if(err) return Error(err);
                newContent = data + content;
            });
        }
    } catch (err) { 
        Logger.Error(err) 
    }

    fs.appendFileSync(path, newContent, function(err) {
        if(err) return Error(err);
    });
}