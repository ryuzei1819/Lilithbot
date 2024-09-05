let baileys = require("@whiskeysockets/baileys");
let {
  useMultiFileAuthState,
  DisconnectReason,
  makeInMemoryStore,
  jidNormalizedUser,
  makeCacheableSignalKeyStore,
  PHONENUMBER_MCC,
} = baileys;
let { Boom } = require("@hapi/boom");
let NodeCache = require("node-cache");
let Pino = require("pino");
let simple = require("../lib/simple");
let fs = require("fs");

if (global.ak instanceof Array) console.log();
else global.ak = [];

let handler = async (m, { conn, args, usedPrefix, command, isOwner, text }) => {
  let user = global.db.data.users[m.sender];
  let authFile = "plugins/jadibot/" + m.sender.split("@")[0];
  let isInit = !fs.existsSync(authFile);

  // Check if there is an existing session
  if (!isInit) {
    return m.reply(`*[ System Notice ]* You already have an active bot session. Please type '${usedPrefix}stop jadibot' to stop the existing session before creating a new one.`);
  }

  let { state, saveCreds } = await useMultiFileAuthState(authFile);
  let msgRetryCounterCache = new NodeCache();

  const config = {
    logger: Pino({ level: "fatal" }).child({ level: "fatal" }),
    printQRInTerminal: false,
    mobile: false,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(
        state.keys,
        Pino({ level: "fatal" }).child({ level: "fatal" }),
      ),
    },
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    msgRetryCounterCache,
    defaultQueryTimeoutMs: undefined,
  };
  conn = simple.makeWASocket(config);
  let ev = conn.ev;

  if (!conn.authState.creds.registered) {
    setTimeout(async () => {
      let phoneNumber = m.sender.split("@")[0];
      let code = await conn.requestPairingCode(phoneNumber);
      let hasilcode = code?.match(/.{1,4}/g)?.join("-") || code;
      let key = await m.reply(
        "*[ System Guide ]* Kamu telah mendapatkan notifikasi dari perangkat tuatan, salin kode dibawah, tekan tombol notifikasi, kemudian tempel kode tersebut maka kamu akan menjadi bot sementara"
      );
      await m.reply(hasilcode);
    }, 3000);
  }

  async function connectionUpdate(update) {
    const { connection, lastDisconnect } = update;
    console.log(update);
    if (connection == "connecting") {
      console.log(connection);
    } else if (connection == "open") {
      m.reply(`*[ System Notice ]* Success Comment To WhatsApp`);
      global.ak.push(conn);
    } else if (connection === "close") {
      let statusCode = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (statusCode === DisconnectReason.badSession) {
        console.log("Bad Session File, Please Delete Session and Scan Again");
        ak.logout();
        m.reply('*[ System Notice ]*Deleting sessions...');
      } else if (statusCode === DisconnectReason.connectionClosed) {
        console.log("Connection closed, reconnecting....");
        console.log(reloadHandler(true));
      } else if (statusCode === DisconnectReason.connectionLost) {
        console.log("Connection Lost from Server, reconnecting...");
        console.log(reloadHandler(true));
      } else if (statusCode === DisconnectReason.connectionReplaced) {
        console.log(
          "Connection Replaced, Another New Session Opened, Please Close Current Session First",
        );
        ak.logout();
      } else if (statusCode === DisconnectReason.loggedOut) {
        console.log("Device Logged Out, Please Scan Again And Run.");
        process.send("reset");
      } else if (statusCode === DisconnectReason.restartRequired) {
        console.log("Restart Required, Restarting...");
        console.log(reloadHandler(true));
        m.reply("*[ System Notice ]* merestart");
      } else if (statusCode === DisconnectReason.timedOut) {
        console.log("Connection TimedOut, Reconnecting...");
        console.log(reloadHandler(true));
      } else {
        ak.end("Unknown DisconnectReason: " + statusCode + "|" + connection);
      }
    }
  }
  reloadHandler = function (restatConn) {
    let Handler = require("../handler");
    let handler = require("../handler");
    if (Object.keys(Handler || {}).length) handler = Handler;
    if (restatConn) {
      try {
        ak.ws.close();
      } catch {}
      conn = {
        ...conn,
        ...simple.makeWASocket(config),
      };
    }
    if (!isInit) {
      conn.ev.off("messages.upsert", conn.handler);
      conn.ev.off("group-participants.update", conn.onParticipantsUpdate);
      conn.ev.off("connection.update", conn.connectionUpdate);
      conn.ev.off("creds.update", conn.credsUpdate);
    }

    conn.handler = handler.handler.bind(conn);
    conn.onParticipantsUpdate = handler.participantsUpdate.bind(conn);
    conn.connectionUpdate = connectionUpdate.bind(conn);
    conn.credsUpdate = saveCreds.bind(conn);

    conn.ev.on("messages.upsert", conn.handler);
    conn.ev.on("group-participants.update", conn.onParticipantsUpdate);
    conn.ev.on("connection.update", conn.connectionUpdate);
    conn.ev.on("creds.update", conn.credsUpdate);
    isInit = false;
    return true;
  };
  reloadHandler();
};

handler.help = ["jadibot"]
handler.tags = ["jadibot"];
handler.command = ["jadibot"];
handler.premium = true;
module.exports = handler;