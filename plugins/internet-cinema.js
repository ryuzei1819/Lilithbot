/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');
const cheerio = require('cheerio');

async function cinema() {
    try {
        const response = await axios.get('https://21cineplex.com/');
        const html = response.data;
        const $ = cheerio.load(html);

        const results = [];

        $('.col-3 .movie').each((index, element) => {
            const movieTitle = $(element).find('.movie-desc h4').text().trim();
            const movieLabel = $(element).find('.movie-desc span.movie-label img').attr('src');
            const moviePoster = $(element).find('.movie-poster img').attr('src');
            const movieLink = $(element).find('a').attr('href');

            const data = {
                title: movieTitle,
                label: movieLabel,
                poster: moviePoster,
                link: movieLink
            };

            results.push(data);
        });

        return results;
    } catch (error) {
        console.error(error);
        return [];
    }
}

let handler = async (m, { conn }) => {
    try {
        const movies = await cinema();
        
        if (movies.length === 0) {
            return m.reply('Tidak ada hasil yang ditemukan.');
        }
        
        let response = '*Daftar Film di 21 Cineplex*\n\n';
        
        movies.forEach((movie, index) => {
            response += `*${index + 1}. ${movie.title}*\n`;
            response += `Label: ${movie.label}\n`;
            response += `Poster: ${movie.poster}\n`;
            response += `Link: ${movie.link}\n\n`;
        });

        m.reply(response);
    } catch (error) {
        console.error('Error in cinema handler:', error);
        m.reply('Terjadi kesalahan saat mengambil data film dari 21 Cineplex.');
    }
};

handler.command = handler.help = ['cinema'];
handler.tags = ['internet'];
handler.limit = true;

module.exports = handler;