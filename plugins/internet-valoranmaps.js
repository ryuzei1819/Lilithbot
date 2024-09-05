/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

/*
This feature created by Lorenzo 
Don't delete credits ok 🙂‍↔️ 
*/

const fetch = require('node-fetch');

const getValorantMapInfo = async (text) => {
    try {
        let response = await fetch('https://valorant-api.com/v1/maps');
        let data = await response.json();
        let maps = data.data;
        let map = maps.find(map => map.displayName.toLowerCase() === text.toLowerCase());

        return map;
    } catch (error) {
        console.error('Error fetching Valorant maps:', error);
        throw 'Terjadi kesalahan saat mengambil data peta Valorant.';
    }
};


const handler = async (m, { conn, text, command, prefix }) => {
    if (!text) {
        return conn.reply(m.chat, `Contoh: ${command} Ascent`, m);
    }

    try {
        let map = await getValorantMapInfo(text);

        if (!map) {
            return conn.reply(m.chat, `Peta dengan nama ${text} tidak ditemukan.`, m);
        }

        let caption = `
UUID: ${map.uuid || 'N/A'}
Name: ${map.displayName || 'N/A'}
Tactical Description: ${map.tacticalDescription || 'N/A'}
Coordinates: ${map.coordinates || 'N/A'}
        `;

        conn.sendMessage(m.chat, { image: { url: map.splash }, caption: caption.trim() }, { quoted: m });
    } catch (e) {
        console.error('Error in handling valorant-maps command:', e);
        conn.reply(m.chat, 'Terjadi kesalahan dalam menjalankan perintah.', m);
    }
};


handler.command = ['valorant-maps','valomaps'];
handler.help = ['valorant-maps <nama_peta>'];
handler.tags = ['internet'];

module.exports = handler;