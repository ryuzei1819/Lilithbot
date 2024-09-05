const fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    const num = m.quoted?.sender || m.mentionedJid?.[0] || m.sender;
    const user = global.db.data.users[num];

  let ppUrl = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/i97i4t.jpg')
    let pp = await (await fetch(ppUrl)).buffer();
    
    let name = user.name || "Unknown";
    let umur = user.age || "Tidak diketahui";
    let register = user.registered ? "_Sudah daftar_" : "_Belum Daftar_";
    let premium = user.premium ? "✅" : "❎";
    let premiumDate = isNaN(user.premiumDate) ? user.premiumDate : `${(await Func.toDate(user.premiumDate)) || "Tidak ada waktu durasi"}`;
    let pasangan = user.pasangan ? `@${user.pasangan.split('@')[0]}` : "Tidak ada";
    let exp = user.exp || 0;
    let money = user.money || 0;
    let limit = user.limit || 0;

    let caption = `
*[ PROFILE USER ]*
*• Name:* ${name}
*• Umur:* _${umur}_
*• Url WhatsApp:* wa.me/${num.split('@')[0]}
*• Tag Users:* @${num.split('@')[0]}
*• Status Premium:* ${premium}
*• Durasi Premium:* ${premiumDate || "Tidak ada waktu durasi"}
*• Pasangan:* ${pasangan}
*• Exp:* ${exp}
*• Money:* ${money}
*• Limit:* ${limit}
    `.trim();

    m.reply(caption, pp);

  } catch (e) {
    console.error(e);
    m.reply("Terjadi kesalahan saat mengambil profil pengguna.");
  }
};

handler.help = ["profile"];
handler.tags = ["info"];
handler.command = ["profile", "profil", "me"];
module.exports = handler;