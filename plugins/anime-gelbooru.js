/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');
const cheerio = require('cheerio');

// Fungsi untuk mendapatkan gambar dari Gelbooru
async function gelbooru(q) {
    try {
        const response = await axios.get(`https://gelbooru.com/index.php?page=post&s=list&tags=${encodeURIComponent(q)}`);
        const html = response.data;
        const $ = cheerio.load(html);
        let images = [];

        $('.thumbnail-preview').each((index, element) => {
            const link = $(element).find('a').attr('href');
            const imgSrc = $(element).find('img').attr('src');
            const title = $(element).find('img').attr('title');
            const alt = $(element).find('img').attr('alt');

            images.push({
                link: link ? `https://gelbooru.com/${link}` : null,
                imgSrc: imgSrc || null,
                title: title || null,
                alt: alt || null
            });
        });

        return { 
            status: true, 
            creator: "siputzx", 
            data: images 
        };
    } catch (error) {
        console.error('Error fetching images:', error);
        return { status: false, error: 'Error fetching images' };
    }
}

// Handler untuk mengintegrasikan dengan plugin
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Usage: ${usedPrefix + command} <query>`;
    m.reply('Searching for images, please wait...');

    let result = await gelbooru(text);

    if (!result.status || result.data.length === 0) {
        return m.reply('No results found.');
    }

    // Mengambil hasil pertama dari array images
    let image = result.data[0];
    if (!image.imgSrc) {
        return m.reply('No valid image found.');
    }

    await conn.sendFile(m.chat, image.imgSrc, 'image.jpg', `Title: ${image.title || 'N/A'}\nAlt: ${image.alt || 'N/A'}\nLink: ${image.link}`, m);
};

handler.command = ['gelbooru'];
handler.help = ['gelbooru <query>'];
handler.tags = ['anime'];
handler.limit = true;

module.exports = handler;