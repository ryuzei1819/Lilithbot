let { MessageType } = require('@whiskeysockets/baileys');

let handler = async (m, { conn, text, usedPrefix }) => {
  function no(number) {
    return number.replace(/\s/g, '').replace(/([@+-])/g, '');
  }

  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix}addprem 628816609112|100`, m);

  let hl = text.split('|');
  if (hl.length < 2) return conn.reply(m.chat, `• *Example :* ${usedPrefix}addprem 628816609112|100`, m);

  let userNumber = no(hl[0]) + "@s.whatsapp.net";
  let duration = hl[1].trim();

  if (typeof db.data.users[userNumber] === 'undefined') {
    return conn.reply(m.chat, '🚩 Pengguna tidak ada didalam data base', m);
  }

  let now = new Date().getTime();
  let premiumData = global.db.data.users[userNumber];

  if (duration.toLowerCase() === 'permanent') {
    premiumData.premium = true;
    premiumData.premiumDate = Infinity;
  } else {
    let days = parseInt(duration, 10);
    if (isNaN(days) || days <= 0) return conn.reply(m.chat, '🚩 Durasi tidak valid', m);

    let jumlahHari = 86400000 * days;

    premiumData.premium = true;
    premiumData.premiumTime = now + jumlahHari;

    if (now < premiumData.premiumDate) {
      premiumData.premiumDate += jumlahHari;
    } else {
      premiumData.premiumDate = now + jumlahHari;
    }
  }

  let message = `• *UPGRADE PREMIUM*\n\nBerhasil menambahkan akses premium kepada *@${userNumber.split('@')[0]}* selama *${duration}* hari.\n\n*Premium : ${msToDate(premiumData.premiumDate - now)}*`;
  if (duration.toLowerCase() === 'permanent') {
    message = `• *UPGRADE PREMIUM*\n\nBerhasil menambahkan akses premium kepada *@${userNumber.split('@')[0]}* dengan status *PERMANENT*.\n\n*Premium : Permanent*`;
  }

  conn.reply(m.chat, message, m, { contextInfo: { mentionedJid: [userNumber] } });
};

handler.help = ['addprem *<@tag|days|permanent>*'];
handler.tags = ['owner'];
handler.command = /^(addprem)$/i;
handler.owner = true;
handler.mods = false;
handler.fail = null;

module.exports = handler;

function msToDate(ms) {
  if (ms === Infinity) return 'Permanent';
  let days = Math.floor(ms / (24*60*60*1000));
  let daysms = ms % (24*60*60*1000);
  let hours = Math.floor(daysms / (60*60*1000));
  let hoursms = ms % (60*60*1000);
  let minutes = Math.floor(hoursms / (60*1000));
  let minutesms = ms % (60*1000);
  let sec = Math.floor(minutesms / 1000);
  return days + " days " + hours + " hours " + minutes + " minutes";
}