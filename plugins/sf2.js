/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { text, usedPrefix, command }) => {

    if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} plugins/menu.js`, m)
    try {
    if (!m.quoted.text) throw `reply code`
    let path = `${text}`
    await require('fs').writeFileSync(path, m.quoted.text)
  var name = m.sender
  await conn.reply(m.chat, `Saved ${path} to file!`, m)
  } catch (error) {
    console.log(error)
    m.reply("🚩 Reply Code Lol_-")
  }
}

handler.help = ['savefile2', 'sf2'].map(v => v + ' *<text>*')
handler.tags = ['owner']
handler.command = ['savefile2', 'sf2']

handler.owner = true
module.exports = handler