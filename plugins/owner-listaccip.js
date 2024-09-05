/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');

// Function to fetch IP list from the URL
async function fetchAccIPs() {
  try {
    const response = await axios.get('https://api.github.com/repos/Panzqq/Panzqq/contents/accip', {
      headers: {
        Authorization: `Bearer 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`
      }
    });
    // Parse the JSON string
    const content = Buffer.from(response.data.content, 'base64').toString();
    const ipList = JSON.parse(content);
    return ipList;
  } catch (error) {
    console.error('Error fetching IP list:', error.message);
    throw error;
  }
}

// Handler function
let handler = async (m, { conn }) => {
  try {
    const ipList = await fetchAccIPs(); // Fetch the current IP list
    if (ipList.length === 0) {
      m.reply('Daftar IP yang diizinkan kosong.');
      return;
    }
    const ipListFormatted = ipList.join('\n');
    m.reply(`Daftar IP yang diizinkan:\n${ipListFormatted}`);
  } catch (error) {
    console.error('Error in listAccIP handler:', error.message);
    m.reply(`Gagal mengambil daftar IP: ${error.message}`);
  }
};

handler.help = handler.command = ['listaccip'];
handler.tags = ['main'];
handler.owner = true; // Set handler to be owner-only

module.exports = handler;