/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fs = require('fs')
const path = require('path')

let handler = async (m, { conn, text }) => {
  if (!text) throw '*Example*: .gf server.js'

  let fileName = text.trim().toLowerCase()
  let filePath = path.join(__dirname, '..', fileName + '.js')
  if (!fs.existsSync(filePath)) {
    throw `The file ${fileName}.js does not exist!`
  }

  let fileContent = fs.readFileSync(filePath, 'utf-8')
  conn.reply(m.chat, fileContent, m)
}

handler.help = ['gf / *filename*']
handler.tags = ['owner']
handler.owner = true
handler.command = /^gf|getfile$/i

module.exports = handler