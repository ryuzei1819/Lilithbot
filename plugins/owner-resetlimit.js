/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn, args }) => {
    let list = Object.entries(global.db.data.users)
    let lim = !args || !args[0] ? 500 : isNumber(args[0]) ? parseInt(args[0]) : 500
    lim = Math.max(1, lim)
    list.map(([user, data], i) => (Number(data.limit = lim)))
    conn.reply(m.chat, `*Berhasil direset ${lim} / user*`, m)
}

handler.help = ['limit'].map(v => 'reset' + v)
handler.tags = ['owner']
handler.command = /^(resetlimit)$/i

handler.owner = true

module.exports = handler

function isNumber(x = 0) {
  x = parseInt(x)
  return !isNaN(x) && typeof x == 'number'
}