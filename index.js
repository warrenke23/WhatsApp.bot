const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const SESSION_FILE_PATH = './session.json';
let sessionData;

if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
  session: sessionData
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', session => {
  fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(session));
  console.log('✅ Authenticated');
});

client.on('ready', () => {
  console.log('🤖 Bot is ready!');
});

client.on('message', async msg => {
  if (msg.body.toLowerCase() === '!hello') {
    msg.reply('👋 Hello! Your GitHub WhatsApp bot is alive.');
  }
});

client.initialize();
