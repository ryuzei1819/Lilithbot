/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fs = require('fs')
const fetch = require('node-fetch')

let handler = async(m, { conn, text, participants }) => {
const shiro = {
            key: { 
                 fromMe: false,
                 participant: `0@s.whatsapp.net`, ...(m.chat ? 
            { remoteJid: "0@g.us" } : {}) 
                       },
            message: { 
                        "videoMessage": { 
                        "title": 'H I D E T A G',
                        "h": `Hmm`,
                        'seconds': '999999999', 
                        'gifPlayback': 'true', 
                        'caption': 'H I D E T A G',
                               }
                              }
                             }

    conn.sendMessage(m.chat, { text: text, mentions: participants.map(a => a.id) }, {quoted: shiro})
    }
handler.help = ['hidetag *<reason>*']
handler.tags = ['group']
handler.command = /^(hidetag|htag|h)$/i

handler.group = true
handler.admin = true

module.exports = handler