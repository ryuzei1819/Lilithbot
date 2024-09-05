if (process.argv.includes('--server')) require('./server')
let cluster = require('cluster')
let path = require('path')
let fs = require('fs')
let package = require('./package.json')
const Readline = require('readline')
const yargs = require('yargs/yargs')
const rl = Readline.createInterface(process.stdin, process.stdout)
const chalk = require('chalk')
const os = require('os')

function formatUptime(seconds) {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  return `${d}d ${h}h ${m}m ${s}s`;
}

function displaySystemInfo() {
  const platform = os.platform();
  const release = os.release();
  const arch = os.arch();
  const hostname = os.hostname();
  const totalMemory = (os.totalmem() / 1024 / 1024).toFixed(2);
  const freeMemory = (os.freemem() / 1024 / 1024).toFixed(2);
  const uptime = formatUptime(os.uptime());
  const cpus = os.cpus();
  const networkInterfaces = os.networkInterfaces();
  const loadAvg = os.loadavg();
  const homeDir = os.homedir();
  const tmpDir = os.tmpdir();

  let systemInfo = `
🖥️ ${chalk.cyan.bold('Operating System Information')} 🖥️
${chalk.magenta.bold('===============================================')
}
🌐 Platform: ${chalk.yellow(platform)}
📦 Release: ${chalk.yellow(release)}
🏗️ Architecture: ${chalk.yellow(arch)}
🔒 Hostname: ${chalk.yellow(hostname)}
💾 Total Memory: ${chalk.yellow(totalMemory)} MB
🆓 Free Memory: ${chalk.yellow(freeMemory)} MB
⏳ Uptime: ${chalk.yellow(uptime)}
🏠 Home Directory: ${chalk.yellow(homeDir)}
📂 Temporary Directory: ${chalk.yellow(tmpDir)}

📊 ${chalk.cyan.bold('Load Averages (1, 5, 15 min)')} 📊
${chalk.yellow(loadAvg.map(avg => avg.toFixed(2)).join(', '))}

💻 ${chalk.cyan.bold('CPU Information')} 💻
`;

  cpus.forEach((cpu, index) => {
    systemInfo += `⚙️ CPU ${index + 1}: ${chalk.yellow(cpu.model)} - ${chalk.yellow(cpu.speed)} MHz\n`;
  });

  systemInfo += `\n🌐 ${chalk.cyan.bold('Network Interfaces')} 🌐\n`;
  Object.keys(networkInterfaces).forEach((interface) => {
    networkInterfaces[interface].forEach((details) => {
      systemInfo += `${chalk.green(interface)} (${details.family}) - ${chalk.yellow(details.address)}\n`;
    });
  });

  return systemInfo;
}

var isRunning = false
/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
  if (isRunning) return
  isRunning = true
  let args = [path.join(__dirname, file), ...process.argv.slice(2)]
  cluster.setupMaster({
    exec: path.join(__dirname, file),
    args: args.slice(1),
  })
  let p = cluster.fork()
  p.on('message', data => {
    console.log('Received', data)
    switch (data) {
      case 'reset':
        p.process.kill()
        isRunning = false
        start.apply(this, arguments)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })
  p.on('exit', (_, code) => {
    isRunning = false
    console.error('Bot Mokad Dengan Kode:', code)
    if (code === 0) return
    fs.watchFile(args[0], () => {
      fs.unwatchFile(args[0])
      start(file)
    })
  })
  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
  if (!opts['test'])
    if (!rl.listenerCount()) rl.on('line', line => {
      p.emit('message', line.trim())
    })
  // console.log(p)
}

setTimeout(() => {
console.log(chalk.hex('#8A2BE2')(` ########::'########:'##::: ##:'##::::'##:'##:::'##:`));
console.log(chalk.hex('#0000FF')(` ##.... ##: ##.....:: ###:: ##: ##:::: ##:. ##:'##::`));
console.log(chalk.hex('#FF0000')(` ##:::: ##: ##::::::: ####: ##: ##:::: ##::. ####:::`));
console.log(chalk.hex('#8A2BE2')(` ########:: ######::: ## ## ##: ##:::: ##:::. ##:::`));
console.log(chalk.hex('#0000FF')(` ##.. ##::: ##...:::: ##. ####:. ##:: ##::::: ##:::`));
console.log(chalk.hex('#FF0000')(` ##::. ##:: ##::::::: ##:. ###::. ## ##:::::: ##:::`));
console.log(chalk.hex('#8A2BE2')(` ##:::. ##: ########: ##::. ##:::. ###::::::: ##:::`));
console.log(chalk.hex('#0000FF')(`..:::::..::........::..::::..:::::...::::::::..:::::`));
  console.log(displaySystemInfo());
  console.log(chalk.magenta.bold("==============================================="));
}, 3000);

start('pan.js')