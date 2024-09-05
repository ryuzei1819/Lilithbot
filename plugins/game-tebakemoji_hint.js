/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn }) => {
    conn.tebakemoji = conn.tebakemoji ? conn.tebakemoji : {}
    let id = m.chat
    if (!(id in conn.tebakemoji)) throw false
    let json = conn.tebakemoji[id][1]
    conn.reply(m.chat, '```' + (json.unicodeName).replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hemo$/i
handler.limit = true
module.exports = handler;