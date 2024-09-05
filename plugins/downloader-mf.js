/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');
const util = require('util');
const axios = require('axios');
const cheerio = require('cheerio');

async function mediafire(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            let filename = $('.dl-info > div > div.filename').text();
            let filetype = $('.dl-info > div > div.filetype').text();
            let filesize = $('a#downloadButton').text().split("(")[1].split(")")[0];
            let uploadAt = $('ul.details > li:nth-child(2)').text().split(": ")[1];
            let link = $('#downloadButton').attr('href');
            let desc = $('div.description > p.description-subheading').text();
            
            if (typeof link === 'undefined') return resolve({ status: false, msg: 'No result found' });
            
            let result = {
                status: true,
                filename: filename,
                filetype: filetype,
                filesize: filesize,
                uploadAt: uploadAt,
                link: link,
                desc: desc
            };

            console.log(result);
            resolve(result);
        } catch (err) {
            console.error(err);
            resolve({ status: false, msg: 'No result found' });
        }
    });
}

let handler = async (m, { usedPrefix, command, conn, text }) => {
    let input = `[!] *wrong input*	
    Ex : ${usedPrefix + command} https://www.mediafire.com/file/pwxob70rpgma9lz/GBWhatsApp_v8.75%2528Tutorial_Yud%2529.apk/file*`;
    
    if (!text) return m.reply(input);
    if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`url tidak valid, harap masukkan url yang valid. Coba dengan menambahkan http:// or https://`);
    if (!text.includes('mediafire.com')) throw 'Link bukan MediaFire';
    
    m.reply(wait);
    
    const baby1 = await mediafire(text);

    if (parseFloat(baby1.filesize.split('MB')[0]) >= 100) {
        return m.reply('*File Over Limit* ' + util.format(baby1));
    }

    const result = `*MEDIAFIRE DOWNLOADER*

📄 *Name* : ${baby1.filename}
⚖️ *Size* : ${baby1.filesize}
📨 *Type* : ${baby1.filetype}
🔗 *Link* : ${baby1.link}
📋 *UploadAt*: ${baby1.uploadAt}`;

    conn.sendFile(m.chat, baby1.link || error, `${baby1.filename}`, result, m, null, { mimetype: `${baby1.filetype}`, asDocument: true });
};

handler.help = ['mediafire <link>'];
handler.tags = ['downloader'];
handler.command = /^(mediafire|mf)$/i;
handler.register = true;
handler.limit = true;

module.exports = handler;