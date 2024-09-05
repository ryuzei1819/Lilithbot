const giveaway = {
  participants: [],
  isActive: false
};

const handler = async (m, { text, args, command, isOwner }) => {
  if (!args[0]) {
    return m.reply(`
*Giveaway Bot Command Guide*

- *Giveaway join*: Bergabung dengan event giveaway jika ada event yang aktif.
- *Giveaway buat* (Owner only): Memulai event giveaway baru.
- *Giveaway list* (Owner only): Melihat daftar peserta giveaway.
- *Giveaway spin* (Owner only): Mengambil pemenang dari event giveaway.
- *Giveaway hapus* (Owner only): Menghapus event giveaway yang sedang berjalan.

Selamat mencoba!
    `.trim());
  }

  switch (args[0].toLowerCase()) {
    case 'join':
      if (!giveaway.isActive) throw 'Tidak ada event giveaway yang aktif saat ini.';
      if (giveaway.participants.includes(m.sender)) throw 'Kamu sudah terdaftar dalam giveaway.';
      giveaway.participants.push(m.sender);
      m.reply('Kamu berhasil bergabung dalam event giveaway!');
      break;

    case 'buat':
      if (!isOwner) throw 'Hanya owner yang bisa membuat event giveaway.';
      if (giveaway.isActive) throw 'Event giveaway sudah berjalan.';
      giveaway.isActive = true;
      giveaway.participants = [];
      m.reply('Event giveaway telah dibuka! Ketik .giveaway join untuk bergabung.');
      break;

    case 'list':
      if (!isOwner) throw 'Hanya owner yang bisa melihat peserta giveaway.';
      if (!giveaway.isActive) throw 'Tidak ada event giveaway yang aktif saat ini.';
      if (giveaway.participants.length === 0) throw 'Belum ada peserta yang bergabung.';
      m.reply(`Peserta Giveaway:\n${giveaway.participants.map((jid, i) => `${i + 1}. ${jid}`).join('\n')}`);
      break;

    case 'spin':
      if (!isOwner) throw 'Hanya owner yang bisa melakukan spin untuk giveaway.';
      if (!giveaway.isActive) throw 'Tidak ada event giveaway yang aktif saat ini.';
      if (giveaway.participants.length === 0) throw 'Belum ada peserta yang bergabung.';
      let winner = giveaway.participants[Math.floor(Math.random() * giveaway.participants.length)];
      giveaway.isActive = false;
      giveaway.participants = [];
      m.reply(`Pemenang Giveaway adalah @${winner.split('@')[0]}`, null, { mentions: [winner] });
      break;

    case 'hapus':
      if (!isOwner) throw 'Hanya owner yang bisa menghapus event giveaway.';
      if (!giveaway.isActive) throw 'Tidak ada event giveaway yang aktif saat ini.';
      let confirmDelete = await m.reply('Apakah kamu yakin ingin menghapus event giveaway? Ketik "ya" untuk mengonfirmasi.');
      if (confirmDelete && confirmDelete.text.toLowerCase() === 'ya') {
        giveaway.isActive = false;
        giveaway.participants = [];
        m.reply('Event giveaway telah dihapus.');
      } else {
        m.reply('Penghapusan event giveaway dibatalkan.');
      }
      break;

    default:
      m.reply('Perintah tidak dikenal.');
      break;
  }
};

handler.help = ['giveaway'];
handler.tags = ['rpg'];
handler.command = /^giveaway$/i;
handler.private = false;

module.exports = handler;