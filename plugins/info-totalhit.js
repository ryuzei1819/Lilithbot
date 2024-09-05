/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let { generateWAMessageFromContent, prepareWAMessageMedia, proto } = require ('@whiskeysockets/baileys')
let fetch = require ('node-fetch')

let handler = async (m, { conn, args, usedPrefix, command }) => {
let stats = Object.entries(db.data.stats).map(([key, val]) => {
    let name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' , ') : plugins[key]?.help || key 
    if (/exec/.test(name)) return
    return { name, ...val }
  }).filter(Boolean);

  let totalHits = stats.reduce((sum, { total }) => sum + total, 0);

  let handlerMessage = `Total Hits : ${totalHits}`;
const messa = await prepareWAMessageMedia({ image: await fetch('https://telegra.ph/file/cf4f28ed3b9ebdfb30adc.png') }, { upload: conn.waUploadToServer })
const catalog = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
"productMessage": {
"product": {
"productImage": messa.imageMessage, 
"productId": "62857021072505",
"title": `*${handlerMessage}*`,
"description": `Jmebud Goreng`,
"currencyCode": "USD",
"bodyText": wm,
"footerText": wm,
"priceAmount1000": "40000000000",
"productImageCount": 3,
"firstImageId": 2,
"salePriceAmount1000": "10000000",
"retailerId": wm,
"url": "https://wa.me/62857021072505?text=Woi"
},
"businessOwnerJid": "62857021072505@s.whatsapp.net",
}
}), { userJid: m.chat, quoted: m })    

conn.relayMessage(m.chat, catalog.message, { messageId: catalog.key.id })
}
handler.help = ['totalhit']
handler.tags = ['main']
handler.command = /^(totalhit|hittotal)$/i

handler.limit = true
module.exports = handler