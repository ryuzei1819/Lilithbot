/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fs = require('fs');

let handler = async (m, { conn, args, command }) => {
const fs = require('fs');
  let fitur = Object.values(plugins).filter(v => v.help && !v.disabled).map(v => v.help).flat(1)
  let F = {
    key: {
      fromMe: false,
      participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "6285736178354-1625305606@g.us" } : {})
    },
    message: {
      "extendedTextMessage": {
        "text": "T O T A L - F I T U R",
        "title": "T O T A L - F I T U R",
      }
    }
  }
  let totalf = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
  conn.sendButton(
    m.chat,
    [
      [ "Script Botz", ".sc"]
    ],
    F,
    {
      body: `
*F I T U R - B O T*\n\n> *Plugins :* ±${totalf} Plugins Files\n\n> *Fitur :* ±${fitur.length} Menu`,
    footer: null, 
    },
  );
}

handler.help = ['totalfitur']
handler.tags = ['info']
handler.command = ['totalfitur']

module.exports = handler