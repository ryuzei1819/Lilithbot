/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');
const cheerio = require('cheerio');

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia?`;
await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
  let hasil = await useadrenaline(text)
  await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
  await conn.sendMessage(m.chat, {
    text: hasil,
    contextInfo: {
      externalAdReply: {  
        title: "A I  O P E N A I",
        body: '',
        thumbnailUrl: 'https://files.catbox.moe/br773n.png',
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
};
handler.command = handler.help = ['ai2'];
handler.tags = ['ai'];
handler.premium = false;
handler.register = true
module.exports = handler;

const axiosInstance = axios.create({
  baseURL: 'https://gke-prod-api.useadrenaline.com/',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'x-instance': 'adrenaline'
  }
});

/*
   * Scraper By QanyPaw
   * Forbidden to sell and delete my wm
*/

async function useadrenaline(q) {
  try {
    const data = {
      title: q,
      body: "",
      snippets: [],
      is_rush_enabled: false,
      is_public: false,
      files: []
    };
    const { data: postResponseData } = await axiosInstance.post('question', data);
    const { data: threadResponseData } = await axiosInstance.get(`thread/${postResponseData.question_id}?page=1&per_page=10`);
    let jobStatus = 'IN_PROGRESS';
    let dataHasil = null;
    while (jobStatus === 'IN_PROGRESS') {
      const { data: answersResponseData } = await axiosInstance.get(`question/${threadResponseData.list[0].question.id}/answers`);
      jobStatus = answersResponseData[0].job_status;
      dataHasil = answersResponseData[0].content;

      if (jobStatus === 'IN_PROGRESS') {
        console.log('Job is still in progress...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    return dataHasil;
  } catch (error) {
    console.error(error);
    throw error;
  }
}