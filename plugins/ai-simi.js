/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) {
    throw `*• Example:* ${usedPrefix + command} *[question]*`;
  }
  try {
    const simiData = await askSimsimi(text);
    let hasil = ` *[ 💬 ]* ${simiData}`;
    m.reply(hasil);
  } catch (e) {
    throw "Maaf, aku tidak mengerti";
  }
};

handler.help = ["simi"]
handler.tags = ["ai"];
handler.command = ["simi"];
handler.premium = false;

module.exports = handler;

async function askSimsimi(text) {
  const url = 'https://simsimi.vn/web/simtalk';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
    Referer: 'https://simsimi.vn/'
  };

  try {
    const response = await axios.post(url, `text=${encodeURIComponent(text)}&lc=id`, { headers });
    return response.data.success;
  } catch (error) {
    console.error('Error asking SimSimi:', error);
    throw error;
  }
}

// Example usage: