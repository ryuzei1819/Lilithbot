/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const { randomBytes } = require('crypto');
const { generateWAMessageFromContent } = require('@whiskeysockets/baileys');

const SendEventMessage = async (to, a, b, c, d, m, conn) => {
    let msg = generateWAMessageFromContent(to, {
        messageContextInfo: {
            messageSecret: randomBytes(32)
        },
        eventMessage: {
            isCanceled: false,
            name: a,
            description: b,
            location: {
                degreesLatitude: 0,
                degreesLongitude: 0,
                name: c
            },
            joinLink: d,
            startTime: m.messageTimestamp
        }
    }, { quoted: m });

    conn.relayMessage(to, msg.message, {
        messageId: msg.key.id,
    }, { quoted: m });
}

let handler = async (m, { conn, text, command, usedPrefix }) => {
    let t = text.split(',');
    if (t.length < 4) {
        return m.reply(`*Format salah!*\nPenggunaan:\n${usedPrefix + command} nama event,deskripsi,nama lokasi,link`);
    }

    let nama = t[0];
    let des = t[1];
    let lokasi = t[2];
    let link = t[3];
    await SendEventMessage(m.chat, nama, des, lokasi, link, m, conn);
}

handler.help = handler.command = ['event'];
handler.tags = ['main'];

module.exports = handler;