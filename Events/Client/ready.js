const { Client } = require("discord.js");
const { Success } = require("../../Utilites/Logger");
const UpdateCheck = require("../../Utilites/UpdateCheck");

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    execute(client) {
        UpdateCheck();
        Success(`✅ Bot started: ${client.user.tag}!\n`);
        client.user.setActivity("Nice stream", {type: "STREAMING"});
    }
}