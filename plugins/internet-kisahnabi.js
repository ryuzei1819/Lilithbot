/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');

const handler = async (m, { conn, text }) => {
    if (!text) throw `🕌 *Nama Nabinya?*`;
    
    try {
        let url = await fetch(`https://raw.githubusercontent.com/ZeroChanBot/Api-Freee/a9da6483809a1fbf164cdf1dfbfc6a17f2814577/data/kisahNabi/${text.toLowerCase()}.json`);
        let kisah = await url.json().catch(_ => "Error");
        
        if (kisah === "Error") {
            throw "🚫 *Not Found*\n*Coba Jangan Gunakan Huruf Kapital*";
        }
        
        let hasil = `🕌 *Nama Nabi :* ${kisah.name}\n`
                  + `📅 *Tanggal Lahir :* ${kisah.thn_kelahiran}\n`
                  + `📍 *Tempat Lahir :* ${kisah.tmp}\n`
                  + `👤 *Usia :* ${kisah.usia}\n\n`
                  + `📜 *K I S A H* 📜\n\n${kisah.description}`;
        
        conn.reply(m.chat, hasil, m);
    } catch (error) {
        console.error(error);
        throw "Terjadi kesalahan saat mengambil data";
    }
};

handler.help = ['kisahnabi'];
handler.tags = ['internet'];
handler.command = /^kisahnabi$/i;
handler.register = false;
handler.limit = true;

module.exports = handler;