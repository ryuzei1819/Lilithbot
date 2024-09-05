/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m) => {
  let poin = global.db.data.users[m.sender].poin || 0
  m.reply(`Poin kamu: ${poin}`)
}

handler.help = ['cekpoin']
handler.tags = ['rpg']
handler.command = /^cekpoin$/i
handler.register = true
handler.limit = true

module.exports = handler