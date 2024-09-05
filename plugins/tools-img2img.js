/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let fetch = require("node-fetch");
let axios = require('axios');

async function img2img(image, prompt) {
  const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * Weeem Fxndy
   * @feneeduit
   * Hapus weem keluar paku dari pantat :v
   */
  
  try {
    const {
      data
    } = await axios.get(`https://porno.sytes.net/ai/img2img_create?image=${encodeURIComponent(image)}&prompt=${encodeURIComponent(prompt)}`)
    
    const id = data.result
    
    //klo kode ny ribet/kepanjangan pendekin aj bg
    
    let status = false
    let result
    let counter
    
    do {
      const {
        data: anuan
      } = await axios.get(`https://porno.sytes.net/ai/img2img_check?id=`+id)
      
      if(anuan.result.message === "fendi pengen berak"){
        result = anuan.result.img_url
        status = "success"
      }
      
      if(anuan.result.message === "Fail!"){
        status = "fail"
      }
      
      if(counter > 50){
        status = "fail"
      }
      
      await sleep(3000) 
    } while(!status)
    
    return {
      status: status.includes("success"),
      ...(
        status == "success" ? {
          result
        } : {
          message: "Failed!"
        }
      )
    }
  } catch(e) {
    return {
      status: false,
      message: e.message
    }
  }
}

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
      ? conn.user.jid
      : m.sender;
  let name = await conn.getName(who);
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) throw `Please send/reply to an image with the command.`;
  
  m.reply('Processing image, please wait...');
  
  let media = await q.download();
  let url = await Uploader.catbox(media);
  let prompt = text || 'Generated Image';
  
  try {
    let response = await img2img(url, prompt);
    if (response.status) {
      await conn.sendFile(m.chat, response.result, 'result.jpg', 'Here is your generated image', m);
    } else {
      m.reply(response.message);
    }
  } catch (e) {
    m.reply(`Error: ${e.message}`);
  }
};

handler.help = ["img2img"].map((a) => a + " *[reply/send media]*");
handler.tags = ["tools","ai"];
handler.command = ["img2img"];
handler.limit = true;

module.exports = handler;