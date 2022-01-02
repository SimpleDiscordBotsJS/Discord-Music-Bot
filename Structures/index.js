const Discord = require("discord.js"); //Библиотека
const client = new Discord.Client({ intents: 32767 }); //Создание клиента
const config = require("./config.json"); //Загрузка конфига
const Logger = require("../Utilites/Logger"); //Загрузка логгера
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

//===========================================================

client.commands = new Discord.Collection();

//===========================================================

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    leaveOnStop: false,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin(), new SoundCloudPlugin()]
});
module.exports = client;

//===========================================================

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});

//===========================================================

// Подключение к боту и вывод ошибки в случае отсутствия токена, или если токен неверен.
client.login(config.BOT_TOKEN).catch(() => Logger.Error("⛔ Invalid Bot Login Token."));