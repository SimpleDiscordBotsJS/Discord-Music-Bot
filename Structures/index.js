const Discord = require("discord.js"); // Библиотека
const client = new Discord.Client({ intents: 32767 }); // Создание клиента
const config = require("./config.json"); // Загрузка конфига
const Logger = require("../Utilites/Logger"); // Загрузка логгера
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const { AsciiTable3 } = require("ascii-table3");

//===========================================================

client.commands = new Discord.Collection();

//===========================================================

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");

client.distube = new DisTube(client, {
    nsfw: false, youtubeDL: true,
    emptyCooldown: 25, searchCooldown: 5,
    leaveOnStop: false, leaveOnEmpty: true,
    leaveOnFinish: true, updateYouTubeDL: true,
    emitNewSongOnly: false, savePreviousSongs: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin(), new SoundCloudPlugin()]
});
module.exports = client;

//===========================================================

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, AsciiTable3);
});

//===========================================================

client.on("error", (error) => { Logger.Error(error) });
client.on("warn", (error) => { Logger.Warning(error) });
// client.on("debug", (message) => { Logger.Info(message) }); // Debug

//===========================================================

// Анти-краш и прочее...
process.on("unhandledRejection", (reason, p) => {
    Logger.Warning('=== unhandled Rejection ==='.toUpperCase());
    Logger.Warning('Reason: ' + reason.stack ? String(reason.stack) : String(reason));
    Logger.Warning('==========================='.toUpperCase());
});
process.on("uncaughtException", (err, origin) => {
    Logger.Error('=== uncaught Exception ==='.toUpperCase());
    Logger.Error('Exception: ' + err.stack ? err.stack : err);
    Logger.Error('==========================='.toUpperCase());
});
process.on('uncaughtExceptionMonitor', (err, origin) => {
    Logger.Error('=== uncaught Exception Monitor ==='.toUpperCase());
});
process.on('beforeExit', (code) => {
    Logger.Warning('======= before Exit ======='.toUpperCase());
    Logger.Warning('Code: ' + code);
    Logger.Warning('==========================='.toUpperCase());
});
process.on('exit', (code) => {
    Logger.Warning('========== exit =========='.toUpperCase());
    Logger.Warning('Code: ' + code);
    Logger.Warning('=========================='.toUpperCase());
});
process.on('multipleResolves', (type, promise, reason) => {
    Logger.Warning('==== multiple Resolves ===='.toUpperCase());
    Logger.Warning(type); Logger.Warning(promise); Logger.Warning(reason);
    Logger.Warning('==========================='.toUpperCase());
});

//===========================================================

// Подключение к боту и вывод ошибки в случае отсутствия токена, или если токен неверен.
client.login(config.BOT_TOKEN).catch(() => Logger.Error("⛔ Invalid Bot Login Token."));

// Завершение работы
process.on("SIGINT", () => { Logger.Success("SIGINT detected, exiting..."); process.exit(0); });