/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (
  m,
  { isAdmin, isOwner, isBotAdmin, conn, args, usedPrefix, command },
) => {
  let isClose = {
    open: "not_announcement",
    buka: "not_announcement",
    on: "not_announcement",
    1: "not_announcement",
    close: "announcement",
    tutup: "announcement",
    off: "announcement",
    0: "announcement",
  }[args[0] || ""];

  if (isClose === undefined) {
    conn.sendButton(
      m.chat,
      [
        ["OPEN GROUP", `${usedPrefix + command} open`],
        ["CLOSE GROUP", `${usedPrefix + command} close`],
      ],
      m,
      {
        body: `*[ GROUP SETTING ]*`
      },
    );
    throw false;
  } else if (isClose === "announcement") {
    await conn.groupSettingUpdate(m.chat, isClose);
    let teks = `Sukses menutup grup ini!`.trim();
    m.reply(teks);
  } else if (isClose === "not_announcement") {
    await conn.groupSettingUpdate(m.chat, isClose);
    m.reply("Sukses membuka grup ini!");
  }
};

handler.help = ["group", "gc", "grup"]
handler.tags = ["group"];
handler.command = ["group", "gc", "grup"];
handler.group = true;
handler.botAdmin = true;
handler.admin = true;

module.exports = handler;