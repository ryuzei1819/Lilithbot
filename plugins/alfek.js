const fs = require('fs');
const fetch = require('node-fetch');
const moment = require('moment-timezone');
const speed = require('performance-now');
const { exec } = require('child_process');

let handler = m => m;

handler.all = async function (m) {
    let name = await conn.getName(m.sender);
    global.pp = global.thumb || '';
    try {
        pp = await this.profilePictureUrl(m.sender, 'image');
    } catch (e) {}

    let F2 = {
        "key": {
            "remoteJid": "0@s.whatsapp.net",
            "fromMe": false,
            "id": "BAE595C600522C9C",
            "participant": "0@s.whatsapp.net"
        },
        "message": {
            "requestPaymentMessage": {
                "currencyCodeIso4217": "Renvy Bot By Ripzky",
                "amount1000": global.fsizedoc,
                "requestFrom": "0@s.whatsapp.net",
                "noteMessage": {
                    "extendedTextMessage": {
                        "text": "[ Renvy Is Here ]"
                    }
                },
                "expiryTimestamp": global.fsizedoc,
                "amount": {
                    "value": global.fsizedoc,
                    "offset": global.fsizedoc,
                    "currencyCode": "JPY"
                }
            }
        }
    };

    let F = {
        key: {
            fromMe: false,
            participant: `13135550002@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: "6285736178354-1625305606@g.us" } : {})
        },
        message: {
            "extendedTextMessage": {
                "text": "</> " + (global.namebot || 'Bot') + " By " + (global.nameown || 'Owner') + " </>",
                "title": "</> " + (global.namebot || 'Bot') + " By " + (global.nameown || 'Owner') + " </>"
            }
        }
    };
    
    global.fkontak = pickRandom([F, F2]);
    global.doc = pickRandom(['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/msword', 'application/pdf']);
    global.bottime = `JAM: ${moment.tz("Asia/Jakarta").format("HH:mm:ss")} ⏳`;
    global.ucapan = ucapan();
    global.botdate = date();
    global.fsizedoc = pickRandom([2000, 3000, 2023000, 2024000]);
    global.axios = require('axios');
    global.fetch = require('node-fetch');
    global.cheerio = require('cheerio');
    global.fs = require('fs');
    global.pickRandom = pickRandom;
    global.clockString = clockString;
    global.fla = "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=";
    let _muptime;
    if (process.send) {
        process.send('uptime');
        _muptime = await new Promise(resolve => {
            process.once('message', resolve);
            setTimeout(resolve, 1000);
        }) * 1000;
    }
    let muptime = clockString(_muptime);
    let timestamp = speed();
    let latensi = speed() - timestamp;
        exec(`neofetch --stdout`, (error, stdout, stderr) => {
            let child = stdout.toString("utf-8");
            let ssd = child.replace(/Memory:/, "Ram:");
        });

    global.ephemeral = '86400';
}

module.exports = handler;

function date() {
    let d = new Date(new Date + 3600000);
    let locale = 'id';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    return `${week}, ${date}`;
}

function clockString(ms) {
    if (isNaN(ms)) return '-- Hari -- Jam -- Menit -- Detik';
    let d = Math.floor(ms / 86400000);
    let h = Math.floor(ms / 3600000) % 24;
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [d, ' Hari ', h, ' Jam ', m, ' Menit ', s, ' Detik '].map(v => v.toString().padStart(2, '0')).join('');
}

function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH');
    if (time >= 18) return 'Selamat Malam 🌙';
    if (time >= 15) return 'Selamat Sore 🌇';
    if (time > 10) return 'Selamat Siang ⛅';
    if (time >= 4) return 'Selamat Pagi 🌄';
    return 'Udah Dini Hari Kok Belum Tidur? 🥱';
}

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())];
}