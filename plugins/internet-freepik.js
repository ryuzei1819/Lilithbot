/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');
const cheerio = require('cheerio');

// Fungsi untuk mengambil data gambar dari Freepik
async function freepik(q) {
    try {
        const url = `https://jp.freepik.com/photos/${q}`;
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const scriptJSON = $('script[type="application/ld+json"]').html();
        const json_data = JSON.parse(scriptJSON);

        if (!json_data) {
            console.log("JSON data not found");
            return null;
        }

        const image_info = json_data['@graph'][0]['mainEntity']['itemListElement']
            .filter(item => item['@type'] === 'ImageObject')
            .map(item => ({
                name: item.name,
                imageUrl: item.contentUrl,
                datePublished: new Date(item.datePublished).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                encodingFormat: item.encodingFormat,
                license: item.license
            }));

        return image_info;
    } catch (error) {
        console.log(`${error}`);
        return null;
    }
}

// Handler untuk mengintegrasikan dengan plugin bot WhatsApp
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (args.length === 0) {
        return m.reply(`Usage: ${usedPrefix + command} <search query>`);
    }
    
    const query = args.join(' ');
    const images = await freepik(query);
    
    if (!images || images.length === 0) {
        return m.reply('No images found. Please try again with a different query.');
    }
    
    // Mengambil gambar pertama dari hasil pencarian
    const img = images[0];
    let message = `Name: ${img.name}\n`;
    message += `Date Published: ${img.datePublished}\n`;
    message += `License: ${img.license}\n`;
    
    await conn.sendMessage(m.chat, { image: { url: img.imageUrl }, caption: message }, { quoted: m });
};

handler.help = handler.command = ["freepik"];
handler.tags = ["downloader"];

module.exports = handler;