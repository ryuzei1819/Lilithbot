const axios = require('axios');

async function getYugiohCard(cardName) {
    try {
        const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(cardName)}`);
        if (response.data.data) {
            const card = response.data.data[0];
            return {
                name: card.name,
                type: card.type,
                desc: card.desc,
                atk: card.atk,
                def: card.def,
                level: card.level,
                race: card.race,
                attribute: card.attribute,
                image: card.card_images[0].image_url
            };
        } else {
            throw new Error('Card not found');
        }
    } catch (error) {
        console.error('Error fetching card information:', error);
        return null;
    }
}

let handler = async (m, { conn, text }) => {
    if (!text) {
        await conn.sendMessage(m.chat, { text: 'Please provide the name of the Yu-Gi-Oh card.' }, { quoted: m });
        return;
    }

    const cardName = text.trim();
    const card = await getYugiohCard(cardName);

    if (card) {
        const message = `
Name: ${card.name}
Type: ${card.type}
Description: ${card.desc}
ATK: ${card.atk}
DEF: ${card.def}
Level: ${card.level}
Race: ${card.race}
Attribute: ${card.attribute}
        `;

        await conn.sendMessage(m.chat, { image: { url: card.image }, caption: message }, { quoted: m });
    } else {
        await conn.sendMessage(m.chat, { text: 'Card not found or an error occurred.' }, { quoted: m });
    }
};

handler.help = ['yugiohcard'];
handler.command = ['yugiohcard'];
handler.tags = ['internet'];

module.exports = handler;