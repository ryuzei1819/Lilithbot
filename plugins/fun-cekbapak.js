/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Contoh: ${usedPrefix}${command} Rizki`;
    const bpk = [
    'Agus',
    'Bambang',
    'Joko',
    'Nanang',
    'Sucipto',
    'Sugeng',
    'Sudarmo',
    'Suryo',
    'Wahyu',
    'Widodo',
    'Wijaya',
    'Wisnu',
    'Yanto',
    'Yoga',
    'Yudha',
    'Yulianto',
    'Yusuf',
    'Zainal',
    'Zainuddin',
    'Hadi',
    'Darmawan',
    'Edi',
    'Firman',
    'Gunawan',
    'Ismail',
    'hakim',
    'Lukman',
    'Maman',
    'Nasrudin',
    'Omar',
    'Purnama',
    'wanto',
    'Rahmat',
    'Samsul',
    'Taufik',
    'Usman',
    'Wahyudi',
    'Yusuf',
    'Zainuddin',
    'Harto',
    'Subianto',
    'Hartono',
    'Hendro',
    'Wibowo',
    'Santoso',
    'Suryanto',
    'Sutanto',
    'Sumarno',
    'gapunya jir',
    'Supriyanto'
];

    m.reply (`Nama bapaknya ${text} adalah ${pickRandom(bpk)}`)
};

handler.command = ['cekbapak', 'cekayah']; 
handler.help = ['cekbapak <name>', 'cekayah <name>']; 
handler.tags = ['fun']; 
handler.limit = true; 

module.exports = handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}