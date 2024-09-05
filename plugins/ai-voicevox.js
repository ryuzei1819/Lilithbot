/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');
const defaultLang = 'ja';
const tld = 'cn';
const key = [
  "z-j740K-G86958S",
  "E96-39N92-3021i",
  "w3164-16562-7-8",
];

let handler = async (m, { args, usedPrefix, text, command }) => {

  let yh = key;
  let apikey = yh[Math.floor(Math.random() * yh.length)];
  let quot = m.quoted ? m.quoted : m;
  let q = text ? text : quot.text;

  if (!text) throw `Masukan text nya!\n\nExample: ${usedPrefix + command} pagi kawan-kawan`;

  try {

    let audio = `https://deprecatedapis.tts.quest/v2/voicevox/audio/?text=${text}&key=${apikey}`;
    //if (!audio.ok) throw 'Rest Api sedang error'

    //m.reply(ress.text)
    conn.sendFile(m.chat, audio, 'audio.opus', null, m, true);
  } catch (err) {
    m.reply('Error!\n\n' + err);
  }
};

handler.help = ['voicevox'];
handler.tags = ['ai'];
handler.command = /^(voicevox)$/i;
handler.limit = true;
module.exports = handler;