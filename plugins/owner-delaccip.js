/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');

let ipList = [];

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
    ipList = JSON.parse(content);
    console.log('Fetched IP list:', ipList);
  } catch (error) {
    console.error('Error fetching IP list:', error.message);
    throw error;
  }
}

// Function to delete IP from the list and update the file
async function deleteAccIP(ip) {
  try {
    // Check if the IP exists in the list
    if (!ipList.includes(ip)) {
      throw new Error(`IP ${ip} is not in the allowed list.`);
    }

    // Remove the IP from the list
    ipList = ipList.filter(item => item !== ip);

    // Update the file on GitHub
    const data = JSON.stringify(ipList, null, 2); // Format JSON with indentation
    const updateResponse = await axios.get('https://api.github.com/repos/Panzqq/Panzqq/contents/accip', {
      headers: {
        Authorization: `Bearer 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`
      }
    });
    const sha = updateResponse.data.sha;

    await axios.put('https://api.github.com/repos/Panzqq/Panzqq/contents/accip', {
      message: `Remove IP ${ip} from accip list`,
      content: Buffer.from(data).toString('base64'),
      sha: sha
    }, {
      headers: {
        Authorization: `Bearer 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`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`IP ${ip} successfully removed from the accip list.`);
    return `IP ${ip} successfully removed from the accip list.`;
  } catch (error) {
    console.error('Error removing IP from accip list:', error.message);
    throw error;
  }
}

// Handler function
let handler = async (m, { conn, text }) => {
  try {
    await fetchAccIPs(); // Fetch the current IP list

    if (!text) {
      m.reply('Harap masukkan IP yang ingin dihapus.');
      return;
    }

    let deleteIP = text.trim();
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(deleteIP)) {
      throw 'Format IP tidak valid. Harap masukkan IP yang valid.';
    }

    await deleteAccIP(deleteIP);
    m.reply(`IP ${deleteIP} berhasil dihapus dari daftar accip: ${JSON.stringify(ipList, null, 2)}.`);
  } catch (error) {
    console.error('Error in deleteAccIP handler:', error.message);
    m.reply(`Gagal menghapus IP: ${error.message}`);
  }
};

handler.help = handler.command = ['delaccip'];
handler.tags = ['main'];
handler.owner = true; // Set handler to be owner-only

module.exports = handler;