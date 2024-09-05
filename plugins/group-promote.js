/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { teks, conn, isOwner, isAdmin, args }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail("admin", m, conn);
    throw false;
  }
  let ownerGroup = m.chat.split`-`[0] + "@s.whatsapp.net";
  if (m.quoted) {
    if (m.quoted.sender === ownerGroup || m.quoted.sender === conn.user.jid)
      return;
    let usr = m.quoted.sender;
    await conn.groupParticipantsUpdate(m.chat, [usr], "promote");
    return;
  }
  if (!m.mentionedJid[0]) throw `tag yang mau di promote`;
  let users = m.mentionedJid.filter(
    (u) => !(u == ownerGroup || u.includes(conn.user.jid)),
  );
  for (let user of users)
    if (user.endsWith("@s.whatsapp.net"))
      await conn.groupParticipantsUpdate(m.chat, [user], "promote");
};

handler.help = ["promote @user"];
handler.tags = ["group"];
handler.command = /^(promote)$/i;

handler.group = true;
handler.botAdmin = true;

module.exports = handler;