/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const moneyplus = 1;
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^atm/i, "");
  count = count
    ? /all/i.test(count)
      ? Math.floor(global.db.data.users[m.sender].money / moneyplus)
      : parseInt(count)
    : args[0]
      ? parseInt(args[0])
      : 1;
  count = Math.max(1, count);
  if (global.db.data.users[m.sender].money >= moneyplus * count) {
    global.db.data.users[m.sender].money -= moneyplus * count;
    global.db.data.users[m.sender].bank += count;
    conn.reply(m.chat, `-${moneyplus * count} Money\n+ ${count} ATM`, m);
  } else
    conn.reply(m.chat, `Money tidak mencukupi untuk menabung ${count} ATM`, m);
};
handler.help = ["atm", "atmall"];
handler.tags = ["rpg"];
handler.command = ["atm", "atmall"];

module.exports = handler;
