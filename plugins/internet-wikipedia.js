/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function Wikipedia(query) {
    try {
        const response = await fetch(`https://id.m.wikipedia.org/w/index.php?search=${encodeURIComponent(query)}`);
        const html = await response.text();
        const $ = cheerio.load(html);

        const contentArray = [];
        $('div.mw-parser-output p').each((index, element) => {
            contentArray.push($(element).text().trim());
        });

        const infoTable = [];
        $('table.infobox tr').each((index, element) => {
            const label = $(element).find('th.infobox-label').text().trim();
            const value = $(element).find('td.infobox-data').text().trim() || $(element).find('td.infobox-data a').text().trim();
            if (label && value) {
                infoTable.push(`${label}: ${value}`);
            }
        });

        const data = {
            title: $('title').text().trim(),
            content: contentArray.join('\n'),
            image: 'https:' + ($('#mw-content-text img').attr('src') || '//pngimg.com/uploads/wikipedia/wikipedia_PNG35.png'),
            infoTable: infoTable.join('\n')
        };

        return data;
    } catch (error) {
        console.error('Error fetching Wikipedia data:', error);
        throw error;
    }
}

const handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        throw `Masukkan teks yang ingin Anda cari di Wikipedia.\nContoh: ${usedPrefix}${command} Indonesia`;
    }

    const query = args.join(" ");
    try {
        const result = await Wikipedia(query);
        // Example: sending title and content
        await conn.reply(m.chat, `*${result.title}*\n\n${result.content}`, m);
    } catch (error) {
        console.error('Error in Wikipedia handler:', error);
        await conn.reply(m.chat, `Terjadi kesalahan saat mencari informasi di Wikipedia. Silakan coba lagi nanti.`, m);
    }
};

handler.command = handler.help = ["wikipedia", "wiki"];
handler.tags = ["ai", "internet"];
module.exports = handler;