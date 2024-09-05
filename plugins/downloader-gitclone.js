/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
const fetch = require('node-fetch');

let handler = async (m, { args, usedPrefix, command }) => {
    if (!args[0]) return conn.reply(m.chat, '🚩 Input your link', m);
    m.react('🕑');
    if (!regex.test(args[0])) return conn.reply(m.chat, '🚩 link salah!', m);
    try {
        let [, user, repo] = args[0].match(regex) || [];
        repo = repo.replace(/.git$/, '');
        let url = `https://api.github.com/repos/${user}/${repo}/zipball`;
        let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1];
        conn.sendMessage(m.chat, { document: { url: url }, mimetype: 'application/zip', fileName: `${filename}` }, { quoted: m });
        m.react('✅');
    } catch (e) {
        console.log(e);
        conn.reply(m.chat, `🚩 Maaf kak, repository yang Anda cari tidak dapat ditemukan.`, m);
    }
};

handler.help = ['gitclone <url>'];
handler.tags = ['downloader'];
handler.command = /gitclone|git/i;
handler.limit = true;
module.exports = handler;