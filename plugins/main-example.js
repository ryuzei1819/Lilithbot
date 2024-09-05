/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, {
    conn
}) => {
    let teks = `let handler = async (m, {conn}) => {
}
handler.help = handler.command = ['tes']
handler.tags = ['main']
module.exports = handler;
`
    m.reply(teks)
}
handler.help = handler.command = ['example']
handler.tags = ['main']

module.exports = handler;