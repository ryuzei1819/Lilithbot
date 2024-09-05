/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

var handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0])
    throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://www.xnxx.com/video-nofat0d/hot_japan_girl_suzuka_ishikawa_in_beautiful_group_sex_scene`;
  try {
    m.reply("*Please wait..*");
    const url = args[0];
    const hasil = await Scraper.Tools.xnxx.download(url);
  conn.sendFile(m.chat, hasil.files.low, null, done, m);
  delete conn.xnxx[m.sender];
  } catch (e) {
    console.log(e);
    if (m.sender) {
      conn.reply(m.chat, `_*Terjadi kesalahan!*_`, m);
    }
  }
};
handler.help = ["xnxxdl"];
handler.command = /^(xnxxdl)$/i;
handler.tags = ["downloader"];
handler.limit = true;

module.exports = handler;