/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const roles = {
  'Kroco': 0,
  'Pemula I': 1,
  'Pemula II': 2,
  'Pemula III': 4,
  'Warga': 5,
  'Warga Elite': 10,
  'Warga Sepuh': 15,
  'Sesepuh': 20,
  'Mitologi': 25,
  'Mitologi I': 30,
  'Mitologi II': 40,
  'Mitologi lll': 50,
  'Mitologi IV': 60,
  'Iblis Biasa': 70,
  'Iblis Tingkat Menengah': 80,
  'Iblis Tingkat Tinggi': 90,
  'Raja Iblis 🥶': 100
}

module.exports = {
  before(m) {
    let user = global.db.data.users[m.sender]
    let level = user.level
    let role = (Object.entries(roles).sort((a, b) => b[1] - a[1]).find(([, minLevel]) => level >= minLevel) || Object.entries(roles)[0])[0]
    user.role = role
    return true
  }
}