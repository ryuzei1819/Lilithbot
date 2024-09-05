const fs = require('fs');

let handler = async (m, { conn }) => {
    try {
        let cmiggc = await conn.groupMetadata(m.chat);
        let participants = cmiggc.participants;
        let groupName = cmiggc.subject;
        let groupOwner = cmiggc.owner ? cmiggc.owner : "Tidak diketahui";
        let groupCreation = new Date(cmiggc.creation * 1000).toLocaleString();
        let groupDesc = cmiggc.desc ? cmiggc.desc : "Tidak ada deskripsi";

        let vcard = '';
        let noPort = 0;

        for (let a of participants) {
            let contactId = a.id.split("@")[0];
            vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:[${noPort++}] +${contactId}\nTEL;type=CELL;type=VOICE;waid=${contactId}:+${contactId}\nEND:VCARD\n`;
        }

        let nmfilect = './contacts.vcf';

        await conn.reply(m.chat, `*Mengimpor ${participants.length} kontak...*`, m);

        fs.writeFileSync(nmfilect, vcard.trim());

        await new Promise(resolve => setTimeout(resolve, 2000));

        let caption = `*GROUP:* ${groupName}\n*OWNER:* ${groupOwner}\n*CREATED ON:* ${groupCreation}\n*MEMBERS:* ${participants.length}\n*DESCRIPTION:* ${groupDesc}`;
        await conn.sendMessage(m.chat, {
            document: fs.readFileSync(nmfilect),
            mimetype: 'text/vcard',
            fileName: 'Contact.vcf',
            caption: caption
        }, { ephemeralExpiration: 86400, quoted: m });

        fs.unlinkSync(nmfilect);
    } catch (e) {
        console.error(e);
    }
};

handler.help = ['savekontak'];
handler.command = ['savekontak','savekon'];
handler.tags = ['store'];

module.exports = handler;