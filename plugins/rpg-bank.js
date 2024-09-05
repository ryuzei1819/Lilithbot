/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  const caption = `
⛊「 *B A N K  U S E R* 」
│ 📛 *Name:* ${user.registered ? user.name : conn.getName(m.sender)}
│ 🏛️ *atm:* ${user.bank} 💲
│ 💹 *Money:* ${user.money} 💲
│ 🚩 *Limit* ${global.db.data.users[m.sender].limit}
│ 🌟 *Status:* ${user.premiumDate ? "Premium" : "Free"}
│ 📑 *Registered:* ${user.registered ? "Yes" : "No"}
╰──┈┈⭑
${wm}
`.trim();
  await conn.sendMessage(
    m.chat,
    {
      text: caption,
      contextInfo: {
        externalAdReply: {
          title: "BANK USER",
          body: "Info bank user bot",
          thumbnailUrl: "https://telegra.ph/file/8172419ad03cd5782f12d.jpg",
          sourceUrl: "",
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    },
    { quoted: m },
  );
};
handler.help = ["bank"];
handler.tags = ["rpg"];
handler.command = ["bank"];

handler.register = false;
module.exports = handler;