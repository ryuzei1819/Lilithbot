/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const { generateWAMessage, proto, areJidsSameUser } = require("@whiskeysockets/baileys")

let handler = async (m, { conn, text, usedPrefix, command, chatUpdate }) => {
   let who = m.mentionedJid[0]
    if (!who) throw `*• Contoh :* ${usedPrefix + command} *[@user command]*`
 if (!text) throw `*• Contoh :* ${usedPrefix + command} *[@user command]*`
   try {
   const keyword = text.split(" ")[0];
  const data = text.slice(keyword.length + 1);
    let messages = await generateWAMessage(
      m.chat,
      {
        text: data,
        mentions: m.mentionedJid,
      },
      {
        userJid: conn.user.id,
        quoted: m.quoted && m.quoted.fakeObj,
      },
    );
    messages.key.fromMe = areJidsSameUser(who, conn.user.id);
    messages.key.id = who;
    messages.pushName = await conn.getName(who);
    if (m.isGroup) messages.participant = who;
    let msg = {
      ...chatUpdate,
      messages: [proto.WebMessageInfo.fromObject(messages)],
      type: "append",
    };
    conn.ev.emit("messages.upsert", msg);
  } catch(e) {
 throw e 
}
}
handler.help = ["sudo"]
handler.tags = ["owner"]
handler.command = ["sudo"]
handler.owner = true
handler.group = true 

module.exports = handler