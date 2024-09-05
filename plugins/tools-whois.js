/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) return m.reply(`Masukkan Domain/Sub Domain!\n\n*Contoh:* clayzaaubert.my.id`)
	try {
	const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}
		let options = {
			method: 'GET',
			headers: {
				'Authorization': `Token=6c7bd1ce704d92c90e2f78d42641a9ee0cbcef198a6ad62a3dd06deb22af6fd3`
			}
		}
		let response = await fetch(`https://whoisjson.com/api/v1/whois?domain=${text.replace(/^https?:\/\//, '')}`, options)
		let data = await response.json()
		m.reply(JSON.stringify(data, null, 2))
	} catch (e) {
		console.log(e)
	}
}

handler.menuinfo = ['whois *<url>*']
handler.tags = ['info']
handler.command = /^(whois?)$/i

handler.premium = true
handler.limit = true
module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
doc = pickRandom(["6c7bd1ce704d92c90e2f78d42641a9ee0cbcef198a6ad62a3dd06deb22af6fd3",
"e60df1f533023bffc332178b8831d62760300d5e612893e3b4fae0a4d7176101"])