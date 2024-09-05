const ytSearch = require('yt-search');
const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const os = require('os');
const axios = require('axios');

const Ytdl = {
    mp3: async(url) => {
        return new Promise(async(resolve, reject) => {
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

                const downloadParams = `platform=youtube&url=${encodeURIComponent(url)}&title=${title}&id=YgEl3OEU2DA&ext=mp3&note=720p&format=136`;
                const downloadHeaders = {
                    accept: 'application/json, text/javascript, */*; q=0.01',
                    'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
                    'sec-ch-ua-mobile': '?1',
                    'sec-ch-ua-platform': '"Android"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'x-note': '720p',
                    'x-requested-with': 'XMLHttpRequest',
                    Referer: 'https://ssyoutube.com.co/en111bv/',
                    'Referrer-Policy': 'strict-origin-when-cross-origin',
                };

                const downloadResponse = await fetch('https://ssyoutube.com.co/mates/en/convert?id=YgEl3OEU2DA', {
                    method: 'POST',
                    headers: downloadHeaders,
                    body: downloadParams,
                });

                const downloadData = await downloadResponse.json();

                const thumbnailResponse = await axios.post('https://seostudio.tools/livewire/message/public.tools.youtube-thumbnail-downloader', {
                    fingerprint: {
                        id: 'K6HHi0NyRjKxHBCa4mTe',
                        name: 'public.tools.youtube-thumbnail-downloader',
                        locale: 'en',
                        path: 'youtube-thumbnail-downloader',
                        method: 'GET',
                        v: 'acj',
                    },
                    serverMemo: {
                        children: [],
                        errors: [],
                        htmlHash: '5dfca34c',
                        data: {
                            link: null,
                            data: [],
                            recaptcha: null,
                            generalSettings: [],
                        },
                        dataMeta: {
                            models: {
                                generalSettings: {
                                    class: 'App\\Models\\Admin\\General',
                                    id: 1,
                                    relations: [],
                                    connection: 'mysql',
                                },
                            },
                        },
                        checksum: '946c98802eac552a03ffe4e377350f7cccef82f731a6ebf8d2c5bcfd4817aeea',
                    },
                    updates: [
                        {
                            type: 'syncInput',
                            payload: {
                                id: 'tjy4g',
                                name: 'link',
                                value: url,
                            },
                        },
                        {
                            type: 'callMethod',
                            payload: {
                                id: '7xk4',
                                method: 'onYoutubeThumbnailDownloader',
                                params: [],
                            },
                        },
                    ],
                }, {
                    headers: {
                        authority: 'seostudio.tools',
                        accept: 'text/html, application/xhtml+xml',
                        'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                        'content-type': 'application/json',
                        origin: 'https://seostudio.tools',
                        referer: 'https://seostudio.tools/youtube-thumbnail-downloader',
                        'sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
                        'sec-ch-ua-mobile': '?1',
                        'sec-ch-ua-platform': '"Android"',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                        'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
                        'x-csrf-token': 'r6eBtEQ3JSqnpSQzpGlgDR1k7SQ2hG8Zf20MkCkm',
                        'x-livewire': 'true',
                    },
                });

                const thumbnailData = await thumbnailResponse.data;
                const thumbnails = thumbnailData.serverMemo.data.data.map((item) => ({
                    preview: item.preview,
                    resolution: item.resolution,
                }));

                const result = {
                    status: true,
                    creator: "@Bang_syaii",
                    title: convertData.title,
                    url: thumbnailData.serverMemo.data.link,
                    media: convertData.url,
                };
                resolve(result);
            } catch (error) {
                reject({
                    status: false,
                    msg: "Gagal saat mengambil data !"
                });
            }
        });
    }
};
const handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, 'Input query', m);

    conn.sendMessage(m.chat, {
        react: {
            text: '🕒',
            key: m.key,
        },
    });

    try {
        const { videos } = await ytSearch(text); 
        const { title, uploaded, duration, views, url, thumbnail } = videos[0]; 

        const fakee = {
            key: {
                fromMe: false,
                participant: '13135550002@s.whatsapp.net',
                remoteJid: '13135550002@s.whatsapp.net',
            },
            message: {
                groupInviteMessage: {
                    groupJid: '6282389924037-1625305606@g.us',
                    inviteCode: 'null',
                    groupName: 'Panxz',
                    caption: `Durasi: ${duration} Menit`,
                },
            },
        };

        const videoInfo = await Ytdl.mp3(url);

        if (videoInfo.error) {
            throw new Error(videoInfo.error);
        }

        await conn.sendMessage(m.chat, {
            document: await Func.fetchBuffer(thumbnail),
            mimetype: 'audio/mpeg',
            fileName: title,
            caption: `Title: ${title}\nUploaded: ${uploaded}\nDuration: ${duration}\nViews: ${views}\nURL: ${url}`,
            fileLength: 99999999999999999,
            jpegThumbnail: await Func.reSize(await Func.fetchBuffer(thumbnail), 200, 100),
        }, { quoted: m });

conn.sendFile(m.chat, videoInfo.media , null, null, fkontak);

        conn.sendMessage(m.chat, {
            react: {
                text: '✅',
                key: m.key,
            },
        });
    } catch (e) {
        console.log(e);
        m.reply('Failed get Data!');
    }
};

handler.help = ['play'].map((v) => v + ' *<query>*');
handler.tags = ['downloader'];
handler.command = /^play$/i;

handler.exp = 0;
handler.limit = true;
handler.register = true;

module.exports = handler;