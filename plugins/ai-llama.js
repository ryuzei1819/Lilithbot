const axios = require("axios");

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `mw tanya apa?`;

  await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});

  try {
  const response = await axios.get(`https://apikita.exonity.xyz/api/llama?query=${text}&prompt=kamu adalah LLAMA AI&model=70b`);
    await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
    await conn.sendMessage(m.chat, {
      text: response.data.result.output,
      contextInfo: {
        externalAdReply: {  
          title: "L L A M A  A I",
          body: wm,
          thumbnailUrl: 'https://files.catbox.moe/t4c34z.png',
          sourceUrl: saluran,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });
  } catch (error) {
    await conn.sendMessage(m.chat, `Terjadi kesalahan: ${error.message}`);
  }
};

handler.command = handler.help = ['llama'];
handler.tags = ['ai'];
handler.premium = false;
handler.register = true;

module.exports = handler;