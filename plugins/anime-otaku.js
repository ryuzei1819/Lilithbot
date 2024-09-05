const axios = require('axios');
const cheerio = require('cheerio');

async function anu(search) {
  const url = 'https://otakudesu.cloud/?s=' + search + '&post_type=anime';

  try {
    let response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const results = [];

    $('ul.chivsrc li').each((index, element) => {
      const title = $(element).find('h2 a').text();
      const link = $(element).find('h2 a').attr('href');
      const image = $(element).find('img').attr('src');
      const genres = [];

      $(element).find('.set a').each((i, el) => {
        genres.push($(el).text());
      });

      const status = $(element).find('.set:contains("Status")').text().replace('Status : ', '');
      const rating = $(element).find('.set:contains("Rating")').text().replace('Rating : ', '');

      results.push({ title, link, image, genres, status, rating });
    });

    return results;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

let otakuSearch = async (m, { text }) => {
  if (!text) return m.reply('Please provide a search term. Example: !otaku bleach');

  try {
    const results = await anu(text);

    if (results.length === 0) {
      return m.reply('No results found.');
    }

    let message = 'Anime Search Results:\n\n';
    results.forEach((result, index) => {
      message += `Title: ${result.title}\n`;
      message += `Link: ${result.link}\n`;
      message += `Genres: ${result.genres.join(', ')}\n`;
      message += `Status: ${result.status}\n`;
      message += `Rating: ${result.rating}\n\n`;
    });

    const topResult = results[0];

    await conn.sendMessage(m.chat, {
      image: { url: topResult.image },
      caption: message
    });

  } catch (error) {
    m.reply('An error occurred while fetching data.');
  }
};

otakuSearch.help = otakuSearch.command = ['otaku', 'animesearch'];
otakuSearch.tags = ['anime'];

module.exports = otakuSearch;