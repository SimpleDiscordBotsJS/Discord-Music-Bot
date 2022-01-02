const { Client } = require("discord.js");
const Logger = require("../../Utilites/Logger");

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    execute(client) {
        Logger.Success(`✅ Запущен от имени бота: ${client.user.tag}!`);
        console.log();
        client.user.setActivity("Pinguins sex", {type: "STREAMING"});
    }
}