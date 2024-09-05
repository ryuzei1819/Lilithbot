/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = m => m;

handler.before = async function (m) {
    let user = db.data.users[m.sender];
    if (new Date() - user.premiumTime > 0) {
        user.premiumTime = 0;
        user.premium = false;
    }
};

module.exports = handler;