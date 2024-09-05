const moment = require("moment-timezone");

let handler = async function (m, { conn, text }) {
    function no(number) {
        return number.replace(/\s/g, '').replace(/([@+-])/g, '');
    }

    const users = global.db.data.users;
    const premiumUsers = Object.keys(users).filter(key => users[key].premium);

    if (!premiumUsers.length) {
        return conn.reply(m.chat, 'Tidak ada pengguna premium saat ini.', m);
    }

    if (!text) {
        let message = "*[ LIST PENGGUNA PREMIUM ]*\n\n";
        message += premiumUsers.map(user => {
            const userData = users[user];
            const premiumTime = userData.premiumTime;
            
            if (isNaN(new Date(premiumTime).getTime())) {
                return `• ${userData.name || `@${user.split('@')[0]}`} (${user.split('@')[0]})\n   └── Premium Berakhir: Data tidak valid\n   └── Sisa Hari: Data tidak valid`;
            }

            const premiumDate = moment(premiumTime).tz("Asia/Jakarta");
            const remainingDays = premiumDate.diff(moment().tz("Asia/Jakarta"), 'days');
            return `• ${userData.name || `@${user.split('@')[0]}`} (${user.split('@')[0]})\n   └── Premium Berakhir: ${premiumDate.format('DD/MM/YYYY HH:mm:ss')}\n   └── Sisa Hari: ${remainingDays} hari`;
        }).join('\n\n');
        message += `\n\n*Total Pengguna Premium: ${premiumUsers.length}*`;

        return conn.reply(m.chat, message, m);
    }

    text = no(text);
    const filteredUsers = premiumUsers.filter(uid => uid.includes(text));

    if (!filteredUsers.length) {
        return conn.reply(m.chat, `Tidak ada pengguna premium yang cocok dengan "${text}".`, m);
    }

    let message = "*[ LIST PENGGUNA PREMIUM ]*\n\n";
    message += filteredUsers.map(user => {
        const userData = users[user];
        const premiumTime = userData.premiumTime;
        
        if (isNaN(new Date(premiumTime).getTime())) {
            return `• ${userData.name || `@${user.split('@')[0]}`} (${user.split('@')[0]})\n   └── Premium Berakhir: Data tidak valid\n   └── Sisa Hari: Data tidak valid`;
        }

        const premiumDate = moment(premiumTime).tz("Asia/Jakarta");
        const remainingDays = premiumDate.diff(moment().tz("Asia/Jakarta"), 'days');
        return `• ${userData.name || `@${user.split('@')[0]}`} (${user.split('@')[0]})\n   └── Premium Berakhir: ${premiumDate.format('DD/MM/YYYY HH:mm:ss')}\n   └── Sisa Hari: ${remainingDays} hari`;
    }).join('\n\n');
    message += `\n\n*Total Pengguna Premium: ${filteredUsers.length}*`;

    return conn.reply(m.chat, message, m);
};

handler.help = ["listprem"];
handler.command = ["listprem"];
handler.tags = ["owner"];

module.exports = handler;