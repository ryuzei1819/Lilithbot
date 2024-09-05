/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

async function before(m) {
    let bot = db.data.settings[conn.user.jid];

    if (new Date() - bot.resetTime < 43200000) return;

    async function resetUserLimits() {
        let users = db.data.users;

        for (let usr in users) {
            if (users[usr].limit < 100) {
                users[usr].limit = 250;
            }
        }
    }

    const now = new Date();
    const resetTime = new Date(now.setHours(now.getHours() >= 9 ? 21 : 9, 52, 0, 0));
    const timeUntilReset = resetTime - new Date();

    setTimeout(async () => {
        await resetUserLimits();

        setInterval(async () => {
            await resetUserLimits();
        }, 43200000);
    }, timeUntilReset);

    bot.resetTime = new Date() * 1;

    async function resetAndNotifyLimits() {
        let users = db.data.users;

        let resetUsers = Object.entries(users).filter(
            ([, data]) => data.limit < 100
        );

        if (resetUsers.length > 0) {
            let limit = 250;

            resetUsers.forEach(([, data]) => {
                data.limit = limit;
            });
            console.log("Reset Limit");

            const q = {
                key: {
                    remoteJid: "status@broadcast",
                    participant: "0@s.whatsapp.net",
                    fromMe: false,
                    id: "",
                },
                message: { conversation: "Successfully reset user limit" },
            };
            await conn.sendMessage(
                `120363265892757571@g.us`,
                { text: "*[Server Notif]* Successfully Reset The Limit Below 100." },
                { quoted: q }
            );
        }
    }

    const notifyTime = new Date(now.setHours(now.getHours() >= 5 ? 17 : 5, 0, 0, 0));
    const timeUntilNotify = notifyTime - new Date();

    setTimeout(async () => {
        await resetAndNotifyLimits();

        setInterval(async () => {
            await resetAndNotifyLimits();
        }, 43200000);
    }, timeUntilNotify);
}

module.exports = {
    before
};