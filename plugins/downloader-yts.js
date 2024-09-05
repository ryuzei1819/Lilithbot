const yts = require("yt-search");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*Contoh:* ${usedPrefix + command} *[query]*`;
  
  m.reply("🔍 Sedang mencari...");

  try {
    let result = await yts(text);
    let videos = result.videos;
    let array = [];
    
    for (let i of videos) {
      array.push({
        headers: "🔎 YOUTUBE SEARCH RESULTS",
        rows: [
          {
            headers: "📹 Download Video",
            title: i.title,
            body: `
🔗 URL: ${i.url}
🕒 Durasi: ${i.timestamp}
👁️‍🗨️ Tayangan: ${i.views}
            `,
            command: ".ytv " + i.url,
          },
          {
            headers: "🎵 Download Audio",
            title: i.title,
            body: `
🔗 URL: ${i.url}
🕒 Durasi: ${i.timestamp}
👁️‍🗨️ Tayangan: ${i.views}
            `,
            command: ".yta " + i.url,
          },
        ],
      });
    }

    conn.sendList(m.chat, `🔎 Hasil Pencarian [${videos.length}]`, array, m, {
      body: `📚 *Hasil Pencarian:* ${text}\n\n*Klik tombol di bawah untuk mengunduh video atau audio.*`,
      footer: "\n🔹 Klik tombol di bawah untuk melihat hasil lebih lanjut.",
      url: videos[0].thumbnail,
    });

  } catch (e) {
    m.reply("❌ Terjadi kesalahan saat mencari video.");
    console.error(e);
  }
};

handler.help = ["yts", "ytsearch"].map((a) => a + " *[query]*");
handler.tags = ["downloader"];
handler.command = ["yts", "ytsearch"];

module.exports = handler;