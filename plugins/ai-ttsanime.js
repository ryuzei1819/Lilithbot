/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const ciff = async (m, { conn, text, args }) => {
    if (!text) return m.reply('Masukin teksnya');
    
    await m.reply('Tunggu sebentar, sedang diproses...');
    const [inputText, voiceName] = text.split('|').map(item => item.trim());

    let selectedVoice;
    if (voiceName) {
        selectedVoice = models[voiceName.toLowerCase()];
    } else {
        const voices = Object.keys(models);
        const randomVoice = voices[Math.floor(Math.random() * voices.length)];
        selectedVoice = models[randomVoice];
    }

    if (!selectedVoice) {
        return m.reply(`Voice "${voiceName}" tidak ditemukan. Silakan pilih dari: ${Object.keys(models).join(', ')}`);
    }

    const anu = await tts(inputText, selectedVoice.voice_id);

    if (anu.error) {
        return m.reply(`Terjadi kesalahan: ${anu.error}`);
    }

    const result = anu.data.find(result => result.voice_id === selectedVoice.voice_id);
    
    if (result && result.url) {
        await conn.sendFile(m.chat, result.url, 'tts.mp3', null, m, false, {
            mimetype: 'audio/mp4',
            ptt: true
        });
    } else {
        m.reply(`Gagal mendapatkan hasil untuk voice "${selectedVoice.voice_name}"`);
    }
};
ciff.command = ['ttsanime'];
ciff.help = ['ttsanime <text>'];
ciff.tags = ['anime', 'ai'];

module.exports = ciff;

const models = {
    nahida: { voice_id: "67ae0979-5d4b-11ee-a861-00163e2ac61b", voice_name: "Nahida (Exclusive)" },
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