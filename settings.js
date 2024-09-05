const fs = require('fs');
const NeoApi = require("@neoxr/wb");
const Pan = new NeoApi();
const yargs = require('yargs/yargs')
const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

global.owner = ['6281382415830','6281584176167'];
global.nomorown = '6281382415830';
global.nameown = 'Lilith developer';
global.thumb = "https://telegra.ph/file/52ce972ec3f26304cb074.jpg";
global.Thumb = thumb;
global.fsizedoc = "45000000000"; // default 10TB
global.fpagedoc = "19";
global.uthFile = `${opts._[0] || 'Panses'}`// nama session, ubah Panses jadi nama session mu, ga di ubah juga gapapa
global.namedoc = global.wm;
global.audioz = 'https://files.catbox.moe/i0oit1.opus'; // audio buat di menu
global.namebot = 'Lilith asami bot';
global.lolkey = 'pentilkuda'
global.wm = '[ lilith love lilith]';
global.version = '18';
global.packname = "lilith asami By";
global.author = `lilith yamada`;
global.wait = "*[ Loading... ]*";
global.menu = "button";
global.gc = 'https://chat.whatsapp.com/BGmhs1Qein2CRlgAwYcA5Z';
global.saluran = 'https://whatsapp.com/channel/0029Vacej5b2P59memEXMt1H';
global.idsaluran = '120363271604660670@newsletter';
global.eror = "*Fitur Sedang Error*";
global.done = wm;
global.pairingNumber = 6285757657796;
global.multiplier = 1000;
global.max_upload = 70;
global.ram_usage = 2100000000;
global.Func = Pan.Function;
global.Uploader = require("./lib/uploader");
global.Scraper = {
    Api: require("./scrape/api"),
    Gpt: require("./scrape/gpt"),
    Canvas: require("./scrape/canvas"),
    Random: require("./scrape/random"),
    Download: require("./scrape/download"),
    Other: require("./scrape/scraper"),
    Tools: require("./scrape/tools"),
    Ai: require("./scrape/ai"),
};
// Welcome
global.welcome = "Welcome to *@subject* @user\nSemoga betah Dan jangan lupa baca deskripsi\n@desc";
global.bye = "Goodbye @user,\nSemoga tenang di alam sana.";
global.spromote = "@user telah naik jabatan";
global.sdemote = "@user telah turun jabatan🗿";


const chalk = require('chalk');
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright("Update 'config.js'"));
    delete require.cache[file];
    require(file);
});