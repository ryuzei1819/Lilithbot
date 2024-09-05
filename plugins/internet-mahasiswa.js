/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');

const handler = async (m, { conn, text }) => {
  if (!text) throw 'Masukkan Nama Mahasiswa/Siswa yang ingin kamu cari!';
  
  conn.reply(m.chat, '🔍 Sedang mencari data... Silakan tunggu sebentar.', m);
  
  try {
    let res = await fetch(`https://api-frontend.kemdikbud.go.id/hit_mhs/${text}`);
    
    if (!res.ok) throw 'Data tidak ditemukan';
    
    let json = await res.json();
    let message = '🎓 *Hasil Pencarian Mahasiswa/Siswa* 🎓\n\n';
    
    json.mahasiswa.forEach(data => {
      let nama = data.text;
      let websiteLink = data['website-link'];
      let website = `https://pddikti.kemdikbud.go.id${websiteLink}`;
      message += `👤 *Nama*: ${nama}\n🔗 *Link Data*: [Klik di sini](${website})\n\n`;
    });
    
    conn.reply(m.chat, message.trim() || 'Data tidak ditemukan', m);
  } catch (error) {
    conn.reply(m.chat, `Terjadi kesalahan: ${error.message}`, m);
  }
};

handler.help = ['mahasiswa'];
handler.tags = ['internet'];
handler.command = /^(mahasiswa)$/i;
handler.limit = true;

module.exports = handler;