const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];

const handler = async (m, { conn, command, text }) => {
  if (!text) return conn.reply(m.chat, 'Ketik Namanya Tolol!', m);

  conn.reply(m.chat, `
    °  *Kontol ${text}*  °
    • Nama : ${text}
    • Kontol : ${pickRandom(['Mancung', 'Bengkok', 'Muluss', 'Sengkleh', 'Ber urat', 'Ber Otot', 'Kebawah'])}
    ┃ Ukuran : ${pickRandom(['sekecil pasir', 'Kek Pulpen kurus kering', 'tipis kek ranting', 'sangat amat besar', 'kek pler kucing'])}
    ┃ Jembut : ${pickRandom(['lebat', 'ada sedikit', 'gada jembut', 'tipis', 'muluss'])}
    ┗ Warna : ${pickRandom(['black doff', 'black glossy', 'pink terang', 'vantablack', 'pink glossy'])}
  `.trim(), m);
};

handler.help = ['cekkontol'];
handler.tags = ['fun'];
handler.command = /^cekkontol/i;

module.exports = handler;