/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn, usedPrefix }) => {
  let user = global.db.data.users[m.sender];
  let cap = `*━━━ ❨ Kandang Buruan ❩ ━━┄┈*
	
=> *Berikut Kandang :*  @${m.sender.split`@`[0]}
	
*🐂 = [ ${user.banteng || "Tidak punya"} ] banteng*
*🐅 = [ ${user.harimau || "Tidak punya"} ] harimau*
*🐘 = [ ${user.gajah || "Tidak punya"} ] gajah*
*🐐 = [ ${user.kambing || "Tidak punya"} ] kambing*
*🐼 = [ ${user.panda || "Tidak punya"} ] panda*
*🐊 = [ ${user.buaya || "Tidak punya"} ] buaya*
*🐃 = [ ${user.kerbau || "Tidak punya"} ] kerbau*
*🐮 = [ ${user.sapi || "Tidak punya"} ] sapi*
*🐒 = [ ${user.monyet || "Tidak punya"} ] monyet*
*🐗 = [ ${user.babihutan || "Tidak punya"} ] babihutan*
*🐖 = [ ${user.babi || "Tidak punya"} ] babi*
*🐓 = [ ${user.ayam || "Tidak punya"} ] ayam`;

  conn.reply(m.chat, cap, m, { mentions: await conn.parseMention(cap) });
};

handler.help = ["kandang"];
handler.tags = ["rpg"];
handler.command = ["kandang"];

module.exports = handler;