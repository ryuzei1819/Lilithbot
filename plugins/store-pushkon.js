let handler = async (m, { conn, groupMetadata, usedPrefix, text, command }) => {
    if (!text && !m.quoted) return m.reply("❗️ *Masukkan teks yang akan dikirim atau balas pesan yang ingin diteruskan* ❗️");

    let get = await groupMetadata.participants.filter(v => v.id.endsWith('.net')).map(v => v.id);
    let count = get.length;
    let sentCount = 0;
    let delay = 5000; 
    let estimatedTime = (count * delay) / 1000;

    let groupName = groupMetadata.subject;
    let groupOwner = groupMetadata.owner ? groupMetadata.owner : "Tidak diketahui";
    let groupCreation = new Date(groupMetadata.creation * 1000).toLocaleString();
    let groupDesc = groupMetadata.desc ? groupMetadata.desc : "Tidak ada deskripsi";
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(4001);
    m.reply(`⏳ *Sedang mengirim pesan ke ${count} kontak...* \nEstimasi waktu selesai: ${estimatedTime} detik`);

    for (let i = 0; i < get.length; i++) {
        setTimeout(function() {
            if (text) {
                conn.relayMessage(get[i], {
                    requestPaymentMessage: {
                        currencyCodeIso4217: 'USD',
                        amount1000: 99999 * 1000,
                        requestFrom: '0@s.whatsapp.net',
                        noteMessage: {
                            extendedTextMessage: {
                                text: text + `\n\n${readMore}Form *@${m.sender.split('@')[0]}*`,
                                contextInfo: {
                                    mentionedJid: [m.sender],
                                    externalAdReply: {
                                        showAdAttribution: true
                                    }
                                }
                            }
                        }
                    }
                }, {});
            } else if (m.quoted) {
                conn.copyNForward(get[i], m.getQuotedObj(), false);
            } else if (text && m.quoted) {
                conn.sendMessage(get[i], {
                    text: text + "\n" + m.quoted.text
                });
            }
            count--;
            sentCount++;
            if (count === 0) {
                m.reply(`✅ *Push Kontak Berhasil* ✅\n\nJumlah Pesan Terkirim: *${sentCount}*\n\n*Informasi Grup:*\nNama Grup: ${groupName}\nPemilik Grup: ${groupOwner}\nDibuat Pada: ${groupCreation}\nDeskripsi: ${groupDesc}`);
            }
        }, i * delay);
    }
}

handler.command = handler.help = ['pushkontak','pushkon']
handler.tags = ['owner']
handler.owner = true
handler.group = true

module.exports = handler;