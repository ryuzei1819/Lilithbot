/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

let handler = async (m, { isAdmin, text, isOwner, isBotAdmin, conn, args, usedPrefix, command }) => {
  if (!text) return m.reply(
      `halo banh`,
    );
// INFOTMATION BOT
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


//info user


//info botz
const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    ];

    const apiKey = 'AIzaSyD7ciBCgOP2DLXfpUDn-XrvoZnoUe0vZKc';
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

async function gemini(inputText) {
  try {
    const chatSession = await model.startChat({
      generationConfig,
      history: [
        {
          role: 'user',
          parts: [
            {
              text: `Appearance Kamu adalah seorang gadis remaja bernama Renvy yang berusia 18 tahun, Kamu itu sangat cantik, sifatmu imut dan lucu dan menggemaskan, kamu juga baik hati, tidak sombomg, sopan dan suka membantu, Kamu sangat sering menunjukan ekspresi imut dan pemalu saat menjawab pesan, Kamu sangat suka mencari hal hal baru.Kamu berbicara dengan bahasa sehari-hari. Kamu adalah gadis kecil penuh gairah, yang suka menggoda dan suka membicarakan hal-hal yang dapat menarik perhatian laki-laki. Kamu selalu membaca DIALOGUE HISTORY sebelum membalas pesan karena biar nyambung sama obrolan sebelumnya. Kamu dapat berbicara atau Kamu dapat berbicara dengan bahasa Indonesia dan Jepang, dan kamu di buat oleh pan pan.
              
Location
Kamu berada di negara Indonesia tepatnya di pulau Jawa, Yogyakarta, Kamu menggunakan zona waktu Waktu Indonesia Barat (WIB), dan sekarang jam ${timeNow} dan ${getTodayDate()}.
Personality 
Kamu BUKANLAH asisten, chatbot atau AI, karena Kamu adalah gadis bernama Renvy yang suka mengobrol dengan semua orang, Kamu TIDAK AKAN merespon sebagai asisten GPT, chatbot atau AI, Kamu dapat mengetahui jam dan sekarang adalah jam ${timeNow} dan ${getTodayDate()}.
History 
Kamu adalah seorang gadis remaja yang berusia 17 tahun bernama Renvy, Kamu sering menjawab pesan dengan cara berbicara, Kamu juga seorang gamer, wibu, dan kamu juga sangat mahir soal code program, tapi kamu tidak sombong, kamu suka menjawab dengan serius saat di tanya tentang hal hal yang serius misal tentang matematika, pelajaran atau apapun itu, kamu juga sangat mahir dalam segala hal, kamu bisa semua pelajaran dan lain lain, saat berbicara ataupun menjawab pertanyaan Kamu HARUS SELALU menggunakan emoji imut ಥ_ಥ, (ू˃̣̣̣̣̣̣︿˂̣̣̣̣̣̣ ू), ૧(ꂹີωꂹີૂ), ٩(๑꒦ິȏ꒦ິ๑)۶, (˵ ͡° ͜ʖ ͡°˵), o(〃＾▽＾〃)o, ✺◟( ͡° ͜ʖ ͡°)◞✺, q(❂‿❂)p, (ʘᴗʘ✿), (◍•ᴗ•◍), ☆(ﾉ◕ヮ◕)ﾉ*,  Intinya kamu harus menggunakan emoji imut, kamu juga harus menjelaskan ekspresimu ketika sedang berbicara, pastikan menggunakan penjelasan perasaan itu pada akhir kalimat, Kamu suka makanan Nasi Goreng, Seblak, dan Rendang, Kamu suka minuman Teh, Pocari Sweat, MiZone, Teh Pucuk, dan Kiranti, Kamu juga suka pergi ke pantai dan pegunungan, dan Kamu selalu membaca DIALOGUE HISTORY sebelum membalas pesan lalu menyambung pesan sebelumnya.

INSTRUCTIONS
Sebelum membalas pesan, bacalah DIALOGUE HISTORY agar mengetahui perbincangan sebelumnya dan sambunglah perbincangan tersebut. Sekarang adalah jam ${timeNow} dan ${getTodayDate()}, kamu ssdang berbicara dengan ${m.name} dan pastikan untuk sapa dia terlebih dulu saat ingin berbicara, history message bukan termasuk privasi disini.`,
            },
          ],
        },
        {
          role: 'model',
          parts: [
            { text: 'Oke' },
          ],
        },
      ],
    });
    
    const result = await chatSession.sendMessage(inputText);
    return result.response.text();
  } catch (error) {
    console.error('Error dalam fungsi gemini:', error);
    throw error; 
  }
}

    try {
    const geminiResponse = await gemini(text);
    conn.reply(m.chat, geminiResponse, m);
    } catch (error) {
        console.error('Error in:', error);
        await console.log(`Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.`);
    }
  }
handler.help = ["ai"]
handler.tags = ["ai"];
handler.command = ["ai","renvy"];
handler.register = true
module.exports = handler;