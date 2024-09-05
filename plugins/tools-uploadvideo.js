/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');
const FormData = require('form-data');
const fileType = require('file-type');

const handler = async (m, { conn }) => {
  try {
    let videoBuffer;
    
    if (m.quoted && m.quoted.mimetype && m.quoted.mimetype.startsWith('video/')) {
      videoBuffer = await m.quoted.download();
    } else if (m.mimetype && m.mimetype.startsWith('video/')) {
      videoBuffer = await m.download();
    } else {
      m.reply('Reply atau kirim video yang mau diupload');
    }
    
    const uploadUrl = await uploadVideo(videoBuffer);
    await m.reply(`Video berhasil diupload: ${uploadUrl}`);
  } catch (error) {
    await console.log(`Terjadi kesalahan: ${error.message}`);
  }
};

handler.tags = ['tools'];
handler.help = ['uploadvideo (reply video)'];
handler.command = ['uploadvid', 'uploadvideo'];
module.exports = handler;

async function uploadVideo(videoBuffer) {
  const { ext, mime } = await fileType.fromBuffer(videoBuffer);
  if (!mime.startsWith('video/')) {
    throw new Error('File yang diunggah bukan video');
  }

  let form = new FormData();
  form.append('file', videoBuffer, { filename: 'tmp.' + ext, contentType: mime });
  
  let res = await fetch('https://videy.co/api/upload', {
    method: 'POST',
    body: form,
  });
  
  if (!res.ok) {
    throw new Error('Gagal mengupload video');
  }
  
  let vid = await res.json();
  if (!vid || !vid.id) {
    throw new Error('Error dalam mendapatkan ID video');
  }
  
  return `https://cdn.videy.co/${vid.id}.mp4`;
}