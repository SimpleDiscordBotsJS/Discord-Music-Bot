const { Client } = require("discord.js");
const Logger = require("../../Utilites/Logger");
const UpdateCheck = require("../../Utilites/UpdateCheck");

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    execute(client) {
        UpdateCheck();
        Logger.Success(`✅ Запущен от имени бота: ${client.user.tag}!\n`);
        client.user.setActivity("Nice stream", {type: "STREAMING"});
    }
}