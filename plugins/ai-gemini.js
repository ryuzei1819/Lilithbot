/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 
let handler = async (m, { conn, text }) => {
  try {
    if (!text) {
      conn.reply(m.chat, 'masukkan teks.', m);
      return;
    }
    let response = await axios.get('https://panxypan.vercel.app/api/gemini?' + `message=${text}` )
m.reply (response.data) 
  } catch (error) {
    console.error('Error in handler:', error);
    conn.reply(m.chat, 'Terjadi kesalahan saat memproses permintaan Anda.', m);
  }
}

handler.help = handler.command = ['gemini'];
handler.tags = ['ai'];

module.exports = handler;