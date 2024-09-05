let handler = async (m, { conn, command, usedPrefix, args, text }) => {
let input = `[!] *Input salah* 🚫

Contoh: ${usedPrefix + command} rumus kimia`
	if (!text) return m.reply(input)
    axios.get('https://www.bing.com/search?q=' + text)
    .then(response => {
        const $ = cheerio.load(response.data);
        const searchResults = [];

        $('.b_algo').each((index, element) => {
            const title = $(element).find('h2').text();
            const url = $(element).find('a').attr('href');
            const description = $(element).find('.b_caption p').text();

            searchResults.push({ title, url, description });
        });
        
        let bing = `Hasil Pencarian Bing untuk: ${text}\n\n`;
        for (let g of searchResults) { 
            bing += ` *Judul*: ${g.title} 📘\n`;
            bing += ` *Deskripsi*: ${g.description} 📝\n`;
            bing += ` *Link*: ${g.url} 🔗\n\n`;
        }
        conn.sendMessage(m.chat, { text: bing, contextInfo: {
            "externalAdReply": {
                "title": 'HASIL PENCARIAN BING 🔍',
                "body": '',
                "showAdAttribution": true,
                "mediaType": 1,
                "sourceUrl": '',
                "thumbnailUrl": 'https://telegra.ph/file/3a22a7e5574face2c6eca.png',
                "renderLargerThumbnail": true
            }
        }}, { quoted: m });
    }).catch(err => {
        m.reply(`Terjadi kesalahan: ${err.message} ❌`);
    });
}

handler.help = ['bingsearch']
handler.tags = ['ai']
handler.command = /^(bings(earch)?)$/i
handler.limit = true

module.exports = handler