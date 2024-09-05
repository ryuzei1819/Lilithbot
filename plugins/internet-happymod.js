/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require("axios");
const cheerio = require("cheerio");

async function happymod(query) {
    try {
        const res = await axios.get("https://unduh.happymod.com/search.html?q=" + query);
        const html = res.data;
        const $ = cheerio.load(html);
        const hsl = [];
        $('article.flex-item').each((index, element) => {
            const appName = $(element).find('h2.has-normal-font-size.no-margin.no-padding.truncate').text().trim();
            const appVersion = $(element).find('div.has-small-font-size.truncate').first().text().trim();
            const appUrl = $(element).find('a.app.clickable').attr('href');

            if (appName && appVersion && appUrl) {
                hsl.push({
                    name: appName,
                    version: appVersion,
                    url: "https://unduh.happymod.com/" + appUrl
                });
            }
        });
        return {
            status: true,
            dev: "amirul.dev",
            hsl
        };
    } catch (error) {
        return {
            status: false,
            dev: "amirul.dev",
            message: "permintaan tidak dapat diproses!!"
        };
    }
}

let handler = async (m, { conn, text }) => {
    if (!text) {
        return m.reply('Harap masukkan kata kunci pencarian.');
    }

    const result = await happymod(text);
    if (result.status && result.hsl.length > 0) {
        let message = 'Hasil pencarian untuk "' + text + '":\n\n';
        result.hsl.forEach((app, index) => {
            message += `${index + 1}. ${app.name}\nVersion: ${app.version}\nURL: ${app.url}\n\n`;
        });
        m.reply(message);
    } else {
        m.reply(result.message || 'Tidak ada hasil ditemukan.');
    }
};

handler.help = ['happymod'];
handler.command = /^happymod$/i;
handler.tags = ['internet'];

module.exports = handler;