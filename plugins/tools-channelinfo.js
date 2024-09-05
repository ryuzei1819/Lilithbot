/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require("axios");
const cheerio = require("cheerio");

// Function to fetch WhatsApp channel details by URL
async function getWhatsAppChannelDetails(url) {
    return new Promise(async (resolve, reject) => {
        try {
            // Fetch the HTML of the WhatsApp channel page
            const { data } = await axios.get(url);
            // Load the HTML into cheerio
            const $ = cheerio.load(data);

            // Initialize an empty result object
            const result = {};

            // Extract the channel image URL
            result.image = $('._9vx6').attr('src');

            // Extract the channel name
            result.name = $('._9vd5._9t2_').text().trim();

            // Extract the number of followers
            const followerText = $('._9vd5._9scy').text().trim().split('|')[1].trim();
            result.follower = parseInt(followerText.replace('pengikut', '').trim(), 10);

            // Extract the channel description
            result.description = $('._9vd5._9scb').text().trim();

            // Add the channel URL to the result
            result.url = url;

            // Resolve the promise with the result object
            resolve(result);
        } catch (error) {
            // Reject the promise if an error occurs
            reject(error);
        }
    });
}

// Handler function
let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        conn.reply(m.chat, 'Please provide a WhatsApp channel URL.', m);
        return;
    }

    const url = args[0];
    const regex = /^https:\/\/(www\.)?whatsapp\.com\/channel\/[a-zA-Z0-9]+$/;

    if (!regex.test(url)) {
        conn.reply(m.chat, 'That is not a valid WhatsApp channel URL.', m);
        return;
    }

    try {
        const channelDetails = await getWhatsAppChannelDetails(url);
        const response = `
            *Channel Name:* ${channelDetails.name}
            *Followers:* ${channelDetails.follower}
            *Description:* ${channelDetails.description}
            *Channel URL:* ${channelDetails.url}
        `;

        // Send the image along with the description
        await conn.sendFile(m.chat, channelDetails.image, 'image.jpg', response, m);
    } catch (error) {
        console.error('Error fetching channel details:', error);
        conn.reply(m.chat, 'An error occurred while fetching the channel details.', m);
    }
};

handler.help = handler.command = ['channelinfo','ci'];
handler.tags = ['main'];

module.exports = handler;