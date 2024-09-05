/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const similarity = require('similarity');
const threshold = 0.72;

async function before(m) {
    let id = m.chat;
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hemo/i.test(m.quoted.text) || /.*hemo/i.test(m.text))
        return true;
    
    this.tebakemoji = this.tebakemoji ? this.tebakemoji : {};
    if (!(id in this.tebakemoji))
        return this.reply(m.chat, 'Soal itu telah berakhir', m);
    
    if (m.quoted.id == this.tebakemoji[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text);
        if (isSurrender) {
            clearTimeout(this.tebakemoji[id][3]);
            delete this.tebakemoji[id];
            return this.reply(m.chat, '*Yah Menyerah :( !*', m);
        }
        
        let json = JSON.parse(JSON.stringify(this.tebakemoji[id][1]));
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == (json.unicodeName).toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakemoji[id][2];
            this.reply(m.chat, `✅ *Benar!*\n+${this.tebakemoji[id][2]} XP`, m);
            clearTimeout(this.tebakemoji[id][3]);
            delete this.tebakemoji[id];
        } else if (similarity(m.text.toLowerCase(), (json.unicodeName).toLowerCase().trim()) >= threshold)
            m.reply(`❗ *Dikit Lagi!*`);
        else
            this.reply(m.chat, `❌ *Salah!*`, m);
    }
    return true;
}

const exp = 0;

const buttontebakemoji = [
    ['tebakemoji', '/tebakemoji']
];

module.exports = {
    before,
    exp,
    buttontebakemoji
};