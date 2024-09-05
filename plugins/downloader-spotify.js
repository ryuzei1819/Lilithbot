/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const canvafy = require("canvafy");
const { searching, spotifydl } = require('../scrape/spotify-dl');

let handler = async (m, { conn, usedPrefix, text, command }) => {
    let input = `🚩 Masukkan query yang ingin dicari`;
    if (!text) return m.reply(input);

    conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });

    const { data, status } = await searching(text);

    if (status === false) return m.reply('🚩 Error fetching API');

    const { title, track, artis, durasi, image, download } = await spotifydl(data[0].url);

    const thumb = 'https://telegra.ph/file/cb1bb4388f099bf1f294e.jpg';
    const fkonto = { key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net' }, message: { orderMessage: { itemCount: 2024, status: 1, thumbnail: null, surface: 1, message: 'Spotify Downloader', orderTitle: 'Spotify Downloader', sellerJid: '0@s.whatsapp.net' } } };

    let captionvid = `*Title:* ${title}\n\n*Artist:* ${artis}\n\n*Duration:* ${durasi}\n_Jika Audio Tidak Muncul Silahkan Ulangi Command_`;
    const p = await new canvafy.Spotify()
        .setTitle(title)
        .setAuthor("Spotify Downloader")
        .setTimestamp(40, 100)
        .setOverlayOpacity(0.8)
        .setBorder("#fff", 0.8)
        .setImage(image)
        .setBlur(3)
        .build();

    let a = await conn.sendFile(m.chat, p, '', captionvid, fkonto);
    conn.sendMessage(m.chat, {audio: {url: download}, mimetype: 'audio/mpeg', ptt: false}, {quoted: a});
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});
};

handler.help = ['spotify <query>'];
handler.tags = ['downloader'];
handler.command = /^(spotify)$/i;
handler.limit = true;
handler.register = true;

module.exports = handler;