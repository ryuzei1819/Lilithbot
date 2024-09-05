/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn, text }) => {
  let user = global.db.data.users[m.sender];
  let opponent = m.mentionedJid[0];

  if (!user || !global.db.data.users[opponent]) {
    return m.reply("*Contoh*: .bertarung @user");
  }

  let betAmount = Math.floor(Math.random() * (100 - 10 + 1)) + 10;

  if (user.money < betAmount) {
    return m.reply("money Anda tidak mencukupi");
  }

  if (user.lastWar && new Date() - user.lastWar < 10000) {
    let remainingTime = Math.ceil((10000 - (new Date() - user.lastWar)) / 1000);
    return m.reply(
      `Anda harus menunggu ${remainingTime} detik sebelum dapat bertarung lagi`,
    );
  }

  m.reply("Mempersiapkan arena...");

  setTimeout(() => {
    m.reply("Mendapatkan arena...");

    setTimeout(() => {
      m.reply("Bertarung...");

      setTimeout(() => {
        let result = Math.random() >= 0.5;
        let wonAmount = result ? betAmount : -betAmount;

        user.money += wonAmount;
        global.db.data.users[opponent].money -= wonAmount;

        let opponentName = conn.getName(opponent);

        let caption = `*Hasil pertempuran:*\n\n`;
        caption += `Anda Vs ${opponentName}\n\n`;

        if (result) {
          caption += `Anda menang! +${betAmount}\n`;
          caption += `money Anda saat ini: ${user.money}\n`;
          conn.sendFile(
            m.chat,
            "https://telegra.ph/file/c8ea156b03131ed613b54.jpg",
            "You_Win.jpg",
            caption,
            m,
          );
        } else {
          caption += `Anda kalah! -${betAmount}\n`;
          caption += `money Anda saat ini: ${user.money}\n`;
          conn.sendFile(
            m.chat,
            "https://telegra.ph/file/5e043d7cd784d2bfa5b67.jpg",
            "You_Lose.jpg",
            caption,
            m,
          );
        }

        user.lastWar = new Date();

        setTimeout(() => {
          m.reply(`Anda dapat bertarung lagi setelah 5 detik`);
        }, 5000);
      }, 2000);
    }, 2000);
  }, 2000);
};

handler.help = ["bertarung @user"];
handler.tags = ["rpg"];
handler.command = /^bertarung$/i;

module.exports = handler;