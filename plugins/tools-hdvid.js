const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

let handler = async (m, { conn }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let name = await conn.getName(who);
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime) throw `Video tidak ditemukan`;

  let videoData = await conn.downloadAndSaveMediaMessage(q, 'video');

  let output = './scrape/video.mp4';
  let initialBitrate = 1000;
  let increaseAmount = 3072;
  let bitrate = initialBitrate;

  const getVideoResolution = (filePath) => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) return reject(err);
        let videoStream = metadata.streams.find(stream => stream.codec_type === 'video');
        if (!videoStream) return reject(new Error('Tidak ada stream video ditemukan.'));
        resolve(`${videoStream.width}x${videoStream.height}`);
      });
    });
  };

  const convertVideo = () => {
    return new Promise((resolve, reject) => {
      ffmpeg(videoData)
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions([
          `-b:v ${bitrate}k`,
          '-vf', 'scale=1280:720:force_original_aspect_ratio=decrease',
          '-preset', 'fast',
          '-movflags', '+faststart'
        ])
        .on('end', async () => {
          try {
            let resolution = await getVideoResolution(output);
            await conn.sendFile(m.chat, output, '', `🍟 Nih Kak\nResolusi: ${resolution}`, m);
          } catch (err) {
            console.error('Terjadi kesalahan saat mendapatkan resolusi video:', err);
            m.reply('Terjadi kesalahan saat mendapatkan resolusi video. ' + err);
          }
          fs.unlinkSync(output);
          resolve();
        })
        .on('error', (err) => {
          console.error(err);
          m.reply('Terjadi kesalahan saat meningkatkan resolusi video. ' + err);
          fs.unlinkSync(output);
          reject(err);
        })
        .save(output);
    });
  };

  try {
    await convertVideo();
    bitrate += increaseAmount;
    await convertVideo();
  } catch (err) {
    console.error('Terjadi kesalahan selama proses konversi:', err);
  }
}

handler.command = handler.help = ["hdvid"];
handler.tags = ["tools"];
handler.limit = true;

module.exports = handler;