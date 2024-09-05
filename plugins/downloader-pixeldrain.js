/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function downloadPixeldrain(url) {
    let id = (url.match(/\/u\/(\w+)/) || [])[1];
    if (!id) throw 'ID Not Found';

    let response = await fetch(`https://pixeldrain.com/api/file/${id}/info`);
    if (!response.ok) throw response.statusText;

    let json = await response.json();
    if (!json.success) throw json.message;
    json.download = `https://pixeldrain.com/api/file/${json.id}?download`;

    return json;
}

async function downloadFile(url, filePath) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Gagal mengunduh file: ${response.statusText}`);
    const fileStream = fs.createWriteStream(filePath);
    await new Promise((resolve, reject) => {
        response.body.pipe(fileStream);
        response.body.on('error', reject);
        fileStream.on('finish', resolve);
    });
}

// Handler untuk bot
async function pixeldrainHandler(m, { conn, text, usedPrefix, command }) {
    if (!text) throw `Gunakan format: ${usedPrefix + command} <URL Pixeldrain>`;

    await m.reply('🔄 Memproses permintaan Anda, harap tunggu...');

    try {
        const fileInfo = await downloadPixeldrain(text);
        const filePath = path.join(__dirname, fileInfo.name);

        // Mengunduh file
        await downloadFile(fileInfo.download, filePath);

        // Menyiapkan pesan info
        let message = `📁 *File Info* 📁\n\n`;
        message += `🔹 *Nama*: ${fileInfo.name}\n`;
        message += `🔹 *Ukuran*: ${(fileInfo.size / (1024 * 1024)).toFixed(2)} MB\n`;
        message += `🔹 *Tipe*: ${fileInfo.type}\n`;
        message += `🔹 *Dibuat*: ${new Date(fileInfo.date_created * 1000).toLocaleString()}\n`;
        message += `🔹 *Link Download*: [Klik disini](${fileInfo.download})\n`;

        // Mengirimkan pesan info
        await conn.reply(m.chat, message, m);

        // Mengirimkan file yang diunduh
        await conn.sendFile(m.chat, filePath, fileInfo.name, null, m);

        // Menghapus file setelah pengiriman
        fs.unlinkSync(filePath);

    } catch (error) {
        await conn.reply(m.chat, `❌ Kesalahan: ${error.message}`, m);
    }
}

pixeldrainHandler.help = ['pixeldrain <url>'];
pixeldrainHandler.tags = ['downloader'];
pixeldrainHandler.command = /^(pixeldrain)$/i;

module.exports = pixeldrainHandler;