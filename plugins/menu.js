/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const moment = require("moment-timezone");
const fs = require("fs");
const fetch = require("node-fetch");
const os = require("os");
const totalMemory = os.totalmem();
const freeMemory = os.freemem();
const usedMemory = totalMemory - freeMemory;
const {
  generateWAMessageFromContent,
  proto, 
  prepareWAMessageMedia,
} = require("@whiskeysockets/baileys");


let menulist = async (m, { conn, usedPrefix, command, args }) => {
  
  const perintah = args[0] || "tags";
  const tagCount = {};
  const tagHelpMapping = {};
const user = global.db.data.users[m.sender] 


  Object.keys(global.plugins)
    .filter((plugin) => !plugin.disabled)
    .forEach((plugin) => {
      const tagsArray = Array.isArray(global.plugins[plugin].tags)
        ? global.plugins[plugin].tags
        : [];

      if (tagsArray.length > 0) {
        const helpArray = Array.isArray(global.plugins[plugin].help)
          ? global.plugins[plugin].help
          : [global.plugins[plugin].help];

        tagsArray.forEach((tag) => {
          if (tag) {
            if (tagCount[tag]) {
              tagCount[tag]++;
              tagHelpMapping[tag].push(...helpArray);
            } else {
              tagCount[tag] = 1;
              tagHelpMapping[tag] = [...helpArray];
            }
          }
        });
      }
    });

  let help = Object.values(global.plugins)
    .filter((plugin) => !plugin.disabled)
    .map((plugin) => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: "customPrefix" in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      };
    });

  if (perintah === "tags") {
    const daftarTag = Object.keys(tagCount)
      .sort()
      .join(`\n➤ ${usedPrefix + command} `);
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(4001);
    let fitur = Object.values(plugins)
    .filter((v) => v.help && !v.disabled)
    .map((v) => v.help)
    .flat(1);
  let totalf = Object.values(global.plugins).filter(
    (v) => v.help && v.tags,
  ).length;
  const user = global.db.data.users[m.sender];
  let hasil = fitur.length;
  let uptime = process.uptime();
  let hari = Math.floor(uptime / 86400);
  uptime %= 86400;
  let jam = Math.floor(uptime / 3600);
  uptime %= 3600;
  let menit = Math.floor(uptime / 60);
  let detik = Math.floor(uptime % 60);
  let runtime = `${hari}D ${jam}H ${menit}M ${detik}S`;
    
let dashboard = `
═════════════════════
\`</> D A S H B O A R D </>\`
═════════════════════
🌟 Hai *@${m.sender.split("@")[0]}*, Aku Adalah *${namebot}*, Bot Whatsapp Yang Akan Membantu Anda Dalam Banyak Hal Di Whatsapp. Jika Anda Menemukan Bug Atau Error, Mohon Laporkan Kepada Owner.
═════════════════════

═════════════════════
\`</> I N F O - B O T </>\`
═════════════════════
➤ *Nama Bot*: ${namebot}
➤ *Owner*: *${nameown}*
➤ *Versi*: ${version}
➤ *Mode*: ${global.opts['self'] ? 'Self' : 'Public'}
➤ *Total User*: ${Object.keys(global.db.data.users).length}
➤ *Total Chat*: ${Object.keys(conn.chats).length}
➤ *Total Menu*: ${hasil}
➤ *Runtime*: ${runtime}
➤ *Free Memori*: ${Func.formatSize(freeMemory)}
➤ *Total Memori*: ${Func.formatSize(totalMemory)}
➤ *Used Memory*: ${Func.formatSize(usedMemory)}
═════════════════════

═════════════════════
\`</> I N F O - U S E R </>\`
═════════════════════
➤ *Name*: ${db.data.users[m.sender].name}
➤ *Tags*: *@${m.sender.split("@")[0]}*
➤ *Age*: ${db.data.users[m.sender].age || 0}
➤ *Limit*: ${db.data.users[m.sender].limit}
➤ *Exp*: ${db.data.users[m.sender].exp}
➤ *Level*: ${db.data.users[m.sender].level}
➤ *Premium*: ${user.premium ? "✓" : "x"}
➤ *Role*: *[ ${db.data.users[m.sender].role} ]*
➤ *Money*: ${db.data.users[m.sender].money || 0}
═════════════════════

➤ ${usedPrefix + command} all
➤ ${usedPrefix + command} ${daftarTag}
═════════════════════ 
`;

let pz;

if (global.menu === "button") {
    pz = `${dashboard}
➤ ${usedPrefix + command} all
➤ ${usedPrefix + command} ${daftarTag}
═════════════════════
`;
}

    if (global.menu === "simple") {
let pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
conn.sendMessage(m.chat, {
    text: dashboard,
    contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
      externalAdReply: {  
        title: namebot + ' By ' + nameown,
        body: `Hello </> ${m.name} </>`,
        thumbnailUrl: pp,
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: false      }
    }
  }, { quoted: fkontak });
conn.sendMessage(m.chat, 
  {
    audio: {
      url: audioz,
      mimetype: "audio/mpeg",
    },
    contextInfo: {
      isForwarded: true,
      mentionedJid: [m.sender],
      businessMessageForwardInfo: { 
        businessOwnerJid: nomorown + "@s.whatsapp.net" 
      },
      forwardedNewsletterMessageInfo: {
        newsletterName: wm,
        newsletterJid: idsaluran
      },
      externalAdReply: {  
        title: namebot + ' By ' + nameown,
        body: `Hello </> ${m.name} </>`,
        thumbnailUrl: pp,
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  },
  { quoted: fkontak }
);
    } else if (global.menu === "doc") {
    let pp = await conn
    .profilePictureUrl(m.sender, "image")
    .catch((_) => "https://files.catbox.moe/39hmb8.jpg");
     conn.sendMessage(m.chat, {
            document: fs.readFileSync("./package.json"),
            fileName: namebot,
            fileLength: new Date(),
            pageCount: "2024",
            caption: dashboard,
            mimetype: 'image/png',
            jpegThumbnail: await conn.resize('https://files.catbox.moe/39hmb8.jpg', 400, 400),
      contextInfo: {
      externalAdReply: {
      title: namebot + 'By' + nameown,
      body: null,
      thumbnailUrl: pp, 
      sourceUrl: 'Renvy/zxy',
      mediaType: 1,
      renderLargerThumbnail: true, 
        },
        forwardingScore: 10,
        isForwarded: true,
        mentionedJid: [m.sender],
        businessMessageForwardInfo: {
            businessOwnerJid: `6281382415830@s.whatsapp.net`
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: idsaluran ,
            serverMessageId: null,
            newsletterName: global.botdate +" || " + namebot + "  🟢",
        }
    }
}, { quoted: { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: wm }}});

    }  else if (global.menu === "payment") {
      await conn.relayMessage(
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
                text: dashboard,
                contextInfo: {
                  mentionedJid: conn.parseMention(dashboard),
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
      conn.sendMessage(m.chat, 
  {
    audio: {
      url: audioz,
      mimetype: "audio/mpeg",
    },
    contextInfo: {
      isForwarded: true,
      mentionedJid: [m.sender],
      businessMessageForwardInfo: { 
        businessOwnerJid: nomorown + "@s.whatsapp.net" 
      },
      forwardedNewsletterMessageInfo: {
        newsletterName: wm,
        newsletterJid: idsaluran
      },
      externalAdReply: {  
        title: namebot + ' By ' + nameown,
        body: `Hello </> ${m.name} </>`,
        thumbnailUrl: pp,
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  },
  { quoted: fkontak }
);
    } else if (global.menu === "button") {
      const list = Object.keys(tagCount);
let array = [];
for (let i of list) {
  array.push({
    header: `🚩 MENU ${i.toUpperCase()}`,
    title: `🔍 Kategori [ ${i} ]`,
    description: `✨ Temukan lebih banyak fitur ${i} di sini!`,
    id: `${usedPrefix + command} ${i}`,
  });
}

let sections = [
  {
    title: "🌟 MENU UTAMA",
    highlight_label: "🔍 Lihat Semua Fitur",
    rows: [
      {
        header: namebot,
        title: "MENU UTAMA",
        description: "🌟 Temukan Semua Menu Bot di Sini",
        id: ".menu all",
      },
    ],
  },
  {
    title: "💬 OWNER",
    highlight_label: "📞 Hubungi Owner Kami",
    rows: [
      {
        header: "💬 OWNER",
        title: "Pemilik Bot",
        description: "📧 Kirim Pesan Kepada Owner",
        id: ".owner",
      },
    ],
  },
  {
    title: "💻 SCRIPT BOT",
    highlight_label: "💻 Lihat Script",
    rows: [
      {
        header: "💻 Source Code Bot",
        title: "Script",
        description: "💻 Informasi Script Bot",
        id: ".sc",
      },
    ],
  },
  {
    title: "📊 STATUS SERVER",
    highlight_label: "📊 Info Server",
    rows: [
      {
        header: "📊 Kinerja Server",
        title: "Ping Server",
        description: "🌐 Cek Kinerja dan Status Server Bot",
        id: ".ping",
      },
    ],
  },
  {
    title: "🌟 DAFTAR FITUR BOT",
    highlight_label: `🎉 Selamat Datang di ${namebot}! Pilih Menu di Bawah untuk Menjelajahi Fitur                                                          `,
    rows: [...array],
  },
];

let listMessage = {
  title: "✅ Jelajahi Semua Menu!",
  sections,
};

let pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
    
  let Shirokuu = generateWAMessageFromContent(m.from, {
    viewOnceMessage: {
      message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: Func.Styles(dashboard)
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "\nᴍᴏʜᴏɴ ᴜɴᴛᴜᴋ ᴛɪᴅᴀᴋ ᴍᴇʟᴀᴋᴜᴋᴀɴ ꜱᴘᴀᴍ ᴅɪ ʙᴏᴛ"
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: null,
            hasMediaAttachment: true,
            ...(await prepareWAMessageMedia({ document: { url: saluran }, mimetype: 'image/webp', fileName: `</> ${m.name} </>`, pageCount: 2024, jpegThumbnail: await Func.reSize(pp, 400, 400), fileLength: 2024000 }, { upload: conn.waUploadToServer }))
          }),
          contextInfo: {
            forwardingScore: 2024,
            isForwarded: true,
            mentionedJid: [m.sender],
            forwardedNewsletterMessageInfo: {
              newsletterJid: global.global.idsaluran,
              serverMessageId: null,
              newsletterName: global.botdate +" || " + namebot + "  🟢",
            },
            externalAdReply: {
              showAdAttribution: true,
              title: "[ Hello I'm " + namebot + " ]",
              body: global.bottime,
              mediaType: 1,
              sourceUrl: 'https://' + namebot +  '/By/' + nameown,
              thumbnailUrl: thumb,
              renderLargerThumbnail: true
            }
          },
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
                                                {
                          name: "single_select",
                          buttonParamsJson: JSON.stringify(listMessage),
                        },
                        {
                          name: "quick_reply",
                          buttonParamsJson: JSON.stringify({
                            display_text: "Group Chat",
                            id: ".groupchat",
                          }),
                        },
            ]
          })
        })
      }
    }
}, { quoted: fkontak });

  conn.relayMessage(m.key.remoteJid, Shirokuu.message, {
    messageId: m.key.id
  });
conn.sendMessage(m.chat, 
  {
    audio: {
      url: audioz,
      mimetype: "audio/mpeg",
    },
    contextInfo: {
      isForwarded: true,
      mentionedJid: [m.sender],
      businessMessageForwardInfo: { 
        businessOwnerJid: nomorown + "@s.whatsapp.net" 
      },
      forwardedNewsletterMessageInfo: {
        newsletterName: wm,
        newsletterJid: idsaluran
      },
      externalAdReply: {  
        title: namebot + ' By ' + nameown,
        body: `Hello </> ${m.name} </>`,
        thumbnailUrl: pp,
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  },
  { quoted: fkontak }
);
    } else {
      conn.sendMessage(
        m.chat,
        {
          text: dashboard,
          contextInfo: {
            mentionedJid: conn.parseMention(dashboard),
            externalAdReply: {
              title: `© ${namebot} [ ver ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
              body: wm,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    }
  } else if (tagCount[perintah]) {
    const daftarHelp = tagHelpMapping[perintah]
  .map((helpItem) => {
    return `${helpItem}`;
  })
  .join("\n│   └─ ");

let dashboard = `
┌───────
│   ${daftarHelp}
└───────
`;

    if (global.menu === "simple") {
      conn.reply(m.chat, dashboard, fkontak);
    } else if (global.menu === "doc") {
      conn.sendMessage(m.chat, {
            document: fs.readFileSync("./package.json"),
            fileName: namebot,
            fileLength: 20239999999999,
            pageCount: "2023",
            caption: dashboard,
            contextInfo: {
              externalAdReply: {
                containsAutoReply: true,
                mediaType: 1,
                mediaUrl: '',
                renderLargerThumbnail: true,
                showAdAttribution: true,
                sourceUrl: '',
                thumbnailUrl: thumb,
                title: wm, 
                body: `© ${namebot}`,
              },
            },
          });
    } else if (global.menu === "payment") {
      await conn.relayMessage(
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
                text: dashboard,
                contextInfo: {
                  mentionedJid: conn.parseMention(dashboard),
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
      conn.sendMessage(m.chat, 
  {
    audio: {
      url: audioz,
      mimetype: "audio/mpeg",
    },
    contextInfo: {
      isForwarded: true,
      mentionedJid: [m.sender],
      businessMessageForwardInfo: { 
        businessOwnerJid: nomorown + "@s.whatsapp.net" 
      },
      forwardedNewsletterMessageInfo: {
        newsletterName: wm,
        newsletterJid: idsaluran
      },
      externalAdReply: {  
        title: namebot + ' By ' + nameown,
        body: `Hello </> ${m.name} </>`,
        thumbnailUrl: pp,
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  },
  { quoted: fkontak }
);
    } else if (menu === "button") {
     conn.sendButton(m.chat, [["💬 Group Chat!", ".groupchat"]], fkontak, {
    body: dashboard, 
    url: thumb, 
    })
     conn.sendMessage(m.chat, 
  {
    audio: {
      url: audioz,
      mimetype: "audio/mpeg",
    },
    contextInfo: {
      isForwarded: true,
      mentionedJid: [m.sender],
      businessMessageForwardInfo: { 
        businessOwnerJid: nomorown + "@s.whatsapp.net" 
      },
      forwardedNewsletterMessageInfo: {
        newsletterName: wm,
        newsletterJid: idsaluran
      },
      externalAdReply: {  
        title: namebot + ' By ' + nameown,
        body: `Hello </> ${m.name} </>`,
        thumbnailUrl: pp,
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  },
  { quoted: fkontak }
);
    } else {
      conn.sendMessage(
        m.chat,
        {
          text: dashboard,
          contextInfo: {
            mentionedJid: conn.parseMention(dashboard),
            externalAdReply: {
              title: `© ${namebot} [ ver ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
              body: wm,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    }
  } else if (perintah === "all") {
    let fitur = Object.values(plugins)
    .filter((v) => v.help && !v.disabled)
    .map((v) => v.help)
    .flat(1);
  let totalf = Object.values(global.plugins).filter(
    (v) => v.help && v.tags,
  ).length;
  const user = global.db.data.users[m.sender];
  let hasil = fitur.length;
  const more = String.fromCharCode(8206);
  const readMore = more.repeat(4001);
  let uptime = process.uptime();
  let hari = Math.floor(uptime / 86400);
  uptime %= 86400;
  let jam = Math.floor(uptime / 3600);
  uptime %= 3600;
  let menit = Math.floor(uptime / 60);
  let detik = Math.floor(uptime % 60);
  let runtime = `${hari}D ${jam}H ${menit}M ${detik}S`;
    const allTagsAndHelp = Object.keys(tagCount)
  .map((tag) => {
    const daftarHelp = tagHelpMapping[tag]
      .map((helpItem) => {
        return `${usedPrefix + helpItem}`;
      })
      .join("\n│   └─ ");

    return Func.Styles(`
┌─【 *\`</> ${tag.toUpperCase()} </>\`* 】─┐
│
│   ├─ ${daftarHelp}
│
└───────────────────┘
`);
  })
  .join("\n");
    let dashboard = `
═════════════════════
\`</> D A S H B O A R D </>\`
═════════════════════
🌟 Hai *@${m.sender.split("@")[0]}*, Aku Adalah *${namebot}*, Bot Whatsapp Yang Akan Membantu Anda Dalam Banyak Hal Di Whatsapp. Jika Anda Menemukan Bug Atau Error, Mohon Laporkan Kepada Owner.
═════════════════════

═════════════════════
\`</> I N F O - B O T </>\`
═════════════════════
➤ *Nama Bot*: ${namebot}
➤ *Owner*: *${nameown}*
➤ *Versi*: ${version}
➤ *Mode*: ${global.opts['self'] ? 'Self' : 'Public'}
➤ *Total User*: ${Object.keys(global.db.data.users).length}
➤ *Total Chat*: ${Object.keys(conn.chats).length}
➤ *Total Menu*: ${hasil}
➤ *Runtime*: ${runtime}
➤ *Free Memori*: ${Func.formatSize(freeMemory)}
➤ *Total Memori*: ${Func.formatSize(totalMemory)}
➤ *Used Memory*: ${Func.formatSize(usedMemory)}
═════════════════════

═════════════════════
\`</> I N F O - U S E R </>\`
═════════════════════
➤ *Name*: ${db.data.users[m.sender].name}
➤ *Tags*: *@${m.sender.split("@")[0]}*
➤ *Age*: ${db.data.users[m.sender].age || 0}
➤ *Limit*: ${db.data.users[m.sender].limit}
➤ *Exp*: ${db.data.users[m.sender].exp}
➤ *Level*: ${db.data.users[m.sender].level}
➤ *Premium*: ${user.premium ? "✓" : "x"}
➤ *Role*: *[ ${db.data.users[m.sender].role} ]*
➤ *Money*: ${db.data.users[m.sender].money || 0}
═════════════════════


${readMore}

${allTagsAndHelp}`;

    if (global.menu === "simple") {
      conn.reply(m.chat, dashboard, fkontak);
    } else if (global.menu === "doc") {
      conn.sendMessage(m.chat, {
            document: fs.readFileSync("./package.json"),
            fileName: namebot,
            fileLength: 20239999999999,
            pageCount: "2023",
            caption: dashboard,
            contextInfo: {
              externalAdReply: {
                containsAutoReply: true,
                mediaType: 1,
                mediaUrl: '',
                renderLargerThumbnail: true,
                showAdAttribution: true,
                sourceUrl: '',
                thumbnailUrl: thumb,
                title: wm, 
                body: `© ${namebot}`,
              },
            },
          });
    }  else if (global.menu === "payment") {
      await conn.relayMessage(
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
                text: dashboard,
                contextInfo: {
                  mentionedJid: conn.parseMention(dashboard),
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
      conn.sendMessage(m.chat, 
  {
    audio: {
      url: audioz,
      mimetype: "audio/mpeg",
    },
    contextInfo: {
      isForwarded: true,
      mentionedJid: [m.sender],
      businessMessageForwardInfo: { 
        businessOwnerJid: nomorown + "@s.whatsapp.net" 
      },
      forwardedNewsletterMessageInfo: {
        newsletterName: wm,
        newsletterJid: idsaluran
      },
      externalAdReply: {  
        title: namebot + ' By ' + nameown,
        body: `Hello </> ${m.name} </>`,
        thumbnailUrl: pp,
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  },
  { quoted: fkontak }
);
    } else if (global.menu === "button") {
      const list = Object.keys(tagCount);
let array = [];
for (let i of list) {
  array.push({
    header: `🚩 MENU ${i.toUpperCase()}`,
    title: `🔍 Kategori [ ${i} ]`,
    description: `✨ Temukan lebih banyak fitur ${i} di sini!`,
    id: `${usedPrefix + command} ${i}`,
  });
}

let sections = [
  {
    title: "🌟 MENU UTAMA",
    highlight_label: "🔍 Lihat Semua Fitur",
    rows: [
      {
        header: namebot,
        title: "MENU UTAMA",
        description: "🌟 Temukan Semua Menu Bot di Sini",
        id: ".menu all",
      },
    ],
  },
  {
    title: "💬 OWNER",
    highlight_label: "📞 Hubungi Owner Kami",
    rows: [
      {
        header: "💬 OWNER",
        title: "Pemilik Bot",
        description: "📧 Kirim Pesan Kepada Owner",
        id: ".owner",
      },
    ],
  },
  {
    title: "💻 SCRIPT BOT",
    highlight_label: "💻 Lihat Script",
    rows: [
      {
        header: "💻 Source Code Bot",
        title: "Script",
        description: "💻 Informasi Script Bot",
        id: ".sc",
      },
    ],
  },
  {
    title: "📊 STATUS SERVER",
    highlight_label: "📊 Info Server",
    rows: [
      {
        header: "📊 Kinerja Server",
        title: "Ping Server",
        description: "🌐 Cek Kinerja dan Status Server Bot",
        id: ".ping",
      },
    ],
  },
  {
    title: "🌟 DAFTAR FITUR BOT",
    highlight_label: `🎉 Selamat Datang di ${namebot}! Pilih Menu di Bawah untuk Menjelajahi Fitur                                                          `,
    rows: [...array],
  },
];

let listMessage = {
  title: "✅ Jelajahi Semua Menu!",
  sections,
};
    
  let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/i97i4t.jpg')
  
  let Shirokuu = generateWAMessageFromContent(m.from, {
    viewOnceMessage: {
      message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: Func.Styles(dashboard)
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "\nᴍᴏʜᴏɴ ᴜɴᴛᴜᴋ ᴛɪᴅᴀᴋ ᴍᴇʟᴀᴋᴜᴋᴀɴ ꜱᴘᴀᴍ ᴅɪ ʙᴏᴛ"
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: null,
            hasMediaAttachment: true,
            ...(await prepareWAMessageMedia({ document: { url: saluran }, mimetype: 'image/webp', fileName: `</> ${m.name} </>`, pageCount: 2024, jpegThumbnail: await Func.reSize(pp, 400, 400), fileLength: 2024000 }, { upload: conn.waUploadToServer }))
          }),
          contextInfo: {
            forwardingScore: 2024,
            isForwarded: true,
            mentionedJid: [m.sender],
            forwardedNewsletterMessageInfo: {
              newsletterJid: global.idsaluran,
              serverMessageId: null,
              newsletterName: global.botdate +" || " + namebot + "  🟢",
            },
            externalAdReply: {
              showAdAttribution: true,
              title: "[ Hello I'm " + namebot + " ]",
              body: global.bottime,
              mediaType: 1,
              sourceUrl: 'https://' + namebot +  '/By/' + nameown,
              thumbnailUrl: thumb,
              renderLargerThumbnail: true
            }
          },
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
                                                {
                          name: "single_select",
                          buttonParamsJson: JSON.stringify(listMessage),
                        },
                        {
                          name: "quick_reply",
                          buttonParamsJson: JSON.stringify({
                            display_text: "Group Chat",
                            id: ".groupchat",
                          }),
                        },
            ]
          })
        })
      }
    }
}, { quoted: fkontak });

  conn.relayMessage(m.key.remoteJid, Shirokuu.message, {
    messageId: m.key.id
  });
 conn.sendMessage(m.chat, 
  {
    audio: {
      url: audioz,
      mimetype: "audio/mpeg",
    },
    contextInfo: {
      isForwarded: true,
      mentionedJid: [m.sender],
      businessMessageForwardInfo: { 
        businessOwnerJid: nomorown + "@s.whatsapp.net" 
      },
      forwardedNewsletterMessageInfo: {
        newsletterName: wm,
        newsletterJid: idsaluran
      },
      externalAdReply: {  
        title: namebot + ' By ' + nameown,
        body: `Hello </> ${m.name} </>`,
        thumbnailUrl: pp,
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  },
  { quoted: fkontak }
);
    } else {
      conn.sendMessage(
        m.chat,
        {
          text: dashboard,
          contextInfo: {
            mentionedJid: conn.parseMention(dashboard),
            externalAdReply: {
              title: `© ${namebot} [ ver ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
              body: wm,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    }
  } else {
    await conn.reply(
      m.chat,
      `*Maaf Menu ${perintah.toUpperCase()} Tidak Ditemukan*`,
      m,
    );
  }
};

menulist.help = ["menu"]
menulist.tags = ["main"];
menulist.command = ["menu"];
menulist.register = true
module.exports = menulist;