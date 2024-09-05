/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const uploadFile = require('../lib/uploadFile.js');
const uploadImage = require('../lib/uploadImage.js');
const webp2png = require('../lib/webp2mp4.js');
const fetch = require('node-fetch');

let handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
    var out

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/video/g.test(mime)) {
        if ((q.msg || q).seconds > 11) return m.reply('🚩 Maksimal 10 detik!')
    }
    if (!/webp|image|video|gif|viewOnce/g.test(mime)) return m.reply(`🚩 Reply Media Dengan Perintah\n\n${usedPrefix + command}`)
    let img = await q.download?.()

    if (/webp/g.test(mime)) {
        out = (await webp2png(img))
    } else if (/image/g.test(mime)) {
        out = (await uploadImage(img))
    } else if (/video/g.test(mime)) {
        out = (await uploadFile(img))
    } else if (/gif/g.test(mime)) {
        out = (await uploadFile(img))
    } else if (/viewOnce/g.test(mime)) {
        out = (await uploadFile(img))
    }
    conn.sendMessage(m.chat, {
      react: {
        text: '🕒',
        key: m.key,
      }
    });
    try {
        let res
        if (args[0]) {
            res = await (await fetch("https://api.ocr.space/parse/imageurl?apikey=helloworld&url=" + out + "&language=" + args[0])).json()
        } else {
            res = await (await fetch("https://api.ocr.space/parse/imageurl?apikey=helloworld&url=" + out)).json()
        }
        await m.reply("*Result:*\n" + res.ParsedResults[0].ParsedText)
    } catch (e) {
        throw eror
    }
}

handler.help = ['ocr <image>']
handler.tags = ['tools']
handler.command = /^(ocr)$/i
handler.limit = true

module.exports = handler