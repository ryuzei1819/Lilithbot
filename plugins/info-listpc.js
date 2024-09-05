let handler = async (m, { conn }) => {
  // Get all chat IDs and filter for private chats
  let chats = await conn.getChats();
  let privateChats = chats.filter(chat => chat.id.endsWith(".net"));

  // Build the message text
  let message = `*📁 Daftar Chat Pribadi*\nTotal: ${privateChats.length} Chat\n\n`;

  for (let chat of privateChats) {
    let chatId = chat.id;
    let name = chat.name || "Nama Tidak Diketahui";
    let userId = chatId.split("@")[0];
    message += `*• Nama:* ${name}\n*• User:* @${userId}\n*• Chat:* https://wa.me/${userId}\n\n`;
  }

  // Send the message
  conn.reply(m.chat, message, m);
};

// Define handler properties
handler.help = ["listpc"];
handler.tags = ["info"];
handler.command = ["listpc"];

module.exports = handler;