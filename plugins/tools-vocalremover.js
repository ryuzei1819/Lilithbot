/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const axios = require('axios');
const FormData = require('form-data');

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        if (!/audio/.test(mime)) throw `Reply to an audio message with the command: *${usedPrefix + command}*`;
        
        let audio = await q.download();
        if (!audio) throw 'Cannot download audio!';
        
        let z = await vocalRemover(audio);
        conn.sendFile(m.chat, z.instrumental_path, null, null, instrumen);
        conn.sendFile(m.chat, z.vocal_path, null, null, vocal);
        
    } catch (e) {
        console.error(e);
        m.reply(e.message || 'An error occurred during the audio processing.');
    }
};
handler.tags = ["tools","ai"]
handler.command = /^vocalremover/i;
module.exports = handler;

async function vocalRemover(audioBuffer) {
     const api = axios.create({ baseURL: 'https://aivocalremover.com' })
     const getKey = async () => (await api.get('/')).data.match(/key:"(\w+)/)[1]
	const form = new FormData()
	const fileName = Math.random().toString(36) + '.mpeg'
	form.append('fileName', audioBuffer, fileName)
	
	const [key, fileUpload] = await Promise.all([
		await getKey(),
		await api.post('/api/v2/FileUpload', form, { headers: form.getHeaders() }).catch(e => e.response)
	])
	if (fileUpload.status !== 200) throw fileUpload.data || fileUpload.statusText
	
	const processFile = await api.post('/api/v2/ProcessFile', new URLSearchParams({
		file_name: fileUpload.data.file_name,
		action: 'watermark_video', key, web: 'web' 
	})).catch(e => e.response)
	
	return processFile.data
} 

global.instrumen = {
      key: {
        remoteJid: "0@s.whatsapp.net",
        participant: "0@s.whatsapp.net",
        id: "",
      },
      message: {
        conversation: `*audio instrumen*`,
      },
    };
    
global.vocal = {
      key: {
        remoteJid: "0@s.whatsapp.net",
        participant: "0@s.whatsapp.net",
        id: "",
      },
      message: {
        conversation: `*audio vocal*`,
      },
    };