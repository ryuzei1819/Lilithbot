/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {

    if (!text) throw 'nanya apa';

    try {

        await m.reply(wait);
        let prompt = 'Renvy is a beginner WhatsApp bot maker ', name = 'Renvy'
        let {
            output
        } = await v_girl(text, prompt, name);
        await m.reply(output[0]);
    } catch (e) {
        throw eror
    }

}
handler.help = handler.command = ['v_girl']
handler.tags = ['ai']

module.exports = handler;

async function v_girl(text,prompt, name) {
try {
const response = await axios.post('https://boredhumans.com/virtual_girlfriends/virtual_girlfriends_api.php',
      `prompt=${text.replace(/\s+/g, "%2520")}&chat_id=lwle4nyomx5t0w6quo8&init_prompt=${prompt.replace(/\s+/g, "%2520")}&voice_id=XrExE9yKIg1WjnnlVkGX&stability=0.5&similarity_boost=0.75&name=${name.replace(/\s+/g, "%2520")}&useAudio=false&dateLoc=Bookstore`,
      {
        headers: {
          'User-Agent': 'Googlebot-News',
         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    return response.data
    } catch (e) {
    return e
    }
    }