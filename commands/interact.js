const { MessageMedia } = require('whatsapp-web.js');

module.exports = (client,numerosAutorizados) => {
    client.on('message', async(msg) =>{
        if (!numerosAutorizados.includes(msg.from)) {
            const media = MessageMedia.fromFilePath('C:/Users/eduar/Documents/dev/ws-js/assets/imgs/nonegros.jpg');
            await client.sendMessage(msg.from, media);
          }
    });
};
