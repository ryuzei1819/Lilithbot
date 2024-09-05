const axios = require('axios');

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let who =
      m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.fromMe
        ? conn.user.jid
        : m.sender;
    let name = await conn.getName(who);
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || "";
    if (!mime) throw `*• Example :* ${usedPrefix + command} *[reply/send media]*`;
    
    await m.reply("⏳ Memproses gambar menjadi anime...");

    let media = await q.download();
    let animeImageUrl = await toanime(media);
    
    await conn.sendFile(m.chat, animeImageUrl, "", `✨ Berhasil mengubah gambar menjadi anime!`, m, false, { asDocument: true });
  } catch (error) {
    console.error(error);
    throw `❌ Terjadi kesalahan:\n${error}`;
  }
};

handler.help = ["toanime", "jadianime"];
handler.tags = ["tools"];
handler.command = ["toanime", "jadianime"];
handler.limit = true;

module.exports = handler;

async function toanime(buffer) {
    try {
        const base64String = Buffer.from(buffer, 'binary').toString('base64');
        const apiResponse = await axios.post('https://www.drawever.com/api/photo-to-anime', {
            data: `data:image/png;base64,${base64String}`,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Ensure that the URL is correctly returned
        if (!apiResponse.data.urls || !apiResponse.data.urls.length) {
            throw new Error('No URLs returned from the API.');
        }

        return 'https://www.drawever.com' + (apiResponse.data.urls[1] || apiResponse.data.urls[0]);
    } catch (error) {
        // Log the error for debugging
        console.error('Error in toanime function:', error.response ? error.response.data : error.message);
        throw new Error('Gagal mengubah gambar menjadi anime. Periksa log untuk detail kesalahan.');
    }
}