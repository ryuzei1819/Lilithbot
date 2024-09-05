module.exports.before = async function (m, { conn, participants }) {
  conn.syaii = conn.syaii
    ? conn.syaii
    : {
        join: false,
        time: 0,
      };
  if (!m.isGroup) {
    return;
  }
  
  const currentTime = Math.floor(Date.now() / 1000);
  
  if (m.sender === nomorown + "@s.whatsapp.net" && conn.syaii["time"] < currentTime) {
    await conn.sendMessage(m.chat, { sticker: { url: "https://telegra.ph/file/c5d7dccbf0788be9b1990.jpg" } }, { quoted: m });
    conn.syaii = {
      join: true,
      time: currentTime + 30 * 60, // Set the next allowed time to 30 minutes from now
    };
  }
  
  if (conn.syaii["time"] < currentTime) {
    conn.syaii = {
      join: false,
      time: 0,
    };
  }
};