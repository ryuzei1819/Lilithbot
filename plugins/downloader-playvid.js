const axios = require('axios');
const fs = require('fs');
const search = require('yt-search');

class Ytdl {
  constructor() {
    this.baseUrl = "https://id-y2mate.com";
  }

  async search(url) {
    const requestData = new URLSearchParams({
      k_query: url,
      k_page: "home",
      hl: "",
      q_auto: "0",
    });

    const requestHeaders = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Accept: "*/*",
      "X-Requested-With": "XMLHttpRequest",
    };

    try {
      const response = await axios.post(
        `${this.baseUrl}/mates/analyzeV2/ajax`,
        requestData,
        {
          headers: requestHeaders,
        }
      );

      const responseData = response.data;
      return responseData;
    } catch (error) {
      if (error.response) {
        console.error(`HTTP error! status: ${error.response.status}`);
      } else {
        console.error("Axios error: ", error.message);
      }
    }
  }

  async convert(videoId, key) {
    const requestData = new URLSearchParams({
      vid: videoId,
      k: key,
    });

    const requestHeaders = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Accept: "*/*",
      "X-Requested-With": "XMLHttpRequest",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",
      Referer: `${this.baseUrl}/youtube/${videoId}`,
    };

    try {
      const response = await axios.post(
        `${this.baseUrl}/mates/convertV2/index`,
        requestData,
        {
          headers: requestHeaders,
        }
      );

      const responseData = response.data;
      return responseData;
    } catch (error) {
      if (error.response) {
        console.error(`HTTP error! status: ${error.response.status}`);
      } else {
        console.error("Axios error: ", error.message);
      }
    }
  }

  async play(url) {
    const { links, vid, title } = await this.search(url);
    let video = {};
    let audio = {};

    for (const key in links.mp4) {
      const input = links.mp4[key];
      const { fquality, dlink } = await this.convert(vid, input.k);
      video[fquality] = {
        size: input.q,
        url: dlink,
      };
    }

    for (const key in links.mp3) {
      const input = links.mp3[key];
      const { fquality, dlink } = await this.convert(vid, input.k);
      audio[fquality] = {
        size: input.q,
        url: dlink,
      };
    }

    return {
      title,
      video,
      audio,
    };
  }
}

let sentVideos = [];

let handler = async (m, { conn, text, command }) => {
  if (!text) return conn.reply(m.chat, `🚩 Input query`, m);

  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });

  const ytdl = new Ytdl();

  try {
    let searchResults = await search(text);
    let videoUrl = `https://www.youtube.com/watch?v=${searchResults.videos[0].videoId}`;
    let videoInfo = await ytdl.play(videoUrl);
    let title = videoInfo.title.replace(/[^\w\s]/gi, '');

    if (sentVideos.includes(title)) {
      let newVideoInfo = null;
      for (let i = 0; i < searchResults.videos.length; i++) {
        if (!sentVideos.includes(searchResults.videos[i].title)) {
          newVideoInfo = await ytdl.play(`https://www.youtube.com/watch?v=${searchResults.videos[i].videoId}`);
          break;
        }
      }
      if (!newVideoInfo) {
        return m.reply('No more videos available with the same title');
      }
      videoInfo = newVideoInfo;
      title = videoInfo.title.replace(/[^\w\s]/gi, '');
    }

    let downloadUrl = videoInfo.video['480'].url;
    let videoDetails = searchResults.videos.find(video => video.videoId === searchResults.videos[0].videoId);

    let caption = `乂  *P L A Y  - V I D E O*\n\n`;
    caption += `*Title:* ${videoDetails.title}\n`;
    caption += `*Thumbnail:* ${videoDetails.thumbnail}\n`;
    caption += `*Views:* ${videoDetails.views}\n`;
    caption += `*URL:* ${videoUrl}\n`;
    caption += `*Duration:* ${videoDetails.timestamp}\n`;

    let videoBuffer = await axios.get(downloadUrl, { responseType: 'arraybuffer' });

    fs.writeFileSync(`${title}.mp4`, videoBuffer.data);

    let buffer = fs.readFileSync(`${title}.mp4`);
    conn.sendFile(m.chat, buffer, `${title}.mp4`, caption, m);
    fs.unlinkSync(`${title}.mp4`);

    sentVideos.push(title);
    if (sentVideos.length > 10) {
      sentVideos.shift();
    }
  } catch (e) {
    console.log(e);
    m.reply(`An error occurred while downloading the video: ${e.message}`);
  }
};

handler.help = ['playvidio'].map(v => v + '<teks>');
handler.tags = ['downloader'];
handler.limit = true;
handler.command = /^playvidio|playvid|playvideo$/i;

module.exports = handler;