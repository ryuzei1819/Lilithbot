/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch'); 
async function searchSubdomains(domain) {
    const url = `https://crt.sh/?q=${domain}&output=json`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const subdomains = data.map(entry => entry.name_value);
        const uniqueSubdomains = [...new Set(subdomains)];
        uniqueSubdomains.sort();
        
        return uniqueSubdomains;
    } catch (error) {
        console.error('Error fetching subdomains:', error);
        return null;
    }
}

let handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.reply(m.chat, 'Harap masukkan domain utama yang ingin dicari subdomainnya.', m);
    }

    const domain = text.trim().replace(/^https?:\/\//, '');
    const subdomains = await searchSubdomains(domain);

    if (subdomains) {
        const message = subdomains.join('\n');
        const total = subdomains.length;
        conn.reply(m.chat, `Ditemukan ${total} subdomain untuk ${domain}:\n\n${message}`, m);
    } else {
        conn.reply(m.chat, 'Tidak ada hasil yang ditemukan atau terjadi kesalahan.', m);
    }
};

handler.help = handler.command = ['searchsubdo','ceksubdo'];
handler.tags = ['tools'];

module.exports = handler;