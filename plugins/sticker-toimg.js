/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const sharp = require('sharp');
const TIMEOUT = 10000;

let handler = async (m, { conn, usedPrefix, command }) => {
  const notStickerMessage = `🚩 Balas stiker dengan command *${usedPrefix + command}*`

  if (!m.quoted) throw notStickerMessage;

  const q = m.quoted || m
  const mime = q.mimetype || ''

  if (!/image\/webp/.test(mime)) throw notStickerMessage

  try {
    const media = await q.download()
    const decodedBuffer = await sharp(media).toFormat('png').toBuffer()

    if (decodedBuffer.length > 0) {
      await conn.sendFile(m.chat, decodedBuffer, 'error.png', '`Succes`', m)
    } else {
      throw '🚩 Gagal mengonversi stiker menjadi gambar.'
    }
  } catch (error) {
    console.error(error)
    if (error.message === '🚩 Timeout of 10000ms exceeded') {
      m.reply('🚩 Proses konversi terlalu lama. Silakan coba lagi.')
    } else {
      m.reply(`🚩 Terjadi kesalahan: ${error.message}`)
    }
  }
}

handler.help = ['toimg <reply sticker>']
handler.tags = ['sticker']
handler.command = ['toimg']

module.exports = handler