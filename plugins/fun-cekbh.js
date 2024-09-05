/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const getRandomItem = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

const handler = async (m, { conn, text }) => {
    if (!text) throw "Nama tidak ditemukan.";

    const sizes = ['tepos', '30', '32A', '32B', '32C', '34A', '34B', '34C', '36A', '36B', '36C', '38A', '38B', '38C', '40A', '40B', '40C', '42A', '42B', '42C'];
    const colors = ['Merah', 'Biru', 'Hijau', 'Kuning', 'Hitam', 'Putih', 'Oranye', 'Ungu', 'Coklat', 'Abu-abu', 'Merah Muda', 'Biru Muda', 'Hijau Muda', 'Krem', 'Biru Tua', 'Hijau Tua', 'Biru Langit', 'Toska', 'Salmon', 'Emas', 'Perak', 'Magenta', 'Cyan', 'Olive', 'Navy', 'transparan'];
    const shapes = ['underwired', 'push-up', 'balcanote', 'padded', 'halter', 'Bikini', 'bralette', 'sport', 'tube', 'bridal', 'T-brief', 'tshirt', 'multiway', 'Midi', 'Maxi', 'tidak pakai', 'nursing', 'Cheeky', 'Brazilian', 'Cutaway', 'halter'];

    const randomSize = getRandomItem(sizes);
    const randomColor = getRandomItem(colors);
    const randomShape = getRandomItem(shapes);

    conn.reply(m.chat, `Bra untuk si @${text} adalah:\nUkuran: ${randomSize}\nWarna: ${randomColor}\nBentuk: ${randomShape}`, m);
};

handler.help = ["cekbh"];
handler.command = ["cekbh"];
handler.tags = ["fun"];

module.exports = handler;