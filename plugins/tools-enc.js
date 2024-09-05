const JavaScriptObfuscator = require("javascript-obfuscator");

let handler = async (m, { args }) => {
  try {
    const usage = "Reply Codenyanya!!!\n\n*Example:*\n.obfuscate yourCode";
    if (!m.quoted) return m.reply(usage);

    // Menggunakan fungsi Encrypt langsung
    const message = await Encrypt(m.quoted.text);

    if (args.length >= 2) {
      const texts = args.slice(1).join(" ");
      const response = await Encrypt(texts);
      return m.reply(response);
    }

    return m.reply(message);
  } catch (e) {
    await m.reply(e.message);
  }
};

handler.help = ["encrypt"];
handler.tags = ["tools"];
handler.command = /^(encrypt|enc)$/i;
handler.limit = true;
module.exports = handler;

async function Encrypt(query) {
  const obfuscationResult = JavaScriptObfuscator.obfuscate(query, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    stringArrayShuffle: true,
    splitStrings: true,
    stringArrayThreshold: 1,
    sourceMap: false,
    sourceMapMode: "separate",
  });

  return obfuscationResult.getObfuscatedCode();
}