const yts = require('yt-search');
const axios = require('axios');

const mp4 = async (url) => {
    return new Promise(async (resolve, reject) => {
        try {
            const serverResponse = await axios.post('https://proxy.ezmp3.cc/api/getServer', {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const serverUrl = serverResponse.data.serverURL;
            const convertResponse = await axios.post(`${serverUrl}/api/convert`, {
                url,
                quality: 128,
                trim: false,
                startT: 0,
                endT: 0,
                videoLength: 4,
                restricted: false,
                code: 0,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const convertData = convertResponse.data;
            const title = convertData.title || new Date().toISOString();
            const videoId = (url) => url.split('v=')[1]?.split('&')[0] || ""; // Memperoleh ID video dari URL

            const downloadParams = `platform=youtube&url=${encodeURIComponent("https://youtu.be/" + videoId(url))}&title=${title}&id=${videoId(url)}&ext=mp4&note=360p&format=136`;
            const downloadHeaders = {
                'accept': 'application/json, text/javascript, */*; q=0.01',
                'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
                'sec-ch-ua-mobile': '?1',
                'sec-ch-ua-platform': '"Android"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'x-note': '360p',
                'x-requested-with': 'XMLHttpRequest',
                'Referer': 'https://ssyoutube.com.co/en111bv/',
                'Referrer-Policy': 'strict-origin-when-cross-origin',
            };

            const downloadResponse = await fetch('https://ssyoutube.com.co/mates/en/convert?id=GdlccyM', {
                method: 'POST',
                headers: downloadHeaders,
                body: downloadParams,
            });

            const downloadData = await downloadResponse.json();
            const result = {
                status: true,
                creator: "@Bang_syaii",
                title: convertData.title,
                url: "https://youtu.be/" + videoId(url),
                media: downloadData.downloadUrlX
            };
            resolve(result);
        } catch (error) {
            reject({
                status: false,
                msg: "Gagal saat mengambil data!\n" + error 
            });
        }
    });
};

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*📝 Example:* ${usedPrefix + command} *[YouTube URL]*`;
    
    await conn.reply(m.chat, "🔄 Please wait...", m);

    try {
        let download = await mp4(text);
        let caption = `*🎥 [ YOUTUBE DOWNLOADER ]*\n*🎬 Title:* ${download.title}\n*🔗Url:* ${download.url}`;
;
        await conn.sendMessage(m.chat, {
            video: {
                url: download.media,
            },
            caption: caption,
        }, {
            quoted: m,
        });

    } catch (e) {
        throw `❌ Error: ${e.message || e}`;
    }
};

handler.help = ["ytmp4", "ytv"];
handler.tags = ["downloader"];
handler.command = /^(ytmp4|ytv)$/i;
handler.exp = 0;
handler.register = false;
handler.limit = true;

module.exports = handler;