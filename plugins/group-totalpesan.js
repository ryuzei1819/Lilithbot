/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn }) => {
    const messages = conn.chats[m.chat].messages;
if (!db.data.chats[m.chat].total) {
db.data.chats[m.chat].total = {}
}
    const participantCounts = db.data.chats[m.chat].total
    Object.values(messages).forEach(({ key }) =>
        participantCounts[key.participant] = (participantCounts[key.participant] || 0) + 1
    );
    const sortedData = Object.entries(participantCounts)
        .sort((a, b) => b[1] - a[1]);
    const totalM = sortedData.reduce((acc, [, total]) => acc + total, 0);
    const totalPeople = sortedData.length;
    const pesan = sortedData
        .map(([jid, total], index) => `*${index + 1}.* ${jid.replace(/(\d+)@.+/, '@$1')}: *${total}* pesan`)
        .join('\n');
    await m.reply(
        `📊 *Total Pesan Terakhir*: *${totalM}* pesan dari *${totalPeople}* orang\n\n${pesan}`,
        null,
        {
            contextInfo: {
                mentionedJid: sortedData.map(([jid]) => jid)
            }
        }
    );
}
handler.help = ['totalpesan'];
handler.tags = ['group'];
handler.command = /^(total(pesan|chat)?)$/i;
handler.group = true;

module.exports = handler;