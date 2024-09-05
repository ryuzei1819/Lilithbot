/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let { generateWAMessageFromContent, prepareWAMessageMedia, proto } = require ('@whiskeysockets/baileys')
let moment = require ('moment-timezone')
let fetch = require ('node-fetch')
let fs = require ('fs')

let handler = async (m, { conn, args, usedPrefix, command }) => {
const messa = await prepareWAMessageMedia({ image: await fetch('https://telegra.ph/file/3fb018a802fb892ac3761.jpg') }, { upload: conn.waUploadToServer })
const catalog = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
"productMessage": {
"product": {
"productImage": messa.imageMessage, 
"productId": "6281382415830",
"title": `*Click Here >>*`,
"description": `HALO BANG`,
"currencyCode": "USD",
"bodyText": wm,
"footerText": wm,
"priceAmount1000": "40000",
"productImageCount": 3,
"firstImageId": 2,
"salePriceAmount1000": "10000000",
"retailerId": wm,
"url": "https://wa.me/6281382415830?text= banh beli sc"
},
"businessOwnerJid": "6281382415830@s.whatsapp.net",
}
}), { userJid: m.chat, quoted: m })    

conn.relayMessage(m.chat, catalog.message, { messageId: catalog.key.id })
}
handler.help = ['sc']
handler.tags = ['main']
handler.command = /^(sc|script)$/i

handler.limit = true
module.exports = handler