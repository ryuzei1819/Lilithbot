/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn }) => {
  let uptime = process.uptime();
  let hari = Math.floor(uptime / 86400);
  uptime %= 86400;
  let jam = Math.floor(uptime / 3600);
  uptime %= 3600;
  let menit = Math.floor(uptime / 60);
  let detik = Math.floor(uptime % 60);
  let caption = `${namebot} has been active for\n*${hari} day*\n*${jam} hours*\n*${menit} minutes*\n*${detik} second*`;

conn.relayMessage(
        m.chat,
        {
          requestPaymentMessage: {
            currencyCodeIso4217: "USD",
            amount1000:
              Object.values(plugins)
                .filter((v) => v.help && !v.disabled)
                .map((v) => v.help)
                .flat(1).length * 1000,
            requestFrom: m.sender,
            noteMessage: {
              extendedTextMessage: {
                text: caption,
                contextInfo: {
                  mentionedJid: conn.parseMention(caption),
                  externalAdReply: {
                    showAdAttribution: true,
                  },
                },
              },
            },
          },
        },
        {},
      );
};

handler.help = ['runtime'];
handler.tags = ['info'];
handler.command = /^runtime$/i;
handler.limit = false;
handler.group = false;
module.exports = handler;