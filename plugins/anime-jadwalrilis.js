/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

const handler = async (m, { conn }) => {
  const url = "https://www.animebatch.id/jadwal-rilis/";

  try {
    const response = await fetch(url);
    const html = await response.text();
    const { document } = new JSDOM(html).window;
    const days = document.querySelectorAll(".tab-dates");
    const schedules = document.querySelectorAll(".result-schedule");

    if (days.length === 0 || schedules.length === 0) {
      return conn.reply(
        m.chat,
        "Tidak ada data jadwal rilis anime saat ini.",
        m,
      );
    }

    let message = "Jadwal Rilis Anime:\n";

    for (let i = 0; i < days.length; i++) {
      const day = days[i].textContent;
      const animeList = schedules[i].querySelectorAll(".animepost");

      if (animeList.length > 0) {
        message += `\n${day}:\n`;
        animeList.forEach((anime, index) => {
          const titleElement = anime.querySelector(".title");
          const title = titleElement.textContent.trim();
          const scoreElement = anime.querySelector(".score");
          const score = scoreElement ? scoreElement.textContent.trim() : "N/A";
          const linkElement = anime.querySelector("a");
          const link = linkElement.getAttribute("href");

          message += `\n${index + 1}. Hari: ${day}\n   Title: ${title}\n   Score: ${score}\n   Link: ${link}\n`;
        });
      }
    }

    conn.reply(m.chat, message, m);
  } catch (error) {
    console.error(error);
    conn.reply(
      m.chat,
      "Terjadi kesalahan saat mengambil data jadwal rilis anime.",
      m,
    );
  }
};

handler.help = ["jadwalrilis"];
handler.tags = ["anime"];
handler.command = /^(jadwalrilis)$/i;

module.exports = handler;