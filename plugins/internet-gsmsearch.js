/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');
const cheerio = require('cheerio');

let handler = async (m, { text }) => {
    if (!text) {
        throw 'Silakan masukkan query pencarian, contoh: *gsmsearch iphone*';
    }

    try {
        const results = await gsmSearch(text.trim());
        
        if (results.length === 0) {
            throw 'Tidak ada hasil ditemukan untuk query tersebut.';
        }

        let response = '*Hasil Pencarian GSM Arena*\n\n';
        results.forEach(device => {
            response += `*Nama:* ${device.name}\n`;
            response += `*Deskripsi:* ${device.description}\n`;
            response += `*Link:* ${device.id}\n\n`;
        });

        m.reply(response, null, { linkPreview: false });
    } catch (error) {
        console.error('Error:', error);
        throw 'Terjadi kesalahan saat melakukan pencarian, coba lagi nanti.';
    }
};

handler.help = ['gsmsearch'];
handler.tags = ['internet'];
handler.command = /^gsmsearch/i;

module.exports = handler;

async function gsmSearch(query) {
    try {
        const response = await axios({
            method: 'get',
            url: `https://gsmarena.com/results.php3?sQuickSearch=yes&sName=${encodeURIComponent(query)}`
        });

        const $ = cheerio.load(response.data);
        const result = [];

        const device = $('.makers').find('li');
        device.each((i, e) => {
            const img = $(e).find('img');
            result.push({
                id: $(e).find('a').attr('href').replace('.php', ''),
                name: $(e).find('span').html().split('<br>').join(' '),
                thumbnail: img.attr('src'),
                description: img.attr('title')
            });
        });

        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}