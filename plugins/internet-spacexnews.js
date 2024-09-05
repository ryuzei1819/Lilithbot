/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');
const cheerio = require('cheerio');

async function fetchSpaceXNews() {
    try {
        const response = await axios.get('https://www.spacex.com/updates/');
        const $ = cheerio.load(response.data);

        return {
            status: true,
            creator: "siputzx",
            data: $('.item')
                .map((index, element) => ({
                    date: $(element).find('.date').text().trim(),
                    label: $(element).find('.label').text().trim(),
                    contents: $(element).find('.contents').text().trim(),
                    imageUrl: "https://www.spacex.com/" + $(element).find('.u-fullParent').attr('style').match(/url\(['"]?([^'"\)]+)['"]?\)/)[1]
                }))
                .get()
        };

    } catch (error) {
        throw new Error(`Error fetching SpaceX news: ${error}`);
    }
}

let handler = async (m, { conn, command }) => {
    try {
        await m.reply('🚀 Fetching the latest SpaceX news, please wait... 🌌');
        
        let news = await fetchSpaceXNews();
        
        if (news.status) {
            let message = news.data.map((article, index) => {
                return `📅 *${index + 1}. ${article.label}*\n\n📆 *Date:* ${article.date}\n📝 *Content:* ${article.contents}\n🖼️ *Image:* ${article.imageUrl}\n`;
            }).join('\n═══════════════════\n\n');
            
            await conn.sendMessage(m.chat, { text: message }, { quoted: m });
        } else {
            await m.reply('❌ Failed to fetch SpaceX news.');
        }
    } catch (e) {
        console.error(e);
        await m.reply('⚠️ Error occurred while fetching SpaceX news.');
    }
};

handler.help = ['spacexnews'];
handler.tags = ['internet'];
handler.command = /^spacexnews$/i;

module.exports = handler;