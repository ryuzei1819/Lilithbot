/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, text }) => {
  let [_, code] = text.match(linkRegex) || [];
  if (!code) throw "*• Example :* .join *[link group]*";
  try {
    const res = await conn.groupAcceptInvite(code);
  } catch (e) {
    throw `Error`;
  } finally {
    m.reply(
      `Success Join To Group : *[ ${(await conn.groupGetInviteInfo(code)).id} ]*`,
    );
  }
};
handler.help = ["join"].map((a) => a + " *[owner only]*");
handler.tags = ["owner"];
handler.command = ["join"];
handler.owner= true;

module.exports = handler;