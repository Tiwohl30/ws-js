const axios = require("axios");
const { url, postData, headerss } = require("../../apis/login");
const { urlCreateMateria,headersCreateMateria } = require("../../apis/subjects/api-subjects");

module.exports = (client,numerosAutorizados)=>{
    
    client.on('message', async (msg) =>{

        if (!numerosAutorizados.includes(msg.from)) {
          return;
        }
      
        if(msg.body.startsWith('/crearMateria')){
          const lines = msg.body.split('\n');
          
          if(lines.length < 2){
            msg.reply('Faltan valores, verificalos porfavor.')
            return;
          }
          const [, materia] = lines;
          
          const formU = new FormData();
          formU.append('id', '');
          formU.append('materia', materia.trim().toUpperCase());
      
          try {

            const response = await axios.post(url, postData, { headers: headerss });
            console.log("Respuesta recibida:", response.data);
      
            if (response.data.icono === "success") {
      
              const responseCreateUser = await axios.post(urlCreateMateria, formU, {headers: headersCreateMateria});
              console.log(responseCreateUser)
              
              if (responseCreateUser.data.icono === 'success') {
                msg.reply('Materia registrada con éxito');

            } else if (responseCreateUser.data.msg === 'La materia ya existe') {
                msg.reply('ya existe una materia con el mismo nombre');
            } else {
                msg.reply('Respuesta inesperada.');
            }
        } else {
            msg.reply('La primera solicitud no fue exitosa.');
      
            }
            
          } catch (error) {
            console.error('Error al registrar la materia.');
          }
      
      
        }
      });
}