const ffmpeg = require('fluent-ffmpeg');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function convertVideoToAudio(videoUrl, outputFilename) {
    return new Promise((resolve, reject) => {
        ffmpeg(videoUrl)
            .output(outputFilename)
            .format('mp3')
            .on('end', function() {
                console.log('Conversion finished');
                resolve();
            })
            .on('error', function(err) {
                console.error('Error:', err);
                reject(err);
            })
            .run();
    });
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `⚠️ Contoh Penggunaan : ${usedPrefix + command} *[Tautan Tiktok]*`;
    if (!Func.isUrl(text)) throw `⚠️ Contoh Penggunaan : ${usedPrefix + command} *[Tautan Tiktok]*`;
    m.reply('Processing...');

    try {
        let fetch = await Scraper["Download"].tiktok(text);
        let { data } = fetch;

        let videoUrl = data.play;
        let outputFilename = path.join(__dirname, 'audio.mp3');

        await convertVideoToAudio(videoUrl, outputFilename);

        await conn.sendFile(m.chat, outputFilename, null, null, m);

        fs.unlinkSync(outputFilename);
    } catch (e) {
        console.error('Error:', e);
        throw `Error: ${e.message}`;
    }
};

handler.help = handler.command = ["ttmp3", "tiktokmp3", "ttaud", "ttaudio"];
handler.tags = ["downloader"];
module.exports = handler;