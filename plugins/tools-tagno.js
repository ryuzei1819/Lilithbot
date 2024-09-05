/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn, text, usedPrefix, command }) => {
      let caption = "@" + text.split("@")[0] 
await conn.reply(m.chat, caption, null, {
      contextInfo: {
            mentionedJid: conn.parseMention(caption),
            groupMentions: [],
      }
    });
}
handler.help = ["tagno"].map(a => a + " *[tag nomor orang]*")
handler.tags = ["tools"]
handler.command = ["tagno"]
handler.limit = true

module.exports = handler