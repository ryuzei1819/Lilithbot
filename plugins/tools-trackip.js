const fetch = require('node-fetch');

const formatIPInfo = (info) => {
  return `
*IP Information*
• IP: ${info.ip || 'N/A'}
• Success: ${info.success || 'N/A'}
• Type: ${info.type || 'N/A'}
• Continent: ${info.continent || 'N/A'}
• Continent Code: ${info.continent_code || 'N/A'}
• Country: ${info.country || 'N/A'}
• Country Code: ${info.country_code || 'N/A'}
• Region: ${info.region || 'N/A'}
• Region Code: ${info.region_code || 'N/A'}
• City: ${info.city || 'N/A'}
• Latitude: ${info.latitude || 'N/A'}
• Longitude: ${info.longitude || 'N/A'}
• Is EU: ${info.is_eu ? 'Yes' : 'No'}
• Postal: ${info.postal || 'N/A'}
• Calling Code: ${info.calling_code || 'N/A'}
• Capital: ${info.capital || 'N/A'}
• Borders: ${info.borders || 'N/A'}
• Flag:
  - Image: ${info.flag?.img || 'N/A'}
  - Emoji: ${info.flag?.emoji || 'N/A'}
  - Emoji Unicode: ${info.flag?.emoji_unicode || 'N/A'}
• Connection:
  - ASN: ${info.connection?.asn || 'N/A'}
  - Organization: ${info.connection?.org || 'N/A'}
  - ISP: ${info.connection?.isp || 'N/A'}
  - Domain: ${info.connection?.domain || 'N/A'}
• Timezone:
  - ID: ${info.timezone?.id || 'N/A'}
  - Abbreviation: ${info.timezone?.abbr || 'N/A'}
  - Is DST: ${info.timezone?.is_dst ? 'Yes' : 'No'}
  - Offset: ${info.timezone?.offset || 'N/A'}
  - UTC: ${info.timezone?.utc || 'N/A'}
  - Current Time: ${info.timezone?.current_time || 'N/A'}
`;
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*Example:* ${usedPrefix + command} 112.90.150.204`;
  try {
    let res = await fetch(`https://ipwho.is/${text}`).then(result => result.json());

    if (!res.success) throw new Error(`IP ${text} not found!`);

    await conn.sendMessage(m.chat, { location: { degreesLatitude: res.latitude, degreesLongitude: res.longitude } }, { ephemeralExpiration: 604800 });
    await delay(2000);
    conn.reply(m.chat, formatIPInfo(res), m);  
  } catch (e) { 
    conn.reply(m.chat, e.message || `Error: Unable to retrieve data for IP ${text}`, m);
  }
}

handler.command = handler.help = ['trackip', 'cekip'];
handler.tags = ['tools'];
handler.premium = false;

module.exports = handler;