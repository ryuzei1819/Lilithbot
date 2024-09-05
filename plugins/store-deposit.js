const { Saweria } = require("../lib/saweria");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.deposit = conn.deposit ? conn.deposit : {};
  
  if (!text) throw `*📝 Contoh:* ${usedPrefix + command} *[jumlah]*`;
  if (isNaN(text)) throw `*[❌] Input harus angka, bukan huruf*`;
  if (text < 1000) throw `*[❌] Setoran minimum adalah 1.000, maksimum 1.000.000*`;
  if (text > 1000000) throw `*[❌] Setoran maksimum adalah 1.000.000*`;
  
  m.reply("⏳ *Proses sedang berlangsung...*");

  try {
    let a = new Saweria(db.data.saweria);
    // Note: gunakan .login email dan password untuk akses fitur deposit ini
    let qris = await (await a.createQr(text, "Deposit Saldo")).data;
    
    let caption = `*🎉 DEPOSIT 🎉*
*💰 Nominal:* ${Func.formatNumber(text)}
*💵 Mata Uang:* ${qris.currency}
*📋 Pesan:* ${qris.message}
*🆔 ID Deposit:* ${qris.id}
*⏳ Bayar Sebelum:* ${qris.expired_at}

*📲 Silahkan scan QRIS di atas dengan e-wallet kalian*
*✅ QRIS INI MENDUKUNG: DANA, OVO, DOPAY, SHOPPEEPAY, DLL*`;

    let key = await conn.sendMessage(
      m.chat,
      {
        image: Buffer.from(qris.qr_image.substring(22), "base64"),
        caption: caption,
      },
      { quoted: fkontak },
    );

    conn.deposit[m.sender] = {
      status: false,
      jid: m.sender,
      name: m.name,
      nominal: text,
      id: qris.id,
      reply: key,
    };

    setTimeout(() => {
      conn.sendMessage(m.chat, {
        delete: key,
      });
      conn.sendMessage(
        m.chat,
        {
          text: `*❌ SESI KADALUARSA*\nSilahkan ketik *[.deposit]* lagi untuk melakukan deposit saldo.`,
        },
        { quoted: key },
      );
      delete conn.deposit[m.sender];
    }, 600000); // Delay 10 menit

  } catch (e) {
    throw e;
  }
};

handler.before = async (m, { conn }) => {
  conn.deposit = conn.deposit ? conn.deposit : {};
  
  if (!m.text) return;
  if (!conn.deposit[m.sender]) return; // Cek jika conn.deposit[m.sender] ada atau tidak

  let a = new Saweria(db.data.saweria);
  let cek = await a.cekPay(conn.deposit[m.sender].id);

  if (conn.deposit[m.sender].id) {
    if (cek.msg === "SUCCESS") {
      db.data.users[m.sender].saldo += conn.deposit[m.sender].nominal;
      conn.deposit[m.sender].status = true;

      let cap = `*✅ TRANSAKSI BERHASIL ✅*
*🧑 Nama:* @${conn.deposit[m.sender].jid.split("@")[0]}
*💸 Nominal:* ${Func.formatNumber(conn.deposit[m.sender].nominal)}
*🆔 ID:* *[ ${conn.deposit[m.sender].id} ]*`;

      await conn.sendMessage(
        m.chat,
        {
          image: await Scraper["Tools"].ssweb(cek.url),
          caption: cap,
          mentions: [conn.deposit[m.sender].jid],
        },
        { quoted: conn.deposit[m.sender].reply },
      );

      setTimeout(() => {
        delete conn.deposit[m.sender];
      }, 5000);

    } else {
      console.log(require("chalk").green.bold("[ System notif ] Menunggu Pembayaran"));
    }
  } else return;
};

handler.help = ["deposit"].map((a) => a + " *[jumlah]*");
handler.tags = ["store"];
handler.command = ["deposit","depo"];
module.exports = handler;