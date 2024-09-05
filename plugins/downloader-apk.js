const { download } = require('aptoide-scraper');
const axios = require('axios');

const handler = async (m, { conn, usedPrefix: prefix, command, text }) => {
    try {
        if (!text) throw `*[❗] Please provide the APK name you want to download.*`;
        await conn.reply(m.chat, '⏳ Please wait...', m);
        
        let data;
        const maxRetries = 3;
        let attempt = 0;

        while (attempt < maxRetries) {
            try {
                console.log(`Attempting to download APK: ${text} (Attempt ${attempt + 1}/${maxRetries})`);
                data = await download(text);
                console.log(`Download successful: ${data.name}`);
                break; // If download is successful, exit the loop
            } catch (e) {
                console.error(`Error during download attempt ${attempt + 1}: ${e.message || e}`);
                attempt++;
                if (attempt === maxRetries) throw e;
                console.log(`Retrying download... (${attempt}/${maxRetries})`);
            }
        }

        // Format the caption with additional details
        const caption = `📦 *Name:* ${data.name}\n📅 *Last Updated:* ${data.lastup}\n📦 *Package:* ${data.package}\n📏 *Size:* ${data.size}`;

        await conn.sendMessage(
            m.chat,
            {
                document: { url: data.dllink },
                mimetype: 'application/vnd.android.package-archive',
                fileName: `${data.name}.apk`,
                caption: caption, 
            },
            { quoted: m }
        );
    } catch (e) {
        console.error(e); // Log error to console
        let errorMessage = `*[❗] An error occurred. Please ensure you provided a valid APK name.*`;
        
        if (axios.isCancel(e)) {
            errorMessage = '*[❗] Request was aborted. Please try again.*';
        } else if (e.response) {
            errorMessage = `*[❗] Server responded with status ${e.response.status}: ${e.response.statusText}*`;
        } else if (e.request) {
            errorMessage = '*[❗] No response received from server. Please check your network connection.*';
        } else {
            errorMessage = `*[❗] Error: ${e.message || e}*`;
        }

        await conn.reply(m.chat, errorMessage, m);
    }
};

handler.command = /^apk$/i;

module.exports = handler;