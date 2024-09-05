/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

async function convertVideoToAudio(videoUrl, outputFilename) {
    return new Promise((resolve, reject) => {
        ffmpeg(videoUrl)
            .output(outputFilename)
            .format('mp3')
            .on('end', function() {
                console.log('Konversi selesai');
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
    if (!Func.isUrl(text))
        throw `⚠️ Contoh Penggunaan : ${usedPrefix + command} *[Tautan Tiktok]*`;
    try {
        let fetch = await Scraper["Download"].tiktok(text);
        let { data } = fetch;
        if (data.images) {
            for (let i of data.images) {
                await conn.sendMessage(
                    m.chat,
                    {
                        image: {
                            url: i,
                        },
                        caption: `📸 *[ TIKTOK SLIDE DOWNLOADER ]*\n\n*• Judul :* ${data.title}\n*• ID :* *[ ${data.id} ]*\n*• Views :* ${Func.formatNumber(data.play_count)}\n*• Suka :* ${Func.formatNumber(data.digg_count)}\n*• Komentar :* ${Func.formatNumber(data.comment_count)}\n*• Pembuat :* ${data.author.nickname}`,
                    },
                    { quoted: m },
                );
            }
        } else {
            let key = await conn.sendMessage(
                m.chat,
                {
                    video: {
                        url: data.play,
                    },
                    caption: `🎥 *[ TIKTOK VIDEO DOWNLOADER ]*\n\n*• Judul :* ${data.title}\n*• ID :* *[ ${data.id} ]*\n*• Views :* ${Func.formatNumber(data.play_count)}\n*• Suka :* ${Func.formatNumber(data.digg_count)}\n*• Komentar :* ${Func.formatNumber(data.comment_count)}\n*• Pembuat :* ${data.author.nickname}`,
                },
                { quoted: m },
            );
            await convertVideoToAudio(data.play, 'audio.mp3');
            await conn.sendFile(m.chat, 'audio.mp3', null, null, key);
            fs.unlinkSync('audio.mp3');
        }
    } catch (e) {
        try {
            let tiktok = await Scraper["Download"].tiktok2(text);
            let cap = `📹 *[ TIKTOK V2 DOWNLOADER ]*\n\n*• Keterangan :* ${tiktok.caption}`;
            let key = await conn.sendFile(m.chat, tiktok.server1.url, null, cap, m);
            await conn.sendFile(m.chat, tiktok.audio, null, null, key);
        } catch (e) {
            throw eror;
        }
    }
};
handler.help = ["tt", "tiktok"].map((a) => a + " *[Tautan Tiktok]*");
handler.tags = ["downloader"];
handler.command = ["tt", "tiktok"];
module.exports = handler;