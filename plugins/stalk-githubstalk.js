/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');

// Fungsi untuk melakukan stalk pengguna GitHub
async function githubstalk(user) {
  return new Promise((resolve, reject) => {
    axios.get('https://api.github.com/users/' + user)
      .then(({ data }) => {
        let hasil = {
          username: data.login,
          nickname: data.name,
          bio: data.bio,
          id: data.id,
          nodeId: data.node_id,
          profile_pic: data.avatar_url,
          url: data.html_url,
          type: data.type,
          admin: data.site_admin,
          company: data.company,
          blog: data.blog,
          location: data.location,
          email: data.email,
          public_repo: data.public_repos,
          public_gists: data.public_gists,
          followers: data.followers,
          following: data.following,
          created_at: data.created_at,
          updated_at: data.updated_at
        };
        resolve(hasil);
      })
      .catch(err => {
        reject(err);
      });
  });
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return m.reply(`Penggunaan: ${usedPrefix}${command} <username>`);
  }

  const username = args[0];
  try {
    const userData = await githubstalk(username);

    let message = `
Username: ${userData.username}
Nickname: ${userData.nickname || 'N/A'}
Bio: ${userData.bio || 'N/A'}
ID: ${userData.id}
Node ID: ${userData.nodeId}
Profile Picture: ${userData.profile_pic}
URL: ${userData.url}
Type: ${userData.type}
Admin: ${userData.admin}
Company: ${userData.company || 'N/A'}
Blog: ${userData.blog || 'N/A'}
Location: ${userData.location || 'N/A'}
Email: ${userData.email || 'N/A'}
Public Repos: ${userData.public_repo}
Public Gists: ${userData.public_gists}
Followers: ${userData.followers}
Following: ${userData.following}
Created At: ${new Date(userData.created_at).toLocaleString()}
Updated At: ${new Date(userData.updated_at).toLocaleString()}
    `;

    return m.reply(message);
  } catch (err) {
    console.error(err);
    return m.reply(`Error: ${err.message}`);
  }
};

handler.help = handler.command = ["ghstalk"];
handler.tags = ["stalk"];
module.exports = handler;