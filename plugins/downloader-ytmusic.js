/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');

async function NganuINs(url_nganu) {
    try {
        const Kebakaran = `https://cdn36.savetube.me/info?url=${encodeURIComponent(url_nganu)}`;
        const ngloot = await axios.get(Kebakaran);
        
        if (!ngloot.data || !ngloot.data.data || !ngloot.data.data.audio_formats) {
            throw new Error('Gagal membuat daftar format audio');
        }
        
        const key = ngloot.data.data.key;
        
        const pecel_lele = `https://cdn34.savetube.me/download/audio/128/${key}`;
        const pencuri_matiae = await axios.get(pecel_lele);
        
        if (!pencuri_matiae.data || !pencuri_matiae.data.data || !pencuri_matiae.data.data.downloadUrl) {
            throw new Error('Gagal membuat daftar URL download');
        }
        
        return pencuri_matiae.data.data.downloadUrl;
    } catch (error) {
        console.error('Kesalahan:', error.message);
        return null;
    }
}

// Contoh penggunaan
async function ytMusicHandler(m, { conn, text, usedPrefix, command }) {
    if (!text) throw `Gunakan format: ${usedPrefix + command} <URL YouTube Music>`;
    
    await m.reply('🎵 Sedang memproses, harap tunggu...');
    let downloadUrl = await NganuINs(text);
    
    if (downloadUrl) {
        await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mp4' }, { quoted: m });
    } else {
        await m.reply('❌ Gagal mengunduh audio. Pastikan URL yang Anda berikan benar.');
    }
}

ytMusicHandler.help = ['ytmusic <url>'];
ytMusicHandler.tags = ['downloader'];
ytMusicHandler.command = /^(ytmusic)$/i;

module.exports = ytMusicHandler;