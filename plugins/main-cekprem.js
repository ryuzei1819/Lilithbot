const moment = require("moment-timezone");

let handler = async function (m, { conn }) {
    const user = m.sender;
    const users = global.db.data.users;

    if (typeof users[user] === 'undefined') {
        return conn.reply(m.chat, '🚩 Pengguna tidak ada di dalam data base', m);
    }

    const userData = users[user];
    const now = moment().tz("Asia/Jakarta").valueOf();
    const premiumTime = userData.premiumTime;
    const isPremium = userData.premium || false;

    if (!isPremium || now > premiumTime) {
        return conn.reply(m.chat, '🚩 Anda tidak memiliki akses premium atau masa aktif premium telah berakhir.', m);
    }

    if (typeof premiumTime !== 'number' || isNaN(premiumTime)) {
        return conn.reply(m.chat, '🚩 Tanggal premium tidak valid. Pastikan data premiumTime diatur dengan benar.', m);
    }

    const remainingTime = premiumTime - now;

    if (isNaN(remainingTime) || remainingTime <= 0) {
        return conn.reply(m.chat, '🚩 Waktu premium telah berakhir atau tidak valid.', m);
    }

    const premiumEndDate = moment(premiumTime).tz("Asia/Jakarta").format('DD/MM/YYYY HH:mm:ss');
    
    const duration = moment.duration(remainingTime);
    const remainingDays = Math.floor(duration.asDays());
    const remainingHours = duration.hours();
    const remainingMinutes = duration.minutes();
    const remainingSeconds = duration.seconds();

    const message = `*CEK PREMIUM*\n\n` +
        `• Nama: ${userData.name || `@${user.split('@')[0]}`} (${user.split('@')[0]})\n` +
        `• Premium Berakhir: ${premiumEndDate}\n` +
        `• Sisa Waktu: ${remainingDays} hari ${remainingHours} jam ${remainingMinutes} menit ${remainingSeconds} detik`;

    conn.reply(m.chat, message, m);
};

handler.help = ["cekprem"];
handler.command = ["cekprem"];
handler.tags = ["main"];

module.exports = handler;