let { Saweria } = require("../lib/saweria.js");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `*🔧 Contoh:* ${usedPrefix + command} *[username, password]*`;
  }

  let [username, password] = text.split(",");
  try {
    let sawer = new Saweria();
    let result = await sawer.login(username, password);
    db.data.saweria = result.data.user_id;
    m.reply(`*✅ Sukses Masuk ke Saweria!* 🎉\n\n🆔 ID Pengguna: *${result.data.user_id}*`);
  } catch (e) {
    m.reply(`*❌ Gagal Masuk:* ${e.message}`);
    console.error(e);
  }
};

handler.help = ["login"].map((a) => a + " *[Login ke Saweria]*");
handler.tags = ["store"];
handler.command = ["login"];
handler.owner = true;

module.exports = handler;