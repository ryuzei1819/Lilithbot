const handler = async (m, { conn, usedPrefix, args, command }) => {
  const groups = Object.keys(conn.chats)
    .filter((key) => key.endsWith("@g.us"))
    .map((key) => conn.chats[key]);

  if (args.length === 0) {
    const list = {
      data: groups.map((group, index) => ({
        name: group.subject,
        favorites: `• ID: ${group.id}`,
        url: "",
      })),
    };

    const message = {
      body: "*Contoh:* " + `${usedPrefix + command} [nomor grup]` + "\n",
      footer: `${namebot} By ${nameown}`,
    };

    await conn.sendList(
      m.chat,
      "Pilih Grup untuk Dikeluarkan",
      list.data.map((pkg, i) => ({
        rows: [
          {
            headers: pkg.name,
            title: `• ID: ${pkg.favorites}`,
            body: pkg.url,
            command: `${usedPrefix}leavegc ${i + 1}`,
          },
        ],
      })),
      m,
      message
    );
  } else if (args.length === 1 && /^\d+$/.test(args[0])) {
    const index = parseInt(args[0]) - 1;
    if (index >= 0 && index < groups.length) {
      const group = groups[index];
      await conn.groupLeave(group.id);
      await m.reply('Bot berhasil keluar dari grup.');
    } else {
      conn.reply(m.chat, "❌ Grup dengan urutan tersebut tidak ditemukan.", m);
    }
  } else {
    conn.reply(
      m.chat,
      `❗ Format perintah salah. Gunakan "${usedPrefix}leavegc" untuk daftar grup atau "${usedPrefix}leavegc [nomor_urutan]" untuk meninggalkan grup tertentu.`,
      m,
    );
  }
};

handler.menu = ["leavegc"];
handler.tags = ["group"];
handler.command = /^(leavegc)$/i;
handler.owner = true
module.exports = handler;