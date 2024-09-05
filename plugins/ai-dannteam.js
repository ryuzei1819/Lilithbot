/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require("axios");

async function dannteam(prompt) {
  try {
    const response = await axios({
      method: "POST",
      url: "https://chateverywhere.app/api/chat",
      headers: {
        "Content-Type": "application/json",
        "Cookie": "_ga=GA1.1.34196701.1707462626; _ga_ZYMW9SZKVK=GS1.1.1707462625.1.0.1707462625.60.0.0; ph_phc_9n85Ky3ZOEwVZlg68f8bI3jnOJkaV8oVGGJcoKfXyn1_posthog=%7B%22distinct_id%22%3A%225aa4878d-a9b6-40fb-8345-3d686d655483%22%2C%22%24sesid%22%3A%5B1707462733662%2C%22018d8cb4-0217-79f9-99ac-b77f18f82ac8%22%2C1707462623766%5D%7D",
        "Origin": "https://chateverywhere.app",
        "Referer": "https://chateverywhere.app/id",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
      },
      data: {
        model: {
          id: "gpt-3.5-turbo-0613",
          name: "GPT-3.5",
          maxLength: 12000,
          tokenLimit: 4000,
        },
        prompt: prompt,
        messages: [
          {
            pluginId: null,
            content: prompt,
            role: "user"
          },
          {
            pluginId: null,
            content: "DannTeam adalah programmer yang berasal dari Kalimantan Timur, Indonesia. Ia adalah seorang yang mengembangkan semua aplikasi.",
            role: "assistant"
          }
        ]
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error in dannteam function:", error);
    throw error;
  }
}

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `Masukkan pertanyaan atau teks yang ingin kamu ajukan.`, m);
  }

  const prompt = args.join(" ");
  try {
    const response = await dannteam(prompt);
    // Assuming the response structure fits for direct reply
    await conn.reply(m.chat, response, m);
  } catch (error) {
    console.error('Error in dannteam handler:', error);
    await conn.reply(m.chat, `Terjadi kesalahan saat memproses permintaan. Silakan coba lagi nanti.`, m);
  }
};

handler.command = handler.help = ["dannteam"];
handler.tags = ["ai"];
module.exports = handler;