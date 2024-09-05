const { sizeFormatter } = require("human-readable");

let formatSize = sizeFormatter({
  std: "JEDEC",
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

let handler = async (m, { conn, args }) => {
  if (!args[0]) throw "Input URL";
  try {
    let res = await GDriveDl(args[0]);
    if (!res) throw "Failed to retrieve data";

    await m.reply(JSON.stringify(res, null, 2));

    conn.sendMessage(
      m.chat,
      {
        document: { url: res.downloadUrl },
        fileName: res.fileName,
        mimetype: res.mimetype,
      },
      { quoted: m }
    );
  } catch (err) {
    m.reply(`Error: ${err.message}`);
  }
};

handler.help = ["gdrive"].map((v) => v + " <url>");
handler.tags = ["downloader"];
handler.command = /^gd(rive(d(own(load(er)?)?|l))?|dle|l)$/i;

module.exports = handler;

async function GDriveDl(url) {
  if (!url.match(/drive\.google/i)) throw new Error("Invalid URL");

  let id = (url.match(/\/?id=([^&]+)/i) || url.match(/\/d\/(.*?)\//))?.[1];
  if (!id) throw new Error("ID Not Found");

  try {
    let res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
        "X-Drive-First-Party": "DriveWebUi",
        "X-JSON-Requested": "true",
      },
    });

    let jsonText = await res.text();
    let { fileName, sizeBytes, downloadUrl } = JSON.parse(jsonText.slice(4));
    
    if (!downloadUrl) throw new Error("Download link limit reached");

    let data = await fetch(downloadUrl);
    if (data.status !== 200) throw new Error(data.statusText);

    return {
      downloadUrl,
      fileName,
      fileSize: formatSize(sizeBytes),
      mimetype: data.headers.get("content-type"),
    };
  } catch (error) {
    throw new Error(`Failed to download: ${error.message}`);
  }
}