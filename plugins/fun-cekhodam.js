/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');

async function pickRandom() {
  const animals = ["sungut lele", "Tikus", "Kadal", "Kuda Nil", "Bunglon", "Siput", "Koala", "Kodok", "Monyet", "Anjing", "Harimau", "Kuda", "Komodo", "Gajah", "Cicak", "Ular", "Kura-kura", "Lele", "Singa", "Zebra", "Bebek", "Ayam", "Buaya", "Gorila", "Naga", "Ikan", "Ubu-ubur", "Cacing", "Semut", "Udang", "Musang", "Kecoak", "Kupu-kupu", "Laba-laba"];
  const behaviours = ["Jawa", "Depresi", "Mekanik", "Metal", "Insom", "Skizo", "Klepto", "Bunting", "Birahi", "Sigma", "Raksasa", "Berkaki Seribu", "Skizo", "Sad boy", "Mewing", "Gyatt", "Yapper", "Skizo", "Ambis", "Dribble", "Jawa", "Ngesot", "Sunda", "Kalimantan", "Kutub", "Sumatera", "Yapper"];
  const things = ["Speaker JBL", "Toa Masjid", "Lemari 2 Pintu", "Kulkas", "Taplak Meja", "Pecel Lele", "Charger Iphone", "TWS", "Kalkulator", "Sendal Jepit", "Undur-undur Maju", "Bagas Dribble", "Sapu Lidi", "Gagang Pintu", "Tutup Toples", "Rice Cooker", "Gerobak Ketoprak", "Ban Motor", "Bakwan Jagung", "Rice Cooker"];

  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  const randomBehaviour = behaviours[Math.floor(Math.random() * behaviours.length)];
  const randomThing = things[Math.floor(Math.random() * things.length)];
  const randomTest = Math.random() > 0.5;

  return randomTest ? `${randomAnimal} ${randomBehaviour}` : randomThing;
}


let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Usage: ${usedPrefix + command} <name>`;
    
    let result = await pickRandom();
    m.reply(`Nama: ${text}\nKhodam: ${result}`);
};

handler.command = ['cekkhodam', 'cekhodam'];
handler.help = ['cekkhodam <name>'];
handler.tags = ['fun'];
handler.limit = true;

module.exports = handler;