const os = require('os');
const speed = require('performance-now');
const { spawn, exec, execSync } = require('child_process');

var handler = async (m, { conn }) => {
  let timestamp = speed();
  let latensi = speed() - timestamp;
  exec('neofetch --stdout', (error, stdout, stderr, json) => {
    let child = stdout.toString('utf-8');
    let ssd = child.replace(/Memory:/, "Ram:");
    m.reply(` *Kecepatan* : ${latensi.toFixed(4)} _ms_\n *Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem / 1024 / 1024)}MB\n *OS:* ${os.version()}\n *Platform:* ${os.platform()}\n *Hostname:* ${os.hostname()}`);
  });
};

handler.command = handler.help = ['os'];
handler.tags = ['main'];
handler.register = true;
handler.limit = true;

module.exports = handler;