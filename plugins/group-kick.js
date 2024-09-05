/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const { sticker } = require('../lib/sticker');

let handler = async (m, { teks, conn, isOwner, isAdmin, args }) => {
    if (!(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        throw false;
    }
    let ownerGroup = m.chat.split('-')[0] + "@s.whatsapp.net";
    if (m.quoted) {
        if (m.quoted.sender === ownerGroup || m.quoted.sender === conn.user.jid) return;
        let usr = m.quoted.sender;
        await conn.groupParticipantsUpdate(m.chat, [usr], "remove");
        return;
    }
    if (!m.mentionedJid[0]) throw `*tag the member you want to kick.*`;
    let users = m.mentionedJid.filter((u) => !(u === ownerGroup || u.includes(conn.user.jid)));
    for (let user of users) {
        if (user.endsWith("@s.whatsapp.net")) {
            await conn.groupParticipantsUpdate(m.chat, [user], "remove");
        }
    }
    let Fvn = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`, ...(m.chat ? {
                remoteJid: "6285736178354-1625305606@g.us"
            } : {})
        },
        message: {
            "audioMessage": {
                "mimetype": "audio/ogg; codecs=opus",
                "seconds": "999999999999",
                "ptt": "true"
            }
        }
    };
    let stiker = await sticker(null, `https://files.catbox.moe/lid2ph.jpg`, 'Jangan Macam Macam Sama Atmin 😜✋', 'Mampus Kau Member Kontol 😹');
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', Fvn);
};

handler.help = ['kick @tag/reply'];
handler.tags = ['group'];
handler.command = /^(kic?k|remove|tendang|\-)$/i;

handler.admin = true;
handler.group = true;
handler.botAdmin = true;

module.exports = handler;