/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const xppermoney = 1;
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^nabung/i, "");
  count = count
    ? /all/i.test(count)
      ? Math.floor(global.db.data.users[m.sender].money / xppermoney)
      : parseInt(count)
    : args[0]
      ? parseInt(args[0])
      : 1;
  count = Math.max(1, count);
  if (global.db.data.users[m.sender].money >= xppermoney * count) {
    global.db.data.users[m.sender].money -= xppermoney * count;
    global.db.data.users[m.sender].atm += count;
    conn.reply(
      m.chat,
      `-Rp.${xppermoney * count} 💹\n+ ${count} 💳\n\n[ ! ] Succes menabung !`,
      m,
    );
  } else
    conn.reply(
      m.chat,
      `[❗] Uang anda tidak mencukupi untuk menabung ${count} !`,
      m,
    );
};
handler.help = ["nabung"];
handler.tags = ["rpg"];
handler.command = ["nabung"];
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;

handler.admin = false;
handler.botAdmin = false;

handler.fail = null;
handler.exp = 0;

module.exports = handler;
