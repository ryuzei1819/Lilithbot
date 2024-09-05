/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');
const cheerio = require("cheerio");

// Fungsi untuk melakukan stalk pengguna TikTok
async function tiktokStalk(user) {
  try {
    const url = await fetch(`https://www.tiktok.com/@${user}`, {
      headers: {
        'User-Agent': 'PostmanRuntime/7.32.2'
      }
    });
    const html = await url.text();
    const $ = cheerio.load(html);
    const data = $('#__UNIVERSAL_DATA_FOR_REHYDRATION__').text();
    const result = JSON.parse(data);

    if (result['__DEFAULT_SCOPE__']['webapp.user-detail'].statusCode !== 0) {
      const ress = {
        status: 'error',
        message: 'User not found!',
      };
      return ress;
    }

    const userInfo = result['__DEFAULT_SCOPE__']['webapp.user-detail']['userInfo'];
    const userStats = userInfo['stats'];
    const userVideos = userInfo['itemList'];

    const response = {
      username: userInfo['user']['uniqueId'],
      nickname: userInfo['user']['nickname'],
      bio: userInfo['user']['signature'],
      verified: userInfo['user']['verified'],
      followingCount: userStats['followingCount'],
      followerCount: userStats['followerCount'],
      heartCount: userStats['heartCount'],
      videoCount: userStats['videoCount'],
      diggCount: userStats['diggCount'],
      videos: userVideos.map(video => ({
        id: video['id'],
        desc: video['desc'],
        createTime: video['createTime'],
        playCount: video['stats']['playCount'],
        commentCount: video['stats']['commentCount'],
        shareCount: video['stats']['shareCount'],
        likeCount: video['stats']['diggCount'],
      }))
    };

    return response;

  } catch (err) {
    console.log(err);
    return String(err);
  }
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return m.reply(`Penggunaan: ${usedPrefix}${command} <username>`);
  }

  const username = args[0];
  const userData = await tiktokStalk(username);

  if (userData.status === 'error') {
    return m.reply(userData.message);
  } else {
    let message = `
Username: ${userData.username}
Nickname: ${userData.nickname}
Bio: ${userData.bio}
Verified: ${userData.verified}
Following: ${userData.followingCount}
Followers: ${userData.followerCount}
Hearts: ${userData.heartCount}
Videos: ${userData.videoCount}
Digg: ${userData.diggCount}
    `;
    
    userData.videos.forEach(video => {
      message += `
      
Video ID: ${video.id}
Description: ${video.desc}
Created Time: ${new Date(video.createTime * 1000).toLocaleString()}
Play Count: ${video.playCount}
Comment Count: ${video.commentCount}
Share Count: ${video.shareCount}
Like Count: ${video.likeCount}
      `;
    });

    return m.reply(message);
  }
};

handler.help = handler.command = ["ttstalk","tiktokstalk"];
handler.tags = ["stalk"];
module.exports = handler;