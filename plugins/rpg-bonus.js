/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn }) => {
  if (new Date - global.db.data.users[m.sender].lastclaim > 86400000) {
    conn.reply(m.chat, 'Selamat Kak, Kamu Mendapatkan: Rp.50000', m)  
    global.db.data.users[m.sender].money += 50000
    global.db.data.users[m.sender].lastclaim = new Date * 1
  } else conn.reply(m.chat, 'Anda sudah meng claim bonus', m)
}
handler.help = ['hadiah']
handler.tags = ['rpg']
handler.command = /^(bonus|hadiah)$/i
handler.register = true

module.exports = handler;