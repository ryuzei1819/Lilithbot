/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let { generateWAMessageFromContent, prepareWAMessageMedia, proto } = require ('@whiskeysockets/baileys')
let fetch = require ('node-fetch')

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let totalreg = Object.keys(global.db.data.users).length;
  let rtotalreg = Object.values(global.db.data.users).filter(
    (user) => user.registered == true,
  ).length;
  let p = `Total ${totalreg}, Register ${rtotalreg}`
const messa = await prepareWAMessageMedia({ image: await fetch('https://files.catbox.moe/16ypap.png') }, { upload: conn.waUploadToServer })
const catalog = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
"productMessage": {
"product": {
"productImage": messa.imageMessage, 
"productId": "62857021072505",
"title": `*${p}*`,
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
handler.help = ["database", "user"];
handler.tags = ["info"];
handler.command = /^(database|jumlahdatabase|user)$/i;
module.exports = handler;