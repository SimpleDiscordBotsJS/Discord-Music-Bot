const client = require("../../Structures/index");
const Logger = require("../../Utilites/Logger");
const { MessageEmbed } = require("discord.js");

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (queue, song) => { queue.textChannel.send({embeds: [new MessageEmbed().setColor("GREEN")
        .setDescription(`🎶 | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)]});
        Logger.Success(`🎶 | Playing '${song.name}' - '${song.formattedDuration}'`);
        Logger.Info(`Requested by: ${song.user.tag} - ${status(queue)}`);
        Logger.Info('=============================');
    })

    //===========================================================
    .on("addSong", (queue, song) => { queue.textChannel.send({embeds: [new MessageEmbed().setColor("GREEN")
        .setDescription(`🎶 | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)]});
        Logger.Info(`🎶 | Added ${song.name} - '${song.formattedDuration}' to the queue by ${song.user}`);
        Logger.Info('=============================');
    })

    //===========================================================
    .on("addList", (queue, playlist) => { queue.textChannel.send({embeds: [new MessageEmbed().setColor("GREEN")
        .setDescription(`🎶 | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)]});
        Logger.Info(`🎶 | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`);
        Logger.Info('=============================');
    })

    //===========================================================
    .on("error", (channel, e) => { channel.send({embeds: [new MessageEmbed().setColor("RED")
        .setDescription(`⛔ | An error encountered: ${e}`)]});
        Logger.Error(`🎶 | ${e}`);
        Logger.Info('=============================');
    })

    //===========================================================
    .on("empty", queue => { queue.textChannel.send({embeds: [new MessageEmbed().setColor("RED")
        .setDescription(`Voice channel is empty! Leaving the channel...`)]});
        Logger.Error(`🎶 | Voice channel is empty! Leaving the channel...`);
        Logger.Info('=============================');
    })

    //===========================================================
    .on("searchNoResult", message => { message.channel.send({embeds: [new MessageEmbed().setColor("RED")
        .setDescription(`⛔ | No result found!`)]});
        Logger.Error(`🎶 | ⛔ | No result found!`);
        Logger.Info('=============================');
    })

    //===========================================================
    .on("finish", queue => { queue.textChannel.send({embeds: [new MessageEmbed().setColor("RED")
        .setDescription(`Queue finished, leaving the channel.`)]});
        Logger.Info(`🎶 | Queue finished, leaving the channel.`);
        Logger.Info('=============================');
    })