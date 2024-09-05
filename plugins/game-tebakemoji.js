/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let timeout = 120000;
let poin = 4999;
let handler = async (m, { conn, command, usedPrefix }) => {
    let imgr = "https://emoji.aranja.com/static/emoji-data/img-apple-160/";

    conn.tebakemoji = conn.tebakemoji ? conn.tebakemoji : {};
    let id = m.chat;
    if (id in conn.tebakemoji) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakemoji[id][0]);
        throw false;
    }
    let src = await (await fetch('https://emoji-api.com/emojis?access_key=b4ffa498efe78f58a01079e1c5fe516913f92a5a')).json();
    let json = src[Math.floor(Math.random() * src.length)];

    // Periksa dan debug URL gambar
    let imgUrl = imgr + json.codePoint.toLowerCase() + ".png";
    console.log('Generated Image URL:', imgUrl); // Tambahkan log untuk debug

    let caption = `*${command.toUpperCase()}*
*Emoji apakah ini:* ${json.character}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hemo untuk bantuan
Bonus: ${poin} XP
    `.trim();
    
    conn.tebakemoji[id] = [
        await conn.sendFile(m.chat, imgUrl, '', caption, m).catch(err => {
            console.error('Error sending file:', err); // Tambahkan log error
            conn.reply(m.chat, 'Gambar tidak ditemukan atau terjadi kesalahan saat mengambil gambar.', m);
            delete conn.tebakemoji[id];
        }),
        json, poin,
        setTimeout(() => {
            if (conn.tebakemoji[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${(json.unicodeName)}*`, conn.tebakemoji[id][0]);
            delete conn.tebakemoji[id];
        }, timeout)
    ];
};

handler.help = ['tebakemoji'];
handler.tags = ['game'];
handler.command = /^tebakemoji/i;

module.exports = handler;

const buttons = [
    ['Hint', '/hemo'],
    ['Nyerah', 'menyerah']
];