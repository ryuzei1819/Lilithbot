let handler = async (m, { conn }) => {
  if (!m.quoted) throw '❗ Balas pesan dari saluran admin channel nya';

  try {
    let quotedMessage = await m.getQuotedObj();
    let id = quotedMessage.msg.contextInfo.forwardedNewsletterMessageInfo;

    if (id) {
      await m.reply(`📛 Nᴀᴍᴇ: ${id.newsletterName}\n🆔 ɪᴅ: ${id.newsletterJid}`);
    } else {
      throw '❗ Informasi saluran tidak ditemukan.';
    }
  } catch (e) {
    throw '❗ Harus balas pesan dari saluran ya..';
  }
}

handler.help = ['cekidsaluran'];
handler.command = ['cis', 'cekidsaluran'];
handler.tags = ['tools'];

module.exports = handler;