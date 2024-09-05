/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');

const winScore = 4999;
async function handler(m) {
  this.game = this.game ? this.game : {};
  let id = "family100_" + m.chat;
  if (id in this.game) {
    this.reply(
      m.chat,
      "Masih ada kuis yang belum terjawab di chat ini",
      this.game[id].msg,
    );
    throw false;
  }
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json');
    const data = response.data;
    const randomIndex = Math.floor(Math.random() * data.length);
    const family100Data = data[randomIndex];

    const fkontak = {
      key: {
        participants: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
        fromMe: false,
        id: "Halo",
      },
      message: {
        contactMessage: {
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        },
      },
      participant: "0@s.whatsapp.net",
    };

    let caption = `
*Soal:* ${family100Data.soal}
Terdapat *${family100Data.jawaban.length}* jawaban${
      family100Data.jawaban.find((v) => v.includes(" "))
        ? `
(beberapa jawaban terdapat spasi)
`
        : ""
    }
+${winScore} XP tiap jawaban benar
    `.trim();
    this.game[id] = {
      id,
      msg: await this.reply(m.chat, caption, fkontak),
      ...family100Data,
      terjawab: Array.from(family100Data.jawaban, () => false),
      winScore,
    };
  } catch (error) {
    console.error(error);
    this.reply(m.chat, 'Terjadi kesalahan saat memuat soal', m);
  }
}
handler.help = ["family100"];
handler.tags = ["game"];
handler.command = /^family100$/i;
handler.group = true;

module.exports = handler;