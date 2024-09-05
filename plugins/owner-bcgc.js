/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const moment = require('moment-timezone');
const { generateWAMessageFromContent } = require('@whiskeysockets/baileys');

let handler = async (m, { conn, isOwner, isROwner, text }) => {
    let d = new Date(new Date + 3600000);
    let locale = 'id';
    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss');
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5];
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d);
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
    let _uptime = process.uptime() * 1000;
    let _muptime;
    if (process.send) {
      process.send('uptime');
      _muptime = await new Promise(resolve => {
        process.once('message', resolve);
        setTimeout(resolve, 1000);
      }) * 1000;
    }
    let muptime = clockString(_muptime);
    let uptime = clockString(_uptime);
    let waktuwib = moment.tz('Asia/Jakarta').format('HH:mm:ss');
    //batas
    const delay = time => new Promise(res => setTimeout(res, time));
    let getGroups = await conn.groupFetchAllParticipating();
    let fak = {
      key: {
        fromMe: false,
        participant: '0@s.whatsapp.net', ...(m.chat ? { remoteJid: 'status@broadcast' } : {}),
      },
      message: {
        'liveLocationMessage': {
          'caption': 'B R O A D C A S T',
          'h': 'B R O A D C A S T',
          'jpegThumbnail': fs.readFileSync('./src/thumbnail.png')
        }
      }
    };

    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1]);
    let anu = groups.map(v => v.id);
    let pesan = m.quoted && m.quoted.text ? m.quoted.text : text;
    if (!pesan) throw 'teksnya?';
    conn.sendFooterText = async (jid, title, text, footer, quoted, options) => {
      let msg = await generateWAMessageFromContent(
        jid,
        {
          interactiveMessage: {
            body: {
              text: text
            },
            footer: {
              text: footer
            },
            header: {
              title: title,
            },
            nativeFlowMessage: {
              buttons: []
            }
          }
        },
        { quoted, ...options }
      );
      await conn.relayMessage(jid, msg.message, {});
    };
    m.reply(`Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai Dalam ${anu.length * 0.5} Detik`);
    for (let i of anu) {
      await conn.sendFooterText(i, null, null, pesan, fak);
    }
    m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`);
};

handler.help = ['bcgc <query>'];
handler.tags = ['owner'];
handler.command = /^(broadcastgc|bcgc)$/i;

handler.owner = true;

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

module.exports = handler;