/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const { BingImageCreator } = require("../scrape/bingimg.js");

const handler = async (m, { conn, args, usedPrefix, command }) => {
  let text;
  if (args.length >= 1) {
    text = args.slice(0).join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else {
    throw "*• Example:* .bingimg 1girl";
  }

  await m.reply("Please wait...");
  try {
    const res = new BingImageCreator({
      cookie: `1OpWBgSV_5yNTConSXqr62v0eF6wmYdtItvn1lmd1A-g5f0jsnxenW45kuUfWuX969OCEdw9nR84jGSyTPDXXjGdEyBnCYj7_fx2mYuPksYzl8JvgtL3r5-4H2mB09kT8cEPa4zDc7AjnapyyzrMsG9wAkdBR_5FtbhwSQeLr8--ccB42S5U3jj8rTr3ZAQavt-Ge7wOQ2xkMGgmRPq038duFdZnTzcfWimkSqHN5z-U`,
    });
    const data = await res.createImage(text);

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        try {
          if (!data[i].endsWith(".svg")) {
            await conn.sendFile(
              m.chat,
              data[i],
              "",
              `Image *(${i + 1}/${data.length})*\n\n*Prompt*: ${text}`,
              m,
              false,
              { mentions: [m.sender] },
            );
          }
        } catch (error) {
          console.error(`Error sending file: ${error.message}`);
          await m.reply(`Failed to send image *(${i + 1}/${data.length})*`);
        }
      }
    } else {
      await m.reply("No images found.");
    }
  } catch (error) {
    console.error(`Error in handler: ${error.message}`);
    await m.reply(`${error}\n\n${error.message}`);
  }
};

handler.help = ["bingimg"].map((a) => a + " *[prompt]*");
handler.tags = ["ai"];
handler.command = ["bingimg"];
handler.register = true;

module.exports = handler;