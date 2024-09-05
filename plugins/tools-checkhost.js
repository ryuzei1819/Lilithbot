/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');
const cheerio = require('cheerio');

let handler = async (m, { conn, text }) => {
  try {
    let urls = [];
    
    if (m.quoted && m.quoted.text) {
      urls = m.quoted.text.match(/\bhttps?:\/\/\S+/gi);
    } else if (text) {
      urls = text.match(/\bhttps?:\/\/\S+/gi);
    }

    if (!urls || urls.length === 0) {
      throw new Error('Silakan masukkan URL yang ingin Anda periksa.');
    }

    const { results } = await checkHost(urls);

    let reply = 'Hasil:\n';
    results.forEach(result => {
      reply += `${result.url}: ${result.statusCode}\n`;
    });

    conn.reply(m.chat, reply, m);
  } catch (error) {
    m.reply(`Terjadi kesalahan: ${error.message}`);
  }
};

handler.help = ["checkhost"].map((a) => a + " *Check Status Code Website*");
handler.command = /^checkhost$/i;
handler.tags = ['tools'];

async function checkHost(urls) {
  try {
    const response = await fetch('https://www.tomanthony.co.uk/tools/bulk-http-header-compare/process.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ urls: urls.join('\n') }),
    });

    if (!response.ok) {
      throw new Error('Gagal mengakses Tomanthony');
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const results = [];

    $('table').each((i, table) => {
      $(table).find('tbody tr').each((j, row) => {
        const url = $(row).find('td:nth-child(1)').text().trim();
        const statusCode = $(row).find('td:nth-child(2)').text().trim();
        if (url && statusCode) {
          results.push({ url, statusCode });
        }
      });
    });

    if (results.length === 0) {
      throw new Error('Tidak ada hasil yang ditemukan.');
    }

    return { results };
  } catch (error) {
    throw new Error(`Gagal memeriksa host: ${error.message}`);
  }
}

module.exports = handler;