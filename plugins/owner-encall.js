const JavaScriptObfuscator = require("javascript-obfuscator");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

const peler = path.resolve('/home/container');
const namepeler = 'folder_backup.zip';

let handler = async (m, { args, conn }) => {
  try {
    const usage = "\n*Example:*\n.enc folderName";
    if (args.length < 1) return m.reply(usage);

    const folderName = args[0];
    const folderPath = path.resolve('/home/container', folderName);

    if (folderName === 'node_modules') {
      return m.reply("Folder 'node_modules' tidak boleh dienkripsi.");
    }

    if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) {
      const directories = fs.readdirSync('/home/container').filter(file => 
        fs.statSync(path.join('/home/container', file)).isDirectory()
      );
      const dirList = directories.length ? directories.join(', ') : 'Tidak ada folder yang tersedia.';
      return m.reply(`Folder ${folderName} tidak ditemukan. Daftar folder yang ada: ${dirList}`);
    }

    await backupFolder(folderPath);

    await sendBackupToPhone(m, conn);

    const files = fs.readdirSync(folderPath);
    let successCount = 0;
    let errorCount = 0;
    let errorMessages = [];

    for (const file of files) {
      const filePath = path.join(folderPath, file);

      if (fs.statSync(filePath).isFile() && filePath.endsWith('.js')) {
        try {
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const encryptedContent = await Encrypt(fileContent);
          fs.writeFileSync(filePath, encryptedContent, 'utf8');
          successCount++;
        } catch (e) {
          errorMessages.push(`File ${file} dalam folder ${folderName} tidak bisa di-encrypt: ${e.message}`);
          errorCount++;
        }
      }
    }

    if (successCount === files.length) {
      return m.reply(`Semua file dalam folder ${folderName} telah di-encrypt.`);
    } else {
      return m.reply(
        `${successCount} file berhasil di-encrypt.\n` +
        `${errorCount} file tidak bisa di-encrypt.\n` +
        (errorMessages.length ? `\n${errorMessages.join('\n')}` : '')
      );
    }
  } catch (e) {
    await m.reply(e.message);
  }
};

async function backupFolder(folderPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(path.join(peler, namepeler));
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`${archive.pointer()} total bytes`);
      console.log('Backup folder telah dibuat.');
      resolve();
    });

    archive.on('error', (err) => {
      reject(`Gagal membuat backup: ${err.message}`);
    });

    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.finalize();
  });
}

async function sendBackupToPhone(m, conn) {
  const filePath = path.join(peler, namepeler);
  const displayName = namepeler; 
  const caption = 'Backup folder telah dibuat dan dikirim.';
  
  try {
    await conn.sendMessage(
      nomorown + "@s.whatsapp.net",
      {
        document: { url: filePath },
        mimetype: 'application/zip',
        fileName: displayName,
        caption: caption
      },
      { quoted: m }
    );
  } catch (err) {
    console.error('Gagal mengirim file backup:', err);
  } finally {
    fs.unlinkSync(filePath);
  }
}

handler.help = ["encall"];
handler.tags = ["owner"];
handler.command = /^(encall)$/i;
handler.rowner = true;
module.exports = handler;

async function Encrypt(query) {
  const obfuscationResult = JavaScriptObfuscator.obfuscate(query, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    stringArrayShuffle: true,
    splitStrings: true,
    stringArrayThreshold: 1,
    sourceMap: false,
    sourceMapMode: "separate",
  });

  return obfuscationResult.getObfuscatedCode();
}