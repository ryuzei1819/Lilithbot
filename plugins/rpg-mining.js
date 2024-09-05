/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const timeout = 28800000;

let handler = async (m, { conn, usedPrefix, text }) => {
  let time = global.db.data.users[m.sender].lastnambang + timeout;
  if (new Date() - global.db.data.users[m.sender].lastnambang < timeout) {
    let remainingTime = time - new Date();
    throw `Anda sudah menambang\nMohon tunggu hasil pertambanganmu\nTunggu selama ${msToTime(remainingTime)} lagi ⏳`;
  }

  let berlians = `${Math.floor(Math.random() * 3)}`.trim();
  let emasbiasas = `${Math.floor(Math.random() * 4)}`.trim();
  let emasbatangs = `${Math.floor(Math.random() * 3)}`.trim();
  let emerald = `${Math.floor(Math.random() * 2)}`.trim();
  let iron = `${Math.floor(Math.random() * 5)}`.trim();
  
  global.db.data.users[m.sender].berlian += berlians * 1;
  global.db.data.users[m.sender].emas += emasbiasas * 1;
  global.db.data.users[m.sender].diamond += emasbatangs * 1;
  global.db.data.users[m.sender].emerald += emerald * 1;
  global.db.data.users[m.sender].iron += iron * 1;
  global.db.data.users[m.sender].tiketcoin += 1;
  global.db.data.users[m.sender].lastnambang = new Date() * 1;

  setTimeout(() => {
    conn.reply(m.chat, `Waktunya nambang lagi kak 😅`, m);
  }, timeout);

  await conn.reply(
    m.chat,
    `Selamat kamu mendapatkan:\n💎 +${berlians} Berlian\n🪙 +${emasbiasas} Emas\n💠 +${emasbatangs} Diamond\n💚 +${emerald} Emerald\n🔩 +${iron} Iron\n\n+1 Tiketcoin`,
    m
  );
};

handler.help = ["nambang", "mining"];
handler.tags = ["rpg"];
handler.command = /^(nambang|mining)/i;
handler.group = true;
handler.fail = null;
handler.limit = true;
handler.exp = 0;
handler.money = 0;

module.exports = handler;

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + " jam " + minutes + " menit " + seconds + " detik";
}