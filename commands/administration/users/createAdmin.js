const axios = require("axios");
const { urlCreateAdmin, headersCreateAdmin } = require('../../../apis/create-admin');
const { url, postData, headerss } = require("../../../apis/login");
module.exports = (client,numerosAutorizados)=>{
    
    client.on('message', async (msg) =>{

        if (!numerosAutorizados.includes(msg.from)) {
          return;
        }
      
        if(msg.body.startsWith('/crearAdmin')){
          const lines = msg.body.split('\n');
          
          if(lines.length < 5){
            msg.reply('Faltan valores, verificalos porfavor.')
            return;
          }
          const [, usuario, nombre, clave, confirmar] = lines;
          
          const formU = new FormData();
          formU.append('id', '');
          formU.append('usuario', usuario.trim());
          formU.append('nombre', nombre.trim().toUpperCase());
          formU.append('clave', clave.trim().toUpperCase());
          formU.append('confirmar', confirmar.trim().toUpperCase());
      
          try {

            const response = await axios.post(url, postData, { headers: headerss });
            console.log("Respuesta recibida:", response.data);
      
            if (response.data.icono === "success") {
      
              const responseCreateUser = await axios.post(urlCreateAdmin, formU, {headers: headersCreateAdmin})
              console.log(responseCreateUser)
              
              if (responseCreateUser.data.icono === 'Usuario registrado') {
                msg.reply('Administrador registrado con éxito');

            } else if (responseCreateUser.data.msg === 'El usuario ya existe') {
                msg.reply('ya existe un usuario con el mismo nombre');
            } else {
                msg.reply('Respuesta inesperada: ' + responseCreateUser.data.msg);

            }
        } else {
            msg.reply('La primera solicitud no fue exitosa: ' + response.data.msg);
      
            }
            
          } catch (error) {
            console.error('Error al registrar ewl administraodr.', error);
          }
      
      
        }
      });
}