/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m) => {
    let who;
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    else who = m.sender;
    if (typeof db.data.users[who] == 'undefined') throw 'Pengguna tidak ada didalam data base';
    let user = global.db.data.users[who];
    let limit = user.premiumTime >= 1 ? 'Unlimited' : user.limit;
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
    let ah = `❏ *ᴜsᴇʀɴᴀᴍᴇ:* ${user.registered ? user.name : conn.getName(who)}
▧ *ᴘʀᴇᴍɪᴜᴍ:*  ${global.db.data.users[m.sender].premium? "✓" : "x"}
▧ *ʟɪᴍɪᴛ:* ${limit}`;
    conn.sendMessage(m.chat, {
        text: ah,
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                body: 'Y O U R  L I M I T',
                thumbnailUrl: pp,
                sourceUrl: null,
                mediaType: 1,
                renderLargerThumbnail: false
            }
        }
    }, { quoted: m });
};

handler.help = ['limit [@user]'];
handler.tags = ['main'];
handler.command = /^(limit)$/i;

module.exports = handler;