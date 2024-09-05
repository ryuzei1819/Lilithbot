const fs = require('fs');
const similarity = require('similarity');
const fetch = require('node-fetch');

let handler = async (m, { usedPrefix, command, text }) => {
    let ar = Object.keys(plugins);
    let ar1 = ar.map(v => v.replace('.js', ''));

    if (!text) return m.reply(Func.example(usedPrefix, command, 'ai-openai'));

    let paths = text.split('&').map(v => v.trim());

    let validPaths = paths.filter(p => ar1.includes(p));
    let invalidPaths = paths.filter(p => !ar1.includes(p));

    if (invalidPaths.length > 0) {
        let allSuggestions = invalidPaths.map(p => {
            let matches = ar1.map(v => ({ name: v, score: similarity(p, v) }));
            matches = matches.filter(({ score }) => score > 0.3); // Adjust threshold as needed
            matches.sort((a, b) => b.score - a.score);
            return matches;
        }).flat();

        if (allSuggestions.length > 0) {
            let groupedSuggestions = allSuggestions.reduce((acc, { name }) => {
                if (!acc.includes(name)) acc.push(name);
                return acc;
            }, []);
            return m.reply(`'${invalidPaths.join(', ')}' not found!\n\nDid you mean:\n${groupedSuggestions.map(v => ' ' + v).join('\n')}`);
        } else {
            return m.reply(`'${invalidPaths.join(', ')}' not found!`);
        }
    }

    for (let path of validPaths) {
        try {
            let fileContent = fs.readFileSync('./plugins/' + path + '.js', 'utf-8');
            let carbonImage = await CarbonifyV1(fileContent).catch(() => CarbonifyV2(fileContent));
            await conn.sendMessage(m.chat, { image: carbonImage, caption: `Here is the plugin content for '${path}'` });
        } catch (err) {
            await m.reply(`Error reading file for '${path}': ${err.message}`);
        }
    }
};

handler.help = ['viewplug'].map(v => v + ' *<path>*');
handler.tags = ['owner'];
handler.command = ['viewplug'];
handler.owner = true;

module.exports = handler;

async function CarbonifyV1(input) {
  let Blobs = await fetch("https://carbonara.solopov.dev/api/cook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: input,
    }),
  }).then((response) => response.blob());
  let arrayBuffer = await Blobs.arrayBuffer();
  let buffer = Buffer.from(arrayBuffer);
  return buffer;
}

async function CarbonifyV2(input) {
  let Blobs = await fetch("https://carbon-api.vercel.app/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: input,
    }),
  }).then((response) => response.blob());
  let arrayBuffer = await Blobs.arrayBuffer();
  let buffer = Buffer.from(arrayBuffer);
  return buffer;
}