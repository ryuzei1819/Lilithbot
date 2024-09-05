const moment = require("moment-timezone");

let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.buyprem = conn.buyprem || {};

    const packages = Array.from({ length: 30 }, (_, i) => ({
        price: (i + 1) * 1000,
        name: `PREMIUM ${i + 1}D`,
        expired: i + 1
    }));

    const user = db.data.users[m.sender];
    const saldo = `*💳 Saldo Anda:* ${Func.formatNumber(user.saldo)}`;

    const list = {
        data: packages.map((pkg) => ({
            name: pkg.name,
            favorites: Func.formatNumber(pkg.price),
            url: `*• Expired:* ${pkg.expired} hari`,
        })),
    };

    if (!text) {
       
        return conn.sendList(
            m.chat,
            "🌟 Pilih Paket Premium",
            list.data.map((pkg, i) => ({
                rows: [
                    {
                        headers: pkg.name,
                        title: `• Harga: ${pkg.favorites}`,
                        body: pkg.url,
                        command: `${usedPrefix + command} ${i + 1}`,
                    },
                ],
            })),
            m,
            {
                body: "*📚 Contoh:* " + `${usedPrefix + command} [nomor paket]` + "\n\n" + saldo,
                footer: `${namebot} By ${nameown}`,
            }
        );
    }

    if (conn.buyprem[m.sender]) {
        const data = conn.buyprem[m.sender];
        if (text === "y") {
            if (user.saldo < data.price) {
                const cap = `*🚫 Gagal Membeli Premium*\n\n*• Paket:* ${data.data.name}\n*• Harga:* ${Func.formatNumber(data.price)} *[ Termasuk Biaya Admin ]*\n*• Expired:* ${data.currentDate} *[ ${data.data.expired} hari ]*\n\nSaldo Anda *[ ${Func.formatNumber(user.saldo)} ]* tidak cukup. Ingin mengisi saldo?`;
                conn.sendButton(m.chat,[["💸 Deposit", `.deposit ${data.price}`],
                    ["❌ Batal", `${usedPrefix + command} n`]], m, {
body: cap, 
})
                delete conn.buyprem[m.sender];
            } else {
                user.saldo -= parseInt(data.price);
                user.premium = true;
                user.premiumTime = Date.now() + (data.data.expired * 24 * 60 * 60 * 1000);  
                const premiumDate = moment(user.premiumTime).tz("Asia/Jakarta").format('DD/MM/YYYY HH:mm:ss');
                const remainingDays = data.data.expired;
                const cap = `*✅ Pembelian Premium Berhasil*\n*• Status:* Aktif!\n*• Paket:* ${data.data.name}\n*• Harga:* ${Func.formatNumber(data.price)} *[ Termasuk Biaya Admin ]*\n*• Expired:* ${premiumDate}\n*• Sisa Hari:* ${remainingDays} hari\n\nSaldo Anda saat ini: *[ ${Func.formatNumber(user.saldo)} ]*`;
                await conn.sendList(
                    m.chat,
                    "📋 Konfirmasi Pesanan",
                    [{
                        rows: [
                            { title: "👤 Profil", command: `.profile` },
                            { title: "📋 Menu", command: `.menu` },
                        ]
                    }],
                    m,
                    {
                        body: cap,
                        footer: `${namebot} By ${nameown}`,
                        mentions: [m.sender]
                    }
                );

                const ownerJid = global.nomorown + '@s.whatsapp.net';

                const adminMessage = `*💼 Pembelian Premium*\n\n*• Pengguna:* @${m.sender.split('@')[0]}\n*• Paket:* ${data.data.name}\n*• Harga:* ${Func.formatNumber(data.price)}\n*• Expired:* ${premiumDate}\n\n*Saldo User:* ${Func.formatNumber(user.saldo)}\n*Tanggal Pembelian:* ${moment().tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm")}`;
                
                await conn.sendMessage(ownerJid, { text: adminMessage }, { quoted: fkontak });

                delete conn.buyprem[m.sender];
            }
        } else if (text === "n") {
            const cap = `*❌ Pembelian Premium Dibatalkan*\n*• Paket:* ${data.data.name}\n*• Harga:* ${Func.formatNumber(data.price)} *[ Termasuk Biaya Admin ]*\n*• Expired:* ${data.expired} *[ ${data.data.expired} hari ]*`;
            await conn.sendButton(m.chat, cap, null, [
                ["🔄 Pilih Paket", `${usedPrefix + command}`]
            ], { mentions: [m.sender] });
            delete conn.buyprem[m.sender];
        }
    } else {
        const select = packages[text - 1];
        if (!select) {
            return conn.sendMessage(m.chat, '❌ Paket tidak ditemukan!', { mentions: [m.sender] });
        }
        const harga = select.price + 500; 
        const currentDate = moment()
            .tz("Asia/Jakarta")
            .add(select.expired, "days")
            .format("DD/MM/YYYY HH:mm");
        const orderID = "PREMBOT-" + Func.makeId(25);
        const cap = `*📈 Pembelian Premium*\n\n*• Status:* Menunggu\n*• Paket:* ${select.name}\n*• Harga:* ${Func.formatNumber(harga)} *[ Termasuk Biaya Admin ]*\n*• Expired:* ${currentDate} *[ ${select.expired} hari ]*\n\nKetik *Y* untuk melanjutkan pembayaran\nKetik *N* untuk membatalkan pembayaran`;

        await conn.sendList(
            m.chat,
            "📋 Konfirmasi Pesanan",
            [{
                rows: [
                    { title: "✅ Konfirmasi", command: `${usedPrefix + command} y` },
                    { title: "❌ Batalkan", command: `${usedPrefix + command} n` },
                ]
            }],
            m,
            {
                body: cap,
                footer: `${namebot} By ${nameown}`,
                mentions: [m.sender]
            }
        );

        conn.buyprem[m.sender] = {
            id: orderID,
            status: false,
            jid: m.sender,
            price: harga,
            expired: currentDate,
            data: select,
        };
    }
};

handler.help = ['buyprem'];
handler.command = ['buyprem'];
handler.tags = ['main'];

module.exports = handler;