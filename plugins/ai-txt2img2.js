/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');

async function text2img(prompt) {
    const vredenapi = "https://ai-api.magicstudio.com/api/ai-art-generator";
    const body = `prompt=${encodeURIComponent(prompt)}`;

    try {
        const response = await fetch(vredenapi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });

        if (response.ok) {
            const imageBuffer = await response.buffer();
            return imageBuffer;
        } else {
            const errorText = await response.text();
            throw new Error(`Gagal mengambil gambar. Kode status: ${response.status}, Error: ${errorText}`);
        }
    } catch (error) {
        throw error;
    }
}

const handler = async (m, { conn, args }) => {
    if (args.length === 0) {
        return conn.reply(m.chat, 'Masukkan prompt untuk menghasilkan gambar. Contoh: .txt2img perempuan imut menggunakan seragam Jepang, sedang berjalan di malam hari, menggunakan payung karena sedang hujan', m);
    }

    const prompt = args.join(' ');

    try {
        const imageBuffer = await text2img(prompt);
        await conn.sendMessage(m.chat, { image: imageBuffer, caption: `Nih Om` }, { quoted: m });
    } catch (error) {
        await conn.reply(m.chat, `Gagal menghasilkan gambar. Error: ${error.message}`, m);
    }
};

handler.help = ['txt2img2'];
handler.tags = ['ai'];
handler.command = /^(txt2img2)$/i;

module.exports = handler;