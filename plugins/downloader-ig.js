let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `📢 *Example:* ${usedPrefix + command} *[Instagram URL]*`;
  if (!Func.isUrl(text)) 
    throw `📢 *Example:* ${usedPrefix + command} *[Instagram URL]*`;
  m.reply("⏳ Processing...");
  try {
    let media = await (await saveig(text)).medias;
    if (media.length === 0) throw "🚫 *No media found!*";
    let url = media.map((a) => a.url);
    for (let i of url) {
      m.reply("📥 *Instagram Downloader:*", i);
    }
  } catch (e) {
    throw "⚠️ *An error occurred!*";
  }
};

handler.help = ["ig", "igdl"].map((a) => a + " *[Instagram URL]*");
handler.tags = ["downloader"];
handler.command = ["ig", "igdl"];

module.exports = handler;

async function saveig(q) {
  try {
    const response = await axios.post(
      "https://saveig.app/api/ajaxSearch",
      new URLSearchParams({
        q,
        t: "media",
        lang: "id",
      }),
    );
    const html = response.data.data;
    const $ = cheerio.load(html);
    const medias = $("ul.download-box li")
      .map((index, element) => {
        const $thumb = $(element).find(".download-items__thumb img");
        const $btn = $(element).find(".download-items__btn a");
        const $options = $(element).find(".photo-option select option");
        const type = $btn.attr("onclick")?.includes("click_download_video")
          ? "video"
          : "image";
        return {
          type,
          thumb: $thumb.attr("src") || "",
          url: $btn.attr("href")?.replace("&dl=1", "") || "",
          quality: $options.filter(":selected").text() || "",
          options: $options
            .map((i, opt) => ({
              type,
              url: $(opt).val() || "",
              quality: $(opt).text() || "",
            }))
            .get(),
        };
      })
      .get();
    const result = {
      medias: medias,
    };
    return result;
  } catch (error) {
    console.error("Error fetching Instagram media:", error);
    return {
      error: "Failed to fetch media",
    };
  }
}