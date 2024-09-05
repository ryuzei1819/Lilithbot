/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn, args, command, isBotAdmin }) => {
    let q = m.quoted || m || null;

    if (!args && !q) {
        return m.reply("🚩 Error: Please provide text to edit or reply to a message.");
    }

    let text = args?.length >= 1 ? args.join(' ') : m.text || q?.text || null;

    if (!text) {
        return m.reply("🚩 Error: Edited text cannot be empty.");
    }

    let editKey =
        q?.vM?.key ||
        q?.key ||
        (m.getQuotedObj()?.key) ||
        (q?.fakeObj?.key) ||
        m.key;

    let editMessage = {
        text: text,
        edit: editKey
    };

    if (
        checkTrue(conn.sendMessage(m.chat, editMessage)) ||
        checkTrue(
            conn.sendMessage(m.chat, {
                text: text,
                edit: {
                    remoteJid: (editKey?.remoteJid || m.chat),
                    fromMe: false,
                    id: (editKey?.id || q?.id || m.key.id),
                    participant: (q?.sender || editKey?.remoteJid || m.key.remoteJid)
                }
            })
        ) ||
        checkTrue(
            conn.relayMessage(m.chat, {
                protocolMessage: {
                    key: editKey,
                    type: 14,
                    editedMessage: {
                        conversation: text
                    }
                }
            }, { messageId: (editKey?.id || q?.id || m.key.id) })
        )
    ) {
        return m.reply("🚩 Error in editing the message");
    }
};

handler.help = ["edit <reply>"];
handler.tags = ["main"];
handler.command = ["edit"];
handler.premium = false;

module.exports = handler;

function checkTrue(input) {
    return input === false;
}