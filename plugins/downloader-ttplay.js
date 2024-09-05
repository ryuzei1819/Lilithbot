let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Usage :* ${usedPrefix + command} *[query]*`;
  m.reply("🔍 Searching... Please wait.");

  try {
    let search = await Scraper["Api"].ttSearch(text);
    let random = Func.random(search.videos);
    let vid = "https://tikwm.com" + random.play;

    let caption = `*🎵 [ TIKTOK PLAY ] 🎵*
    
*📌 Title :* ${random.title}
*🌍 Region :* ${random.region}
*⏱️ Duration :* ${random.duration} seconds
*👁️ Views :* ${Func.formatNumber(random.play_count)}
*❤️ Likes :* ${Func.formatNumber(random.digg_count)}
*✍️ Author :* ${random.author.nickname}`;

    await conn.sendMessage(
      m.chat,
      {
        video: { url: vid },
        caption: caption
      },
      { quoted: m }
    );

  } catch (e) {
    throw e;
  }
};

handler.help = ["ttplay", "tiktokplay"];
handler.tags = ["downloader"];
handler.command = ["ttplay", "tiktokplay"];

module.exports = handler;