/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');

const handler = async (m, { conn, text, command, prefix }) => {
    if (!text) return m.reply(`Example ${command} Vandal`);
    
    try {
        let response = await fetch('https://valorant-api.com/v1/weapons');
        let data = await response.json();
        let weapons = data.data;

        let weapon = weapons.find(weapon => weapon.displayName.toLowerCase() === text.toLowerCase());

        if (!weapon) return m.reply(`Senjata dengan nama ${text} tidak ditemukan`);

        let caption = `
UUID: ${weapon.uuid || 'N/A'}
Name: ${weapon.displayName || 'N/A'}
Category: ${weapon.category || 'N/A'}
Default Skin: ${weapon.defaultSkinUuid || 'N/A'}
Cost: ${weapon.shopData ? weapon.shopData.cost : 'N/A'}
Damage Ranges: ${weapon.weaponStats ? weapon.weaponStats.damageRanges.map(damage => `
    Range: ${damage.rangeStartMeters}-${damage.rangeEndMeters} meters
    Head Damage: ${damage.headDamage}
    Body Damage: ${damage.bodyDamage}
    Leg Damage: ${damage.legDamage}
`).join('\n') : 'N/A'}
        `;

        conn.sendMessage(m.chat, { image: { url: weapon.displayIcon }, caption: caption.trim() }, { quoted: m });
    } catch (e) {
        m.reply('error');
    }
};

handler.help = ['valorant-weapons'];
handler.command = ['valorant-weapons', 'vwp'];
handler.tags = ['internet'];

module.exports = handler;