/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  if (!args || args.length < 1) {
    return m.reply(Func.example(usedPrefix, command, "Miss Circle"));
  }

  let response = args.join(" ").split(" --");
  let query = response[0];
  let count = parseInt(response[1]);
  if (!count) {
    try {
      var tio = await pinterest(query);
      let url = tio[Math.floor(Math.random() * tio.length)].images_url;
      conn.sendButton(
        m.chat,
        [["Next", `${usedPrefix + command} ${text}`]],
        m,
        {
          body: `*• Media:* ${url}\n*• Result Search from:* ${query}`,
          url: url,
        },
      );
    } catch (error) {
      console.log(error);
      conn.reply(m.chat, "Terjadi kesalahan saat menjalankan perintah.", m);
    }
  } else {
    if (count > 10) return m.reply("*Maximun 10 request*");

    try {
      let tio = await pinterest(query);
      let images = tio.map(item => item.images_url);

      for (let i = 0; i < count; i++) {
        let image = images[Math.floor(Math.random() * images.length)];
        setTimeout(() => {
          conn.sendButton(m.chat, [["View Menu", ".menu"]], m, {
            body: `*• Media*: *(${i + 1}/${count})*\n*•Media url:* ${images[0 + count]}\n*• Result Search from:* ${query}`,
            url: image,
          });
        }, i * 5000);
      }
    } catch (error) {
      console.log(error);
      m.reply(eror);
    }
  }
};

handler.help = ["pinterest"].map((a) => a + " *[query -- count]*");
handler.tags = ["tools", "internet"];
handler.command = ["pinterest", "pin"];

module.exports = handler;


async function pinterest(query) {
  const baseUrl = 'https://www.pinterest.com/resource/BaseSearchResource/get/';
  const queryParams = {
    source_url: '/search/pins/?q=' + encodeURIComponent(query),
    data: JSON.stringify({
      options: {
        isPrefetch: false,
        query,
        scope: 'pins',
        no_fetch_context_on_resource: false
      },
      context: {}
    }),
    _: Date.now()
  };
  const url = new URL(baseUrl);
  Object.entries(queryParams).forEach(entry => url.searchParams.set(entry[0], entry[1]));

  try {
    const json = await (await fetch(url.toString())).json();
    const results = json.resource_response?.data?.results?? [];
    return results.map(item => ({
      pin: 'https://www.pinterest.com/pin/' + item.id?? '',
      link: item.link?? '',
      created_at: (new Date(item.created_at)).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })?? '',
      id: item.id?? '',
      images_url: item.images?.['736x']?.url?? '',
      grid_title: item.grid_title?? ''
    }));
  } catch (error) {
    console.error('Error mengambil data:', error);
    return [];
  }
}