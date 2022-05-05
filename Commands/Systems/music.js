const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { Error } = require("../../Utilites/Logger");

module.exports = {
    name: "music",
    description: "Complite music system",
    options: [
        { name: "play", description: "Play a song.", type: "SUB_COMMAND", options: [
            { name: "query", description: "Provide a name or a url for the song", type: "STRING", required: true }]
        },
        { name: "volume", description: "Alter the volume", type: "SUB_COMMAND", options: [
            { name: "percent", description: "10 = 10%", type: "NUMBER", required: true }]
        },
        { name: "seek", description: "Seeks to the specified position.", value: "seek", type: "SUB_COMMAND", options: [
            { name: "time", description: "Provide a position (in seconds) to seek.", type: "NUMBER", required: true }]
        },
        { name: "filters", description: "Toggle filters", type: "SUB_COMMAND", options: [
            { name: "set", description: "Choose a filter", type: "STRING", required: true, choices: [
                {name: "🔌 Turn off all filters", value: "false"},
                {name: "📣 Toggle 8d filter", value: "8d"},
                {name: "📣 Toggle bassboost filter", value: "bassboost"},
                {name: "📣 Toggle echo filter", value: "echo"},
                {name: "📣 Toggle nightcore filter", value: "nightcore"},
                {name: "📣 Toggle surround filter", value: "surround"},
                {name: "📣 Toggle karaoke filter", value: "karaoke"},
                {name: "📣 Toggle vaporwave filter", value: "vaporwave"},
                {name: "📣 Toggle flanger filter", value: "flanger"},
                {name: "📣 Toggle gate filter", value: "gate"},
                {name: "📣 Toggle haas filter", value: "haas"},
                {name: "📣 Toggle reverse filter", value: "reverse"},
                {name: "📣 Toggle mcompand filter", value: "mcompand"},
                {name: "📣 Toggle phaser filter", value: "phaser"},
                {name: "📣 Toggle tremolo filter", value: "tremolo"},
                {name: "📣 Toggle earwax filter", value: "earwax"}
            ]}]
        },
        { name: "settings", description: "Select an option.", type: "SUB_COMMAND", options: [
            { name: "options", description: "Select an option.", type: "STRING", required: true, choices: [
                {name: "🔢 View Queue", value: "queue"},
                {name: "⏭ Skip Song", value: "skip"},
                {name: "⏸ Pause Song", value: "pause"},
                {name: "⏯ Resume Song", value: "resume"},
                {name: "⏹ Stop Music", value: "stop"},
                {name: "🔀 Shuffle Queue", value: "shuffle"},
                {name: "🔄 Toggle Autoplay Modes", value: "AutoPlay"},
                {name: "🔼 Add a Related Song", value: "RelatedSong"},
                {name: "🔁 Toggle Repeat Mod", value: "RepeatMode"},
                {name: "⏮ Play Previous Song", value: "previous"}
            ]}]
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if(!VoiceChannel) return interaction.reply({content: "You must be in a voice channel to be able to use the music commands.", ephemeral: true});

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({content: `I'm already playing music in <#${guild.me.voice.channelId}>.`, ephemeral: true}); 
    
        try {
            switch(options.getSubcommand()) {
                case "play" :  {
                    client.distube.play( VoiceChannel, options.getString("query"), { textChannel: channel, member: member });
                    return interaction.reply({content: "🎼 Request recieved.", ephemeral: true});
                }
                //===========================================================
                case "volume" : {
                    const Volume = options.getNumber("percent");
                    if(Volume > 100 || Volume < 1) return interaction.reply({content: "You have to specify a number between 1 and 100."});

                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.reply({content: `📶 Volume has been set to \`${Volume}%\``, ephemeral: true});
                }
                //===========================================================
                case "seek" : {
                    const queue = await client.distube.getQueue(VoiceChannel);
                    const Time = options.getNumber("time");
                    if(!queue) return interaction.reply({content: "⛔ There is no queue", ephemeral: true});

                    await queue.seek(Time);
                    return interaction.reply({content: `⏩ **Seeked to \`${Time}\`**`, ephemeral: true});
                }
                //===========================================================
                case "settings" : {
                    const queue = await client.distube.getQueue(VoiceChannel);

                    if(!queue) return interaction.reply({content: "⛔ There is no queue.", ephemeral: true});
                    switch(options.getString("options")) {
                        case "skip" :
                        await queue.skip(VoiceChannel);
                        return interaction.reply({content: "⏭ Song has been skipped.", ephemeral: true});
                        //================================================================
                        case "stop" :
                        await queue.stop(VoiceChannel);
                        return interaction.reply({content: "⏹ Music has been stopped.", ephemeral: true});
                        //================================================================
                        case "pause" :
                        await queue.pause(VoiceChannel);
                        return interaction.reply({content: "⏸ Song has been paused.", ephemeral: true});
                        //================================================================
                        case "resume" :
                        await queue.resume(VoiceChannel);
                        return interaction.reply({content: "⏯ Song has been resumed.", ephemeral: true});
                        //================================================================
                        case "shuffle" :
                        await queue.shuffle(VoiceChannel);
                        return interaction.reply({content: "🔀 The queue has been shuffled.", ephemeral: true});
                        //================================================================
                        case "AutoPlay" :
                        let Mode = await queue.toggleAutoplay(VoiceChannel);
                        return interaction.reply({content: `🔄 Autoplay Mode is set to: ${Mode ? "On" : "Off"}`, ephemeral: true});
                        //================================================================
                        case "RelatedSong" :
                        await queue.addRelatedSong(VoiceChannel);
                        return interaction.reply({content: "🔼 A related song has been added to the queue.", ephemeral: true});
                        //================================================================
                        case "RepeatMode" :
                        let Mode2 = await client.distube.setRepeatMode(queue);
                        return interaction.reply({content: `🔁 Repeat Mode is set to: ${Mode2 = Mode2 ? Mode2 == 2 ? "Queue" : "Song" : "Off"}`, ephemeral: true});
                        //================================================================
                        case "previous" :
                        await queue.previous(VoiceChannel);
                        return interaction.reply({content: "⏮ Playing Previous Track.", ephemeral: true});
                        //================================================================
                        case "queue" :
                        return interaction.reply({embeds: [new MessageEmbed()
                        .setColor("PURPLE")
                        .setDescription(`${queue.songs.map(
                            (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`)
                        ], ephemeral: true});
                        //================================================================
                    }
                    return;
                }
                case "filters" : {
                    const queue = await client.distube.getQueue(VoiceChannel);
                    if(!queue) return interaction.reply({content: "⛔ There is no queue", ephemeral: true});

                    switch(options.getString("set")) {
                        case "false" : 
                        await queue.setFilter(false);
                        return interaction.reply({content: `❎ Disabled all filters.`, ephemeral: true});
                        //================================================================
                        case "8d" : 
                        await queue.setFilter(`3d`);
                        return interaction.reply({content: `✅ Toggled the 8D filter.`, ephemeral: true});
                        //================================================================
                        case "karaoke" : 
                        await queue.setFilter(`karaoke`);
                        return interaction.reply({content: `✅ Toggled the karaoke filter.`, ephemeral: true});
                        //================================================================
                        case "vaporwave" : 
                        await queue.setFilter(`vaporwave`);
                        return interaction.reply({content: `✅ Toggled the vaporwave filter.`, ephemeral: true});
                        //================================================================
                        case "flanger" : 
                        await queue.setFilter(`flanger`);
                        return interaction.reply({content: `✅ Toggled the flanger filter.`, ephemeral: true});
                        //================================================================
                        case "gate" : 
                        await queue.setFilter(`gate`);
                        return interaction.reply({content: `✅ Toggled the gate filter.`, ephemeral: true});
                        //================================================================
                        case "haas" : 
                        await queue.setFilter(`haas`);
                        return interaction.reply({content: `✅ Toggled the haas filter.`, ephemeral: true});
                        //================================================================
                        case "reverse" : 
                        await queue.setFilter(`reverse`);
                        return interaction.reply({content: `✅ Toggled the reverse filter.`, ephemeral: true});
                        //================================================================
                        case "mcompand" : 
                        await queue.setFilter(`mcompand`);
                        return interaction.reply({content: `✅ Toggled the mcompand filter.`, ephemeral: true});
                        //================================================================
                        case "phaser" : 
                        await queue.setFilter(`phaser`);
                        return interaction.reply({content: `✅ Toggled the phaser filter.`, ephemeral: true});
                        //================================================================
                        case "tremolo" : 
                        await queue.setFilter(`tremolo`);
                        return interaction.reply({content: `✅ Toggled the tremolo filter.`, ephemeral: true});
                        //================================================================
                        case "earwax" : 
                        await queue.setFilter(`earwax`);
                        return interaction.reply({content: `✅ Toggled the earwax filter.`, ephemeral: true});
                        //================================================================
                        case "bassboost" : 
                        await queue.setFilter(`bassboost`);
                        return interaction.reply({content: `✅ Toggled the bassboost filter.`, ephemeral: true});
                        //================================================================
                        case "echo" : 
                        await queue.setFilter(`echo`);
                        return interaction.reply({content: `✅ Toggled the echo filter.`, ephemeral: true});
                        //================================================================
                        case "nightcore" : 
                        await queue.setFilter(`nightcore`);
                        return interaction.reply({content: `✅ Toggled the nightcore filter.`, ephemeral: true});
                        //================================================================
                        case "surround" : 
                        await queue.setFilter(`surround`);
                        return interaction.reply({content: `✅ Toggled the surround filter.`, ephemeral: true});
                        //================================================================
                    }
                }
            }
        } catch (e) {
            Error(e);
        }
    }
}