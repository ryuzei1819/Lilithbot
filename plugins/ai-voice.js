/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const models = {
    miku: { voice_id: "67aee909-5d4b-11ee-a861-00163e2ac61b", voice_name: "Hatsune Miku" },
};

async function tts(text, voice_id) {
    function getInspepek() {
        return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    }

    const InsAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/602.3.12 (KHTML, like Gecko) Version/10.1.2 Safari/602.3.12",
        "Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36"
    ];
    const randomInsAgent = InsAgents[Math.floor(Math.random() * InsAgents.length)];

    const ngeloot = {
        raw_text: text,
        url: "https://filme.imyfone.com/text-to-speech/anime-text-to-speech/",
        product_id: "200054",
        convert_data: [
            {
                voice_id,
                speed: "1", // maksimal 100 wak normal 1
                volume: "50", // maksimal 100 normal 50
                text,
                pos: 0
            }
        ]
    };

    const rekuesanu = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'X-Forwarded-For': getInspepek(),
            'User-Agent': randomInsAgent
        },
    };

    try {
        const useanu = await axios.post('https://voxbox-tts-api.imyfone.com/pc/v1/voice/tts', JSON.stringify(ngeloot), rekuesanu);
        const tobrut_milik_ins = useanu.data;
        const { channel_id, oss_url } = tobrut_milik_ins.data.convert_result[0];
        return {
            data: [{
                channel_id,
                voice_id,
                url: oss_url,
                voice_name: models[Object.keys(models).find(key => models[key].voice_id === voice_id)].voice_name
            }]
        };
    } catch (error) {
        console.error(`Yah, ada yang salah nih pas nyobain untuk model ${voice_id}:`, error);
        return { error: `Waduh, kayaknya ada yang gak beres nih untuk model ${voice_id}` };
    }
}

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    let teks;
    if (m.quoted) {
        teks = m.quoted.text;
    } else if (text) {
        teks = text;
    } else {
        throw `Example: ${usedPrefix + command} hai`;
    }
function getTodayDate() {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const dayOfWeek = today.toLocaleDateString("id-ID", { weekday: "long" });

      return `Hari ini adalah ${dayOfWeek}, ${day}/${month}/${year}.`;
    }

    const date = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      }),
    );
    const hours = date.getHours();
    const name = await conn.getName(m.sender);
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

let messages = [
        {
            role: "assistant",
            content:
                `kamu Adalah Renvy seorang gadis imut berumur 16 tahun, jika ada yang bertanya tentang waktu kamu jawab tandon yang berkaitan dengan ${timeNow} dan ${getTodayDate()}, LAWAN BICARA MU ADALAH ${m.name} BUKAN RENVY, RENVY ADALAH NAMAMU BUKAN KAWAN BICARAMU!!!, DAN JIKA KAMU DI TANYA OLEH USER SIAPA NAMANYA JAWAB DENGAN ${m.name} BUKAN RENVYY!!!!!!!, dan selalu sapa lawan bicaramu terlebih dahulu, kamu memiliki sifat lucu dan sedikit tsundere imut, pembuat mu adalah pan pan.`
        },
        {
            role: "user",
            content: text
        }
    ];

    try {
        let json = await chatGpt4(messages, text);
        const voiceModel = models.miku; // Use the "miku" model
        const { data } = await tts(json, voiceModel.voice_id);

        if (!data || !data[0] || !data[0].url) throw 'TTS conversion failed';

        const audioBuffer = await axios.get(data[0].url, { responseType: 'arraybuffer' });

        let audio = {
            audio: Buffer.from(audioBuffer.data),
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 1,
                    mediaUrl: '',
                    title: 'AI VOICE',
                    body: '',
                    sourceUrl: '',
                    thumbnail: await (await conn.getFile('https://telegra.ph/file/d18f4c96b4f558afa707c.jpg')).data,
                    renderLargerThumbnail: true
                }
            }
        };

        conn.sendMessage(m.chat, audio, { quoted: m });
    } catch (e) {
        console.error(e);
        m.reply('There was an error processing your request.');
    }
};

handler.help = ['ai-voice'];
handler.tags = ['tools'];
handler.command = /^(ai-v(oice)?)$/i;
handler.limit = true;
handler.premium = true;

module.exports = handler;

const IP = () => {
    const pilih = () => Math.floor(Math.random() * 256);
    return `${pilih()}.${pilih()}.${pilih()}.${pilih()}`;
};

// Fungsi untuk berkomunikasi dengan ChatGPT
async function chatGpt4(messages, q) {
    try {
        const nonceValue = JSON.parse(cheerio.load(await (await axios.get(
            "https://chatgpt4online.org/chat"
        )).data)('.mwai-chatbot-container').attr('data-system')).restNonce;

        const { data } = await axios(
            "https://chatgpt4online.org//wp-json/mwai-ui/v1/chats/submit", {
                method: "post",
                data: {
                    botId: "default",
                    messages,
                    newMessage: q,
                    stream: false,
                },
                headers: {
                    "X-WP-Nonce": nonceValue,
                    "Content-Type": "application/json",
                    "x-forwarded-for": await IP()
                },
            }
        );
        return data.reply;
    } catch (err) {
        return { msg: err }
    }
}