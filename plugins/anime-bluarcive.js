/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[character name]*`;
  m.reply("Please wait..."); // Updated the wait message to be more clear
  try {
    let a = await Func.fetchJson(
      "https://api.ennead.cc/buruaka/character/" + text.toLowerCase(),
    );
    if (a.StatusCode) {
      m.reply("*Character Not Found*");
    } else {
      let cap = `*[ BLUE ARCHIVE INFORMATION ]*
*• Name :* ${a.character.name}
*• Age :* ${a.info.age}
*• Height :* ${a.info.height}
*• School :* ${a.info.school}
*• Year :* ${a.info.schoolYear}
*• Club :* ${a.info.club}
*• Birth Date :* ${a.info.birthDate}

*• Base Star :* ${a.character.baseStar}
*• Rank :* ${a.character.rarity}
*• Role :* ${a.character.role}
*• Type :*
* Squad : ${a.character.squadType}
* Weapon : ${a.character.weaponType}
* Bullet : ${a.character.bulletType}
* Armor : ${a.character.armorType}`;
      m.reply(cap, a.image.portrait);
    }
  } catch (e) {
    m.reply(`*[ TIDAK ADA RESULT]*`);
  }
};

handler.help = handler.command = ["ba", "bluearchive"]
handler.tags = ["anime"];

module.exports = handler;