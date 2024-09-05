/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn, command, text }) => {
	
    if (!text) return conn.reply(m.chat, '✎ ᴍᴀsᴜᴋᴋᴀɴ ɴᴀᴍᴀɴʏᴀ', m)
	
  conn.reply(m.chat, `
╭━━━━°「 *Memek ${text}* 」°
┃
┊• Nama : ${text}
┃• memek : ${pickRandom(['ih item','Belang wkwk','Muluss','Putih Mulus','Black Doff','Pink wow','Item Glossy'])}
┊• lubang : ${pickRandom(['perawan','ga perawan','udah pernah dimasukin','masih rapet','tembem'])}
┃• jembut : ${pickRandom(['lebat','ada sedikit','gada jembut','tipis','muluss'])}
╰═┅═━––––––๑
`.trim(), m)
}
handler.help = ['cekmemek <nama>']
handler.tags = ['fun']
handler.premium = false
handler.command = /^cekmemek/i

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

module.exports = handler