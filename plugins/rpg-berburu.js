/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const cooldown = 86400000; // 24 hours in milliseconds

let handler = async (m, { conn }) => {
    let user = db.data.users[m.sender];
    let now = new Date();
    if (now - user.lastberburu < cooldown) {
        let remainingTime = user.lastberburu + cooldown - now;
        conn.reply(m.chat, `*Sepertinya Kamu Sudah Kecapekan*\n*Silahkan Istirahat Dulu Selama* ${clockString(remainingTime)}`, m);
    } else {
        // Random animal counts
        let animals = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10));

        let hsl = `
___________• Hasil Berburu •____________

*🐂 = [ ${animals[0]} ]*        *🐃 = [ ${animals[6]} ]*
*🐅 = [ ${animals[1]} ]*        *🐮 = [ ${animals[7]} ]*
*🐘 = [ ${animals[2]} ]*        *🐒 = [ ${animals[8]} ]*
*🐐 = [ ${animals[3]} ]*        *🐗 = [ ${animals[9]} ]*
*🐼 = [ ${animals[4]} ]*        *🐖 = [ ${animals[10]} ]*
*🐊 = [ ${animals[5]} ]*        *🐓 = [ ${animals[11]} ]*
`;

        // Update user's animal counts
        user.banteng += animals[0];
        user.harimau += animals[1];
        user.gajah += animals[2];
        user.kambing += animals[3];
        user.panda += animals[4];
        user.buaya += animals[5];
        user.kerbau += animals[6];
        user.sapi += animals[7];
        user.monyet += animals[8];
        user.babihutan += animals[9];
        user.babi += animals[10];
        user.ayam += animals[11];

        // Simulate delay in hunting process
        setTimeout(() => {
            conn.reply(m.chat, hsl, m);
        }, 20000);

        setTimeout(() => {
            m.reply(`Mengambil sasaran`);
        }, 18000);

        setTimeout(() => {
            m.reply("Menembak sasaran!");
        }, 15000);

        setTimeout(() => {
            m.reply("Mendapatkan sasaran!");
        }, 14000);

        setTimeout(() => {
            m.reply("Sedang mencari mangsa...");
        }, 0);

        user.lastberburu = now.getTime();
    }
};

handler.help = ['berburu'];
handler.tags = ['rpg'];
handler.command = /^(berburu)$/i;
handler.group = true;
module.exports = handler;

function clockString(ms) {
    let d = Math.floor(ms / 86400000);
    let h = Math.floor(ms / 3600000) % 24;
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [d, ' *Hari*\n ', h, ' *Jam*\n ', m, ' *Menit*\n ', s, ' *Detik* '].map(v => v.toString().padStart(2, 0)).join('');
}