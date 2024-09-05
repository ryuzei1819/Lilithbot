const fetch = require("node-fetch");
const axios = require("axios");
const cheerio = require("cheerio");

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text;
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else throw "Masukkan query lirik";

    try {
        let result = await p(text);
        if (result.status) {
            let reply = `*乂 Judul 乂*
${result.title || "Tidak diketahui"}

*乂 Album 乂*
${result.album || "Tidak diketahui"}

*乂 Lirik 乂*
${result.lyrics || "Tidak diketahui"}

`;

            await m.reply(reply);
        } else {
            throw "Lirik tidak ditemukan";
        }
    } catch (e) {
        throw e;
    }
}

handler.help = ["lirik"].map(v => v + " <judul>");
handler.tags = ["internet"];
handler.command = /^l(irik(musik)?|yrics?)$/i;
module.exports = handler;

async function p(text) {
    try {
        const {
            data
        } = await axios.get("https://songsear.ch/q/" + encodeURIComponent(text));
        const $ = cheerio.load(data);
        const result = {
            title: $("div.results > div:nth-child(1) > .head > h3 > b").text() + " - " + $("div.results > div:nth-child(1) > .head > h2 > a").text(),
            album: $("div.results > div:nth-child(1) > .head > p").text(),
            number: $("div.results > div:nth-child(1) > .head > a").attr("href").split("/")[4],
            thumb: $("div.results > div:nth-child(1) > .head > a > img").attr("src")
        };

        const {
            data: lyricData
        } = await axios.get(`https://songsear.ch/api/song/${result.number}?text_only=true`);
        const lyrics = lyricData.song.text_html.replace(/<br\/>/g, "\n").replace(/&#x27;/g, "'");

        return {
            status: true,
            title: result.title,
            album: result.album,
            thumb: result.thumb,
            lyrics: lyrics,
            number: result.number
        };
    } catch (e) {
        return { status: false };
    }
}