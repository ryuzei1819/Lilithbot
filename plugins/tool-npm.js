const fetch = require('node-fetch');

// Fungsi untuk melakukan pencarian paket npm
async function npmSearch(query) {
    try {
        const res = await fetch(
            "https://www.npmjs.com/search/suggestions?" +
                new URLSearchParams({
                    q: query,
                })
        ).then((res) => res.json());

        if (!res.length) throw "Packages Not Found";

        return res;
    } catch (error) {
        throw error;
    }
}

// Handler untuk perintah npmsearch
let handler = async (m, { text }) => {
    try {
        if (!text) throw 'Input Query';

        const results = await npmSearch(text);

        // Mengambil semua hasil dan memformatnya
        let txt = "";
        results.forEach((pkg) => {
            txt += `*${pkg.name}* (v${pkg.version})\n`;

            // Memeriksa apakah ada informasi kata kunci tersedia
            if (pkg.keywords && Array.isArray(pkg.keywords)) {
                txt += `_Keywords:_ ${pkg.keywords.join(', ')}\n`;
            } else {
                txt += `_Keywords:_ None\n`;
            }

            // Memeriksa apakah ada informasi penulis tersedia
            if (pkg.author && pkg.author.name) {
                txt += `_Author:_ ${pkg.author.name}\n`;
            } else {
                txt += `_Author:_ Unknown\n`;
            }

            txt += `_Description:_ ${pkg.description}\n`;
            txt += `_NPM Link:_ ${pkg.links.npm}\n\n`;
        });

        m.reply(txt);
    } catch (error) {
        m.reply(`Error: ${error}`);
    }
};

handler.help = ['npmsearch <query>'];
handler.tags = ['tools'];
handler.command = /^npm(js|search)?$/i;

module.exports = handler;