/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let fs = require('fs')
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} menu`, m)
    try {
    if (!m.quoted.text) return conn.reply(m.chat, `🚩 Reply Code Message!`, m)
    let path = `plugins/${text}.js`
    await fs.writeFileSync(path, m.quoted.text)
    m.reply ('sukses') 
   } catch (error) {
    console.log(error)
    conn.reply(m.chat, "🚩 Reply Code Message!", m)
  }
}
handler.help = ['sf'].map(v => v + ' *<text>*')
handler.tags = ['owner']
handler.command = /^sf$/i

handler.rowner = true
module.exports = handler;