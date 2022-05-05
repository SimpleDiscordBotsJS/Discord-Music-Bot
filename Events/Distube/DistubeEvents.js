const client = require("../../Structures/index");
const { Error } = require("../../Utilites/Logger");
const { MessageEmbed } = require("discord.js");

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    //===========================================================
    .on("playSong", (queue, song) => { queue.textChannel.send({embeds: [new MessageEmbed().setColor("GREEN")
        .setDescription(`🎶 | \`${song.name}\``).addFields(
            { name: "Requested", value: `${song.user}`, inline: true },
            { name: "Volume", value: `\`${queue.volume}%\``, inline: true },
            { name: "Duration", value: `\`${song.formattedDuration}\``, inline: true },
            { name: "Autoplay", value: `\`${queue.autoplay ? "On" : "Off"}\``, inline: true },
            { name: "Loop", value: `\`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\``, inline: true },
            { name: "Filters", value: `\`${queue.filters.join(", ") || "Off"}\``, inline: true }
            )]
        });
    })

    //===========================================================
    .on("addSong", (queue, song) => { queue.textChannel.send({embeds: [new MessageEmbed().setColor("GREEN")
        .setDescription(`🎶 | Added \`${song.name}\``).addFields(
            { name: "Requested", value: `${song.user}`, inline: true },
            { name: "Duration", value: `\`${song.formattedDuration}\``, inline: true },
            { name: "Source", value: `\`${song.source}\``, inline: true }
        )]});
    })

    //===========================================================
    .on("addList", (queue, playlist) => { queue.textChannel.send({embeds: [new MessageEmbed().setColor("GREEN")
        .setDescription(`🎶 | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)]});
    })

    //===========================================================
    .on("error", (channel, e) => { channel.send({embeds: [new MessageEmbed().setColor("RED")
        .setDescription(`⛔ | An error encountered: ${e}`)]});
        Error(`🎶 | ${e}`);
    })

    //===========================================================
    .on("disconnect", queue => { queue.textChannel.send({embeds: [new MessageEmbed().setColor("RED")
        .setDescription(`Disconnected!`)]});
    })

    //===========================================================
    .on("empty", queue => { queue.textChannel.send({embeds: [new MessageEmbed().setColor("RED")
        .setDescription(`Voice channel is empty! Leaving the channel...`)]});
    })
    
    //===========================================================
    .on("searchDone", () => { })

    //===========================================================
    .on("finish", queue => { queue.textChannel.send({embeds: [new MessageEmbed().setColor("RED")
        .setDescription(`Queue finished, leaving the channel.`)]});
    })

    //===========================================================
    .on("finishSong", queue => { queue.textChannel.send({embeds: [new MessageEmbed().setColor("RED")
        .setDescription(`Song finished, leaving the channel.`)]});
    })