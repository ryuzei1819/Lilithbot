/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let axios = require('axios')
let { Sticker } = require('wa-sticker-formatter')
let { webp2png } = require('../lib/webp2mp4')
let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
    try {
        let q = m.quoted ? m.quoted: m
        let mime = (q.msg || q).mimetype || ''
        let txt = text ? text: typeof q.text == 'string' ? q.text: ''
        m.react('🕑')
        let avatar = await conn.profilePictureUrl(q.sender, 'image').catch(_ => 'https://files.catbox.moe/i97i4t.jpg')
        avatar = /tele/.test(avatar) ? avatar: await Uploader.catbox((await conn.getFile(avatar)).data)
        if (!/webp/.test(mime)) {
            let req = await fakechat(txt, q.name, avatar)
            let stiker = await createSticker(req, false, global.author)
            conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        } else {
            let media = await m.quoted.download()
            let out = await webp2png(media)
            let req = await fakechatImg(out, txt, q.name, avatar)
            let stiker = await createSticker(req, false, global.author)
            conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        }
    } catch (e) {
        throw e
    }
}
handler.help = ['qc']
handler.tags = ['tools']
handler.command = /^(qc|quotely)$/i

module.exports = handler

async function fakechat(text, name, url) {
    let body = {
        "type": "quote",
        "format": "webp",
        "backgroundColor": "#000000",
        "width": 480,
        "height": 480,
        "scale": 2,
        "messages": [{
        "avatar": true,
        "from": {
            "first_name": name,
            "language_code": "en",
            "name": name,
            "photo": {
            "url": url
            }
        },
        "text": text,
        "replyMessage": {}
        }]
    }
    let res = await axios.post('https://quotly.netorare.codes/generate', body);
    return Buffer.from(res.data.result.image, "base64");
}

async function fakechatImg(url, text, name, avatar) {
    let body = {
        "type": "quote",
        "format": "webp",
        "backgroundColor": "#000000",
        "width": 512,
        "height": 768,
        "scale": 2,
        "messages": [{
        "entities": [],
        "media": {
            "url": url
        },
        "avatar": true,
        "from": {
            "id": 1,
            "name": name,
            "photo": {
            "url": avatar
            }
        },
        "text": text,
        "replyMessage": {}
        }]
    }
    let res = await axios.post('https://quotly.netorare.codes/generate', body);
    return Buffer.from(res.data.result.image, "base64");
}

async function createSticker(req, url, authorName, quality) {
    let stickerMetadata = {
        type: 'full',
        author: global.author,
        quality
    }
return (new Sticker(req ? req: url, stickerMetadata)).toBuffer()
}