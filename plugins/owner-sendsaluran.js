let handler = async (m, { conn, text }) => {

  if (!text) return m.reply(`Masukkan Teks Yang Akan Di Kirim Ke Saluran`);

  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let date = new Date().toLocaleDateString('id-ID', options); 
  let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/i97i4t.jpg');
  let p = `➤ Message: ${text}\n➤ Form @${m.sender.split("@")[0]}\n➤ Date: ${date}`;

  try {
    await conn.reply(
      idsaluran,
      p, 
      fkontak, 
      {
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterName: wm,
            newsletterJid: idsaluran
          },
          externalAdReply: {
            title: "M E S S A G E  I N F O",
            body: `</> ${m.name} </>`,
            thumbnailUrl: pp,
            sourceUrl: saluran,
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
      }
    );
    m.reply("Pesan berhasil dikirim ke saluran!");
  } catch (err) {
    m.reply("Terjadi kesalahan saat mengirim pesan.");
    console.error(err);
  }
}

handler.help = handler.command = ['sendsaluran'];
handler.tags = ['owner'];
handler.owner = true;
module.exports = handler;