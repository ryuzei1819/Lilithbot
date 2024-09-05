/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const uploadImage = require('../lib/uploadImage.js');
const fetch = require('node-fetch');
const fs = require('fs');

const handler = async (m, { conn, usedPrefix }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || "";
    if (!mime) throw `Fotonya?`;
    if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`;
    let img = await q.download();
    let upld = await uploadImage(img);
    await m.reply(wait);
    let res = await fetch(
        `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(upld)}`
    );
    let json = await res.json();
    let { id, idMal, title, synonyms, isAdult } = json.result[0].anilist;
    let { filename, episode, similarity, video, image } = json.result[0];
    let _result = `*Title :* ${title.romaji} (${title.native})\n*Synonyms :* ${synonyms}\n*Adult :* ${isAdult}\n*Similiarity :* ${(similarity * 100).toFixed(1)}\n*Episode :* ${episode}`;
    await conn.sendFile(m.chat, image, "wait.jpg", _result, m);
};

handler.help = ['whatanime'];
handler.tags = ['anime'];
handler.command = /^(wait|whatanime|source)$/i;
handler.limit = true;
handler.register = true;

module.exports = handler;