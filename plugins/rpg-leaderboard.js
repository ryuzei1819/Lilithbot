/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn, args, participants }) => {
  let users = Object.entries(global.db.data.users).map(([key, value]) => {
    return { ...value, jid: key };
  });

  if (args.length === 0) {
    let text = `
✨ *Daftar leaderboard yang tersedia* ✨
1. 📈 *lb exp* - Leaderboard berdasarkan pengalaman (XP)
2. 🔋 *lb limit* - Leaderboard berdasarkan limit
3. 🆙 *lb level* - Leaderboard berdasarkan level
4. 💰 *lb money* - Leaderboard berdasarkan uang

*Contoh penggunaan:* _lb money_
`.trim();
    conn.reply(m.chat, text, m);
    return;
  }

  let category = args[0].toLowerCase();
  let len = args[1] && args[1].length > 0 ? Math.min(50, Math.max(parseInt(args[1]), 50)) : 10; // Default top 10

  let text = '';
  let mentionedJid = [];
  switch (category) {
    case 'exp':
      let sortedExp = users.map(toNumber("exp")).sort(sort("exp"));
      let usersExp = sortedExp.map(enumGetKey);
      text = `
🏆 *XP Leaderboard Top ${len}* 🏆
Kamu: *${usersExp.indexOf(m.sender) + 1}* dari *${usersExp.length}*

${sortedExp.slice(0, len).map(({ jid, exp }, i) => {
  mentionedJid.push(jid);
  return `${i + 1}. ${participants.some((p) => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : "@"}${jid.split`@`[0]} *${exp} Exp* 🌟`;
}).join`\n`}
`.trim();
      break;

    case 'limit':
      let sortedLim = users.map(toNumber("limit")).sort(sort("limit"));
      let usersLim = sortedLim.map(enumGetKey);
      text = `
🔋 *Limit Leaderboard Top ${len}* 🔋
Kamu: *${usersLim.indexOf(m.sender) + 1}* dari *${usersLim.length}*

${sortedLim.slice(0, len).map(({ jid, limit }, i) => {
  mentionedJid.push(jid);
  return `${i + 1}. ${participants.some((p) => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : "@"}${jid.split`@`[0]} *${limit} Limit* 💎`;
}).join`\n`}
`.trim();
      break;

    case 'level':
      let sortedLevel = users.map(toNumber("level")).sort(sort("level"));
      let usersLevel = sortedLevel.map(enumGetKey);
      text = `
🆙 *Level Leaderboard Top ${len}* 🆙
Kamu: *${usersLevel.indexOf(m.sender) + 1}* dari *${usersLevel.length}*

${sortedLevel.slice(0, len).map(({ jid, level }, i) => {
  mentionedJid.push(jid);
  return `${i + 1}. ${participants.some((p) => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : "@"}${jid.split`@`[0]} *Level ${level}* 📊`;
}).join`\n`}
`.trim();
      break;

    case 'money':
      let sortedMoney = users.map(toNumber("money")).sort(sort("money"));
      let usersMoney = sortedMoney.map(enumGetKey);
      text = `
💰 *Money Leaderboard Top ${len}* 💰
Kamu: *${usersMoney.indexOf(m.sender) + 1}* dari *${usersMoney.length}*

${sortedMoney.slice(0, len).map(({ jid, money }, i) => {
  mentionedJid.push(jid);
  return `${i + 1}. ${participants.some((p) => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : "@"}${jid.split`@`[0]} *Money ${money}* 💵`;
}).join`\n`}
`.trim();
      break;

    default:
      text = '⚠️ Kategori leaderboard tidak valid. Kategori yang tersedia: exp, limit, level, money ⚠️';
      break;
  }

  conn.reply(m.chat, text, m, {
    contextInfo: {
      mentionedJid
    },
  });
};

handler.help = ["leaderboard <kategori> <jumlah user>"];
handler.tags = ["rpg"];
handler.command = /^(lb)$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;

module.exports = handler;

function sort(property, ascending = true) {
  if (property)
    return (...args) =>
      args[ascending & 1][property] - args[!ascending & 1][property];
  else return (...args) => args[ascending & 1] - args[!ascending & 1];
}

function toNumber(property, _default = 0) {
  if (property)
    return (a, i, b) => {
      return {
        ...b[i],
        [property]: a[property] === undefined ? _default : a[property],
      };
    };
  else return (a) => (a === undefined ? _default : a);
}

function enumGetKey(a) {
  return a.jid;
}