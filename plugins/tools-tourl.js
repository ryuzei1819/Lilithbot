/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const uploadFile = require('../lib/uploadFile.js');
const fetch = require('node-fetch');

let handler = async (m, { args, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) throw 'No media found';
    
    let media = await q.download();
    let fileSizeMB = media.length / (1024 * 1024);
    if (fileSizeMB > 10) {
        throw 'Max file size is 10 MB.';
    }

    let link = await Uploader.catbox(media);
    let caption = `
📮 *L I N K :* ${link} 
📊 *S I Z E :* ${formatBytes(media.length)}
*S H O R T :* ${await shortUrl(link)}`;

    await m.reply(caption);
};

handler.help = ['tourl'];
handler.tags = ['tools'];
handler.command = /^(tourl)$/i;
handler.limit = true;
module.exports = handler;

function formatBytes(bytes) {
    if (bytes === 0) {
        return '0 B';
    }
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}

async function shortUrl(url) {
    let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`);
    return await res.text();
}