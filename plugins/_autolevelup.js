/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const { color } = require('../lib/color');
const moment = require('moment-timezone');
let levelling = require('../lib/levelling');
const canvafy = require('canvafy');
let fetch = require('node-fetch');

module.exports = {
  async before(m) {
    const user = global.db.data.users[m.sender];
    const { min, xp, max } = levelling.xpRange(user.level, global.multiplier);
    const ppUrl = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://files.catbox.moe/a1wkxg.jpg');
    const pp = await (await fetch(ppUrl)).buffer();
    const curr = user.exp - min;
    const minxp = max - user.exp;

    if (!user.autolevelup) return true;

    let before = user.level;
    while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++;

    if (before !== user.level) {
      const name = user.name;
      const chating = `*L E V E L - U P*\n
*Level:* *${before}* ➠ *${user.level}*

*Role:* *${user.role}*
_Tingkatkan Kenolepan Kamu Dan Teruslah Bermain Bersama Renvy Agar Levelmu Cepat Naik :v_
`.trim();

      const shiroo = new canvafy.LevelUp()
        .setLevels(before, user.level)
        .setUsername(name)
        .setBackground('image', 'https://telegra.ph/file/0aed699be76b28e2ea3d4.jpg')
        .setAvatar(pp)
        .setBorder('#A9A9A9')
        .setAvatarBorder('#A9A9A9')
        .setOverlayOpacity(1.0);

      shiroo.build()
        .then((data) => {
          conn.sendFile(m.chat, data, 'RankCard.png', chating, m);
          console.log(color(chating, 'yellow'));
        });
    }
  },
};