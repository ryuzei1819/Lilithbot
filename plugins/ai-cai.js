/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.cai = conn.cai ? conn.cai : {};
  if (!text)
    throw `*• Example:* ${usedPrefix + command} *[on/off]*
*• Example search Chara:* ${usedPrefix + command} search *[characters name]*`;
  const keyword = text.split(" ")[0];
  const data = text.slice(keyword.length + 1);
  if (keyword === "search") {
    if (!data) throw `*• Example:* ${usedPrefix + command} ${keyword} Hutao`;
    m.reply(`_🔍searching data.... *[ ${data} ]*_`);
    let search = await Func.fetchJson(
      "https://api.apigratis.site/cai/search_characters?query=" + data,
    );
    let karakter = search.result.characters
      .map(
        (a, index) => `*[ ${index + 1}. ${a.participant__name} ]*
*• Greeting:* \`${a.greeting}\`
*• Visibility:* ${a.visibility}
*• Creator:* ${a.user__username}`,
      )
      .join("\n\n");
    const reply = await conn.reply(m.chat, karakter, fkontak, {
      contextInfo: {
        mentionedJid: [],
        groupMentions: [],
        externalAdReply: {
          title: search.result.characters[0].participant__name,
          body: search.result.characters[0].greeting,
          thumbnailUrl:
            "https://characterai.io/i/200/static/avatars/" +
            search.result.characters[0].avatar_file_name,
          sourceUrl: "",
          mediaType: 1,
          renderLargerThumbnail: false,
        },
      },
    });
    await conn.reply(
      m.chat,
      `*[ KETIK ANGKA 1 SAMPAI ${search.result.characters.length} ]*
> • _! Pilih karakter anda dengan mengetik *.cai set (nomor urut)* sesuai dengan pesan diatas_`,
      reply,
    );
    conn.cai[m.sender] = {
      pilih: search.result.characters,
    };
  } else if (keyword === "set") {
    if (!conn.cai[m.sender])
      throw `*[ KAMU BELUM MENCARI CHARACTER ]*
> _ketik *.cai search* untuk mencari characters favorit mu_`;
    if (!conn.cai[m.sender].pilih)
      throw `*[ KAMU SUDAH PUNYA CHARACTER ]*
> _ketik *.cai search* untuk menganti characters_`;
    if (!data) throw `*• Example:* ${usedPrefix + command} ${keyword} 1`;
    let pilihan = conn.cai[m.sender].pilih[data - 1];
    let info = await Func.fetchJson(
      "https://api.apigratis.site/cai/character_info?external_id=" +
        pilihan.external_id,
    );
    let caption = `*[ INFO CHARACTERS NO ${data} ]*
*• Name:* ${pilihan.paeticipant__name}
*• Greeting:* \`${pilihan.greeting}\`
*• Visibily:* ${pilihan.visibility}
*• Description:* ${info.result.character.description}`;
    let q = await conn.reply(m.chat, caption, m, {
      contextInfo: {
        mentionedJid: [],
        groupMentions: [],
        externalAdReply: {
          title: pilihan.participant__name,
          body: pilihan.greeting,
          thumbnailUrl:
            "https://characterai.io/i/200/static/avatars/" +
            pilihan.avatar_file_name,
          sourceUrl: "",
          mediaType: 1,
          renderLargerThumbnail: false,
        },
      },
    });
    conn.cai[m.sender] = {
      isChats: false,
      id: pilihan.external_id,
      thumb:
        "https://characterai.io/i/200/static/avatars/" +
        pilihan.avatar_file_name,
      name: pilihan.participant__name,
    };
  } else if (keyword === "on") {
    if (!conn.cai[m.sender])
      throw `*[ KAMU BELUM MENCARI CHARACTER ]*
> _ketik *.cai search* untuk mencari characters favorit mu_`;
    conn.cai[m.sender].isChats = true;
    m.reply("_*[ ✓ ] Room chat berhasil dibuat*_");
  } else if (keyword === "off") {
    if (!conn.cai[m.sender])
      throw `*[ KAMU BELUM MENCARI CHARACTER ]*
> _ketik *.cai search* untuk mencari characters favorit mu_`;
    conn.cai[m.sender].isChats = false;
    m.reply("_*[ ✓ ] Berhasil keluar dari Room chat*_");
  }
};

handler.before = async (m, { conn, usedPrefix }) => {
  conn.cai = conn.cai ? conn.cai : {};
  if (!m.text) return;
  if (m.text.match(global.prefix)) return;
  if (!conn.cai[m.sender]) return;
  if (!conn.cai[m.sender].isChats) return;
  let { data } = await axios.post(
    "https://api.apigratis.site/cai/send_message",
    {
      external_id: conn.cai[m.sender].id,
      message: m.text,
    },
  );
  await conn.reply(
    m.chat,
    data.result.replies[0].text.replace("surya", m.name),
    m,
    {
      contextInfo: {
        mentionedJid: [],
        groupMentions: [],
        externalAdReply: {
          title: conn.cai[m.sender].name,
          body: null,
          thumbnailUrl: conn.cai[m.sender].thumb,
          sourceUrl: "",
          mediaType: 1,
          renderLargerThumbnail: false,
        },
      },
    },
  );
};
handler.help = ["cai"]
handler.tags = ["ai"];
handler.command = ["cai"];

module.exports = handler;