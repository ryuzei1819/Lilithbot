/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');

async function npmstalk(packageName) {
  try {
    let stalk = await axios.get("https://registry.npmjs.org/" + packageName);
    let versions = stalk.data.versions;
    let allver = Object.keys(versions);
    let verLatest = allver[allver.length - 1];
    let verPublish = allver[0];
    let packageLatest = versions[verLatest];
    return {
      name: packageName,
      versionLatest: verLatest,
      versionPublish: verPublish,
      versionUpdate: allver.length,
      latestDependencies: Object.keys(packageLatest.dependencies || {}).length,
      publishDependencies: Object.keys(versions[verPublish].dependencies || {}).length,
      publishTime: stalk.data.time.created,
      latestPublishTime: stalk.data.time[verLatest]
    };
  } catch (error) {
    console.error('Error in npmstalk:', error);
    throw error;
  }
}

const handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, 'Silakan masukkan nama paket npm.', m);
  }

  try {
    const result = await npmstalk(text.trim());
    const response = `
*NPM Package Info for ${result.name}*

📦 *Latest Version*: ${result.versionLatest}
📅 *Published Time*: ${result.latestPublishTime}
🔄 *Total Versions*: ${result.versionUpdate}
🔗 *Dependencies (Latest)*: ${result.latestDependencies}
🔗 *Dependencies (Published)*: ${result.publishDependencies}
🕰️ *First Published Time*: ${result.publishTime}
    `;

    conn.reply(m.chat, response, m);
  } catch (error) {
    conn.reply(m.chat, 'Terjadi kesalahan saat mencari info paket npm.', m);
    console.error('Error in npmstalk handler:', error);
  }
};

handler.help = handler.command = ['npmstalk'];
handler.tags = ["stalk"]

module.exports = handler;