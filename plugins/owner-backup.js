const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

let handler = async (m, { conn }) => {
  let now = new Date();
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let day = days[now.getDay()];
  let date = now.getDate();
  let month = now.getMonth() + 1; 
  let year = now.getFullYear();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let formattedDate = `${day}, ${date}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  
  let backupAllName = `${namebot}_all.zip`;
  let backupBuyerName = `${namebot}_buyer.zip`;
  let displayBackupAllName = `${namebot} Full Backup.zip`;
  let displayBackupBuyerName = `${namebot} Buyer Backup.zip`;

  // Function to create a backup archive
  async function createBackup(archiveName, displayName, exclusions) {
    return new Promise((resolve, reject) => {
      let output = fs.createWriteStream(archiveName);
      let archive = archiver('zip', {
        zlib: { level: 9 }
      });

      output.on('close', async function () {
        let caption = `_Success Backup Code_\n> Name: ${namebot} V${version} Backup\n> Date: ${formattedDate}`;
        
        try {
          await conn.sendMessage(
            m.chat,
            {
              document: { url: `./${archiveName}` },
              mimetype: 'application/zip',
              fileName: displayName,
              caption: caption
            },
            { quoted: fkontak }
          );
          resolve();
        } catch (err) {
          console.error(`Failed to send ${displayName}:`, err);
          reject(err);
        } finally {
          fs.unlinkSync(archiveName); // Delete file after sending
        }
      });

      archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
          console.warn(err);
        } else {
          reject(err);
        }
      });

      archive.on('error', function (err) {
        reject(err);
      });

      archive.pipe(output);
      archive.glob('**/*', {
        cwd: path.resolve(__dirname, '../'),
        ignore: exclusions
      });
      archive.finalize();
    });
  }

  // Create the Backup All file
  try {
    await createBackup(backupAllName, displayBackupAllName, [
      'node_modules/**', 
      'tmp/**', 
      '**/flyaudio/**', 
      '**.cache/**', 
      '.npm/**', 
      backupAllName,
      'package-lock.json'
    ]);

    // Create the Backup for Buyer file
    await createBackup(backupBuyerName, displayBackupBuyerName, [
      'node_modules/**', 
      'tmp/**', 
      '**/flyaudio/**', 
      '**.cache/**', 
      '.npm/**', 
      backupAllName,
      'package-lock.json',
      'plugins/owner-addaccip.js',
      'plugins/owner-delaccip.js',
      'plugins/owner-listaccip.js'
    ]);
  } catch (err) {
    console.error('Failed to create backups:', err);
  }
};

handler.help = ['backupme', 'backup'];
handler.tags = ['owner'];
handler.command = /^backupme|backup$/i;
handler.rowner = true;

module.exports = handler;