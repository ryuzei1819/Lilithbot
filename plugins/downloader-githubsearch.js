/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');

let handler = async (m, { text, command, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `🚩 Masukkan query untuk dicari`, m);
    let res = await fetch(API('https://api.github.com', '/search/repositories', {
        q: text
    }));
    if (!res.ok) throw eror;
    let json = await res.json();
    let str = json.items.map((repo, index) => {
        return `「 ${ 1 + index } 」
> Repo Name : ${repo.name}
> By : ${repo.owner.login}
> Forked : ${repo.fork ? 'True' : 'False'}
> Private : ${repo.private ? 'True': 'False'}

🔖 ᴄʀᴇᴀᴛᴇᴅ ᴏɴ : ${formatDate(repo.created_at)}
📩 ʟᴀsᴛ ᴜᴘᴅᴀᴛᴇ ᴏɴ :${formatDate(repo.updated_at)}
👁  ${repo.watchers}   🍴  ${repo.forks}   ⭐  ${repo.stargazers_count}
❗ ɪssᴜᴇ : ${repo.open_issues} ${repo.description ? `
📚 ᴅᴇsᴄʀɪᴘᴛɪᴏɴ:
${repo.description}` : ''}

🔗 ᴄʟᴏɴᴇ :
$ git clone ${repo.clone_url}
`.trim()
    }).join('\n— — — — — — — — — — — — — —\n');
    conn.reply(m.chat, `*ɢɪᴛʜᴜʙ sᴇᴀʀᴄʜ*\n${str}`, m);
};

handler.help = ['githubsearch <query>'];
handler.tags = ['downloader'];
handler.limit = true;
handler.command = /^githubsearch|ghs?$/i;

module.exports = handler;

function formatDate(n, locale = 'id') {
    let d = new Date(n);
    return d.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
}