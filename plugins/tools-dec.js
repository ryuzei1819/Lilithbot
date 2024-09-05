/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 


const { Deobfuscator } = require("deobfuscator");

let handler = async (m, { args, command, usedPrefix }) => {
  const usage = `*• Example:*
${usedPrefix}${command} (Input text or reply text to enc code)`;

  let text;

  if (args.length >= 1) {
    text = args.join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else {
    return m.reply(usage);
  }

  try {
      const message = await Decrypt(text);
      await m.reply(message);
    
  } catch (error) {
    const errorMessage = `Terjadi kesalahan: ${error.message}`;
    await m.reply(errorMessage);
  }
}
handler.command = /^(deobfus(cate)?|dec)$/i;
module.exports = handler;

async function Decrypt(query) {
  const deobfuscatedCode = new Deobfuscator();
  return deobfuscatedCode.deobfuscateSource(query);
}