let { MessageType } = require('@whiskeysockets/baileys');

let handler = async function (m, { conn, text, args, usedPrefix, command }) {
    function no(number) {
        return number.replace(/\s/g, '').replace(/([@+-])/g, '');
    }

    const users = global.db.data.users;
    const premiumUsers = Object.keys(users).filter(key => users[key].premium);

    if (!premiumUsers.length) {
        return conn.reply(m.chat, 'Tidak ada pengguna premium saat ini.', m);
    }

    if (!text) {
        const list = {
            data: premiumUsers.map(user => ({
                name: users[user].name || `@${user.split('@')[0]}`,
                number: user.split('@')[0],
                favorites: `Hapus premium: ${users[user].name || `@${user.split('@')[0]}`} (${user.split('@')[0]})`,
                url: `Premium user: ${users[user].name || `@${user.split('@')[0]}`} (${user.split('@')[0]})`
            }))
        };

        return conn.sendList(
            m.chat,
            "Pilih Pengguna Premium",
            list.data.map((i, a) => ({
                rows: [{
                    headers: i.favorites,
                    title: i.url,
                    body: "",
                    command: `${usedPrefix + command} ${i.number}`
                }]
            })),
            m,
            {
                body: "*[ HAPUS PREMIUM ]*\n*• Pilih pengguna yang ingin dihapus premium statusnya:*",
                footer: "\n*® Total Pengguna Premium : " + list.data.length + "*",
            }
        );
    }

    text = no(text);
    const userJid = premiumUsers.find(uid => uid.includes(text));

    if (!userJid || !users[userJid].premium) {
        return conn.reply(m.chat, `Pengguna @${text} tidak ditemukan atau bukan pengguna premium.`, m, { contextInfo: { mentionedJid: [userJid] } });
    }

    const userName = users[userJid].name || `@${userJid.split('@')[0]}`;

    users[userJid].premium = false;
    users[userJid].premiumTime = 0;
    conn.reply(m.chat, `🚩 Berhasil menghapus status premium dari pengguna: ${userName} (${text}).`, m, { contextInfo: { mentionedJid: [userJid] } });
};

handler.help = ["delprem *<@tag>*"];
handler.command = ["delprem"];
handler.tags = ["owner"];
handler.owner = true;

module.exports = handler;