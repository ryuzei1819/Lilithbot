/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');

let handler = async (m, { conn }) => {
    try {
        const stickerUrl = 'https://files.catbox.moe/r5bypq.webp';
        const stickerResponse = await fetch(stickerUrl);
        const stickerBuffer = await stickerResponse.buffer();
        
        // Mengirim stiker
        await conn.sendMessage(m.chat, {
            sticker: stickerBuffer,
            contextInfo: {
                externalAdReply: {
                    title: "The bot is active now.",
                    thumbnail: await (await conn.getFile("https://cdn-icons-png.flaticon.com/128/12225/12225958.png")).data
                },
                mentionedJid: [m.sender],
            },
        }, { quoted: m });
        
    } catch (error) {
        console.error('Error sending sticker:', error);
    }
};

handler.customPrefix = /^(bot|@6285757657796)$/i;
handler.command = new RegExp;

module.exports = handler;