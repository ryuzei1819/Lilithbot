const axios = require('axios');
const cheerio = require('cheerio');

// Function to scrape anime details
async function p(link) {
    try {
        const zaenishi = await axios.get(link);
        const $ = cheerio.load(zaenishi.data);

        const judul = $('div.infozingle span b').filter((index, element) => $(element).text().includes('Judul')).parent().text().trim().split(': ')[1];
        const skor = $('div.infozingle span b').filter((index, element) => $(element).text().includes('Skor')).parent().text().trim().split(': ')[1];
        const produser = $('div.infozingle span b').filter((index, element) => $(element).text().includes('Produser')).parent().text().trim().split(': ')[1];
        const tipe = $('div.infozingle span b').filter((index, element) => $(element).text().includes('Tipe')).parent().text().trim().split(': ')[1];
        const status = $('div.infozingle span b').filter((index, element) => $(element).text().includes('Status')).parent().text().trim().split(': ')[1];
        const studio = $('div.infozingle span b').filter((index, element) => $(element).text().includes('Studio')).parent().text().trim().split(': ')[1];
        const rilis = $('div.infozingle span b').filter((index, element) => $(element).text().includes('Tanggal Rilis')).parent().text().trim().split(': ')[1];
        const episode = $('div.infozingle span b').filter((index, element) => $(element).text().includes('Total Episode')).parent().text().trim().split(': ')[1];

        let sinopsis = '';
        $('.sinopc p').each((index, element) => {
            sinopsis += $(element).text().trim() + '\n';
        });

        const genreArray = [];
        $('div.infozingle span b').filter((index, element) => $(element).text().includes('Genre')).siblings('a').each((index, element) => {
            genreArray.push($(element).text().trim());
        });
        const genre = genreArray.join(', ');

        return {
            judul,
            skor,
            produser,
            tipe,
            status,
            studio,
            rilis,
            episode,
            genre,
            sinopsis: sinopsis.trim()
        };
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Command Handler
let handler = async (m, { conn, command, text }) => {
    const validUrlPattern = /^https:\/\/otakudesu\.cloud\/anime\/.+\/$/;

    if (!text) {
        return m.reply('Please provide an Otaku link.');
    }

    if (!validUrlPattern.test(text)) {
        return m.reply('Please provide a valid Otaku link.');
    }

    const animeDetails = await p(text);
    if (!animeDetails) return m.reply('Failed to fetch anime details.');

    const {
        judul,
        skor,
        produser,
        tipe,
        status,
        studio,
        rilis,
        episode,
        genre,
        sinopsis
    } = animeDetails;

    const response = `
    *Title*: ${judul}
    *Score*: ${skor}
    *Producer*: ${produser}
    *Type*: ${tipe}
    *Status*: ${status}
    *Studio*: ${studio}
    *Release Date*: ${rilis}
    *Episodes*: ${episode}
    *Genre*: ${genre}
    *Synopsis*:
    ${sinopsis}
    `.trim();

    // Send the details as a text message
    m.reply(response);
};

handler.help = ['otakudetail'];
handler.command = /^(otakudetail)$/i;
handler.tags = ['anime'];

module.exports = handler;