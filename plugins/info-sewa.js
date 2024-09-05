/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const { proto, generateWAMessageFromContent, generateWAMessageContent, prepareWAMessageMedia } = require ('@whiskeysockets/baileys')

const handler = async (m, { conn, command, text, usedPrefix }) => {
let name = m.pushName || conn.getName(m.sender);
let pan = `
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
*Silahkan Tekan Tombol Yang bertuliskan Chat Owner Untuk Menghubungi Nomor Owner ku*
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
`
const url = "https://telegra.ph/file/3fb018a802fb892ac3761.jpg"
async function image(url) {
const { imageMessage } = await generateWAMessageContent({
    image: {
      url
    }
  }, {
    upload: conn.waUploadToServer
  })
  return imageMessage
}


    let msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: {
                text: pan   },
              carouselMessage: {
                cards: [
                  {
                    header: {
                      imageMessage: await image(url),
                      hasMediaAttachment: true,
                    },
                    body: { text: `
❏──「 *Sewa Bot* 」
│ • *7 Hari:* Rp.5.000
│ • *15 Hari:* Rp.10.000
│ • *1 Bulan:* Rp.20.000
│ • *Permanent:* Rp.75.000
❏──────────────๑` },
                    nativeFlowMessage: {
                      buttons: [
                  {
                    name: "cta_url",
                    buttonParamsJson: `{"display_text":"👤 Chat Owner ( lilith )","url":"https://wa.me/6281382415830","merchant_url":"https://wa.me/6281382415830"}`
                  },
                      ],
                    },
                  },
                  
                  {
                    header: {
                      imageMessage: await image(url),
                      hasMediaAttachment: true,
                    },
                                        body: { text: `
❏──「 *Premium* 」
│ • *10 Hari:* Rp.5.000
│ • *25 Hari:* Rp.7.000
│ • *1 Bulan:* Rp.10.000
│ • *Permanet:* Rp.80.000
❏──────────────๑` },
                    nativeFlowMessage: {
                      buttons: [
                  {
                    name: "cta_url",
                    buttonParamsJson: `{"display_text":"  💬  Chat Bot ( lility )","url":"https://wa.me/6281382415830","merchant_url":"https://wa.me/6281382415830"}`
                  },
                      ],
                    },
                  },

                ],
                messageVersion: 1,
              },
            },
          },
        },
      },
      {}
    )

    await conn.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id,
    });
    }

handler.help = ["sewa","buyprem"];
handler.tags = ["main"];
handler.command = /^(sewa|buyprem|prem)$/i;
module.exports = handler;