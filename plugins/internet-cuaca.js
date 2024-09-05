/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');

const handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Penggunaan:\n${usedPrefix + command} <teks>\n\nContoh:\n${usedPrefix + command} Jakarta`;

    const waitMessage = 'Mohon tunggu...';  // Ganti dengan pesan menunggu yang sesuai
    await m.reply(waitMessage);
    
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`;
        const res = await fetch(apiUrl);

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Lokasi tidak ditemukan');
        }
        
        const json = await res.json();
        
        const teks = `乂 *C U A C A*
        
Lokasi: ${json.name}
Negara: ${json.sys.country}
Cuaca: ${json.weather[0].description}
Suhu saat ini: ${json.main.temp} °C
Suhu tertinggi: ${json.main.temp_max} °C
Suhu terendah: ${json.main.temp_min} °C
Kelembapan: ${json.main.humidity} %
Angin: ${json.wind.speed} km/jam
        `;
        
      
        
        await conn.sendMessage(m.chat, {
            text: teks,
            contextInfo: {
                "externalAdReply": {
                    "title": namebot,
                    "body": command + ' ' + text,
                    "showAdAttribution": true,
                    "previewType": "PHOTO",
                    "sourceUrl": '',
                    "thumbnailUrl": thumb,
                }
            }
        });
    } catch (error) {
        await m.reply(`Terjadi kesalahan: ${error.message}`);
        console.error('Error in weather handler:', error);
    }
};

handler.help = ['cuaca'];
handler.tags = ['internet'];
handler.command = /^(cuaca|weather)$/i;
handler.limit = true;

module.exports = handler;