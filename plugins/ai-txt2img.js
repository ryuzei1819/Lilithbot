/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let fetch = require('node-fetch')
let uploadFile = require('../lib/uploadFile.js')

let handler = async (m, { conn, usedPrefix, command, text, isOwner }) => {
 if (!text) throw `Use ${usedPrefix + command} a girl and cute cat`
	conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
try {
    let res = await text2imgAfter(text) 
    conn.sendFile(m.chat, res, 'text2img.jpg', done, m) 
 } catch (e) {
    console.log(e) 
    m.reply(eror) 
  }
}
handler.help = ['txt2img']
handler.tags = ['ai']
handler.command = /^(txt2img)$/i
module.exports = handler

// SCRAPERS BY INS DEV

async function text2imgBefore(prompt) {
    const Api = "https://ai-api.magicstudio.com/api/ai-art-generator";
    const body = `prompt=${encodeURIComponent(prompt)}`;
    try {
        const respons = await fetch(Api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });
        if (respons.ok) {
            const imageBuffer = await respons.buffer();
            return imageBuffer
        } else {
            const responsError = await respons.text();
            throw new Error(`Error get this image. Status code: ${respons.status}, Error: ${responsError}`);
        }
    } catch (error) {
        throw error
    }
}
async function text2imgAfter(prompt) {
    try {
        const imageBuffer = await text2imgBefore(prompt);
        const Url = await uploadFile(imageBuffer, 'generated_image.png');
        return Url
    } catch (error) {
        throw error
    }
}