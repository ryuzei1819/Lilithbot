const fs = require('fs');
const similarity = require('similarity');

let handler = async (m, { usedPrefix, command, text }) => {
    try {
        const plugins = fs.readdirSync('./plugins').filter(file => file.endsWith('.js'));
        const pluginNames = plugins.map(file => file.replace('.js', ''));

        if (!text) return m.reply(Func.example(usedPrefix, command, 'fun-menfess'));

        let paths = text.split('&').map(v => v.trim());

        let validPaths = paths.filter(p => pluginNames.includes(p));
        let invalidPaths = paths.filter(p => !pluginNames.includes(p));

        if (invalidPaths.length > 0) {
            let allSuggestions = invalidPaths.map(p => {
                let matches = pluginNames.map(v => ({ name: v, score: similarity(p, v) }));
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

        let successMessages = [];
        let errorMessages = [];

        for (let path of validPaths) {
            let filePath = `plugins/${path}.js`;

            if (!fs.existsSync(filePath)) {
                errorMessages.push(`🚩 ${path}.js plugin file not found`);
                continue;
            }

            try {
                fs.unlinkSync(filePath);
                successMessages.push(`🚩 ${path}.js plugin file successfully deleted`);
            } catch (e) {
                errorMessages.push(`Error deleting ${path}.js: ${e.message}`);
            }
        }

        if (successMessages.length > 0) {
            await m.reply(successMessages.join('\n'));
        }
        if (errorMessages.length > 0) {
            await m.reply(errorMessages.join('\n'));
        }
    } catch (e) {
        console.log(e);
        return m.reply(Func.jsonFormat(e));
    }
};

handler.help = ['df *<path>*'];
handler.tags = ['owner'];
handler.command = /^(df|delplug|deleteplugins)$/i;
handler.owner = true;

module.exports = handler;