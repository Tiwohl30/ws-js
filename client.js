const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  puppeteer: { headless: true },
  authStrategy: new LocalAuth(),
});

client.on("ready", () => {
  console.log("🔰 SERVIDOR ACTIVO 🔰");
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.initialize();


module.exports = client;
