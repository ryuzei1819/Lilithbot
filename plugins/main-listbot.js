let moment = require('moment-timezone');
let PhoneNum = require('awesome-phonenumber'); // Ensure this module is installed

let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

let handler = async (m, { conn, args, usedPrefix }) => {
  const groups = Object.keys(conn.chats)
    .filter((key) => key.endsWith("@g.us"))
    .map((key) => conn.chats[key]);

  // Helper to get group name
  const getGroupName = (remoteJid) => {
    const group = groups.find(group => group.id === remoteJid);
    return group ? group.subject : 'Not a Group';
  };

  // Helper to get all bot information
  const getBotInfo = async (participant) => {
    let num = participant.replace(/\D/g, '') + '@s.whatsapp.net';
    let img = await conn.profilePictureUrl(num, 'image').catch(_ => './src/avatar_contact.png');
    let bio = await conn.fetchStatus(num).catch(_ => { });
    let name = await conn.getName(num);
    let business = await conn.getBusinessProfile(num);
    let format = PhoneNum(`+${num.split('@')[0]}`);
    let country = regionNames.of(format.getRegionCode('international'));

    return {
      img,
      bio,
      name,
      business,
      country,
      num
    };
  };

  const filteredMessages = Object.values(conn.chats)
    .flatMap(({ messages }) => Object.entries(messages || {}))
    .filter(([messageId]) => messageId.startsWith("BAE5"))
    .reduce(
      (obj, [messageId, message]) => ({ ...obj, [messageId]: message }),
      {},
    );

  const seenParticipants = new Set();
  const filteredParticipants = Object.values(filteredMessages).reduce(
    (arr, { pushName, key: { participant, remoteJid } }) => {
      if (!seenParticipants.has(participant)) {
        seenParticipants.add(participant);
        arr.push({
          pushName,
          participant: participant || remoteJid || "",
          remoteJid,
          groupName: getGroupName(remoteJid),
        });
      }
      return arr;
    },
    [],
  );

  // Create summary of bot activities
  const botInfoPromises = filteredParticipants.map(({ participant }) => getBotInfo(participant));
  const botInfos = await Promise.all(botInfoPromises);

  const formattedText = filteredParticipants
    .map(
      ({ pushName, participant, remoteJid, groupName }, index) => {
        const botInfo = botInfos[index];
        return `*${index + 1}.* ${pushName}\n*Tag:* @${participant.split("@")[0]}\n*ID:* ${remoteJid.split("@")[0]}\n*Bot ${index + 1} Info:*\n*Name:* ${botInfo.name || 'Unknown'}\n*Country:* ${botInfo.country.toUpperCase()}\n*Format Number:* ${botInfo.num}\n*Status:* ${botInfo.bio?.status || '-'}\n*Business:* ${botInfo.business ? `\n  *Website:* ${botInfo.business.website || '-'}\n  *Email:* ${botInfo.business.email || '-'}\n  *Category:* ${botInfo.business.category}\n  *Address:* ${botInfo.business.address || '-'}\n` : 'Standard WhatsApp Account'}`
      }
    )
    .join("\n\n");

  await conn.sendMessage(
    m.chat,
    {
      text: `*Participants Information:*\n${formattedText}`,
      mentions: filteredParticipants.map(({ participant }) => participant),
    },
    { quoted: m },
  );
};

handler.help = ["listbot"];
handler.tags = ["main"];
handler.command = /^listbot$/i;
module.exports = handler;