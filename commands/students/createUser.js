const axios = require("axios");
const { urlCreate, headersCreate } = require('../../apis/create-user');
const { url, postData, headerss } = require("../../apis/login");
module.exports = (client,numerosAutorizados)=>{
    
    client.on('message', async (msg) =>{

        if (!numerosAutorizados.includes(msg.from)) {
          console.log("Número no autorizado:", msg.from);
          return;
        }
      
        if(msg.body.startsWith('/crearEstudiante')){
          const lines = msg.body.split('\n');
          
          if(lines.length < 7){
            msg.reply('Faltan valores, verificalos porfavor.')
            return;
          }
          const [, codigo, dni, nombre, carrera, direccion, telefono] = lines;
          
          const formU = new FormData();
          formU.append('id', '');
          formU.append('codigo', codigo.trim().toUpperCase());
          formU.append('dni', dni.trim().toUpperCase());
          formU.append('nombre', nombre.trim().toUpperCase());
          formU.append('carrera', carrera.trim().toUpperCase());
          formU.append('direccion', direccion.trim().toUpperCase());
          formU.append('telefono', telefono.trim().toUpperCase());
      
          try {
            console.log("Enviando solicitud a", url);
            console.log("Datos del POST:", postData);
      
            const response = await axios.post(url, postData, { headers: headerss });
            console.log("Respuesta recibida:", response.data);
      
            if (response.data.icono === "success") {
      
              const responseCreateUser = await axios.post(urlCreate, formU, {headers: headersCreate})
              console.log(responseCreateUser.status)
              console.log(responseCreateUser)
              
              if (responseCreateUser.data.msg === 'Estudiante registrado') {
                msg.reply('Estudiante registrado con éxito');
            } else if (responseCreateUser.data.msg === 'El estudiante ya existe') {
                msg.reply('El estudiante ya existe');
            } else {
                msg.reply('Respuesta inesperada: ' + responseCreateUser.data.msg);
                console.log("xxxxxxxxxxxx",responseCreateUser.data.msg)
            }
        } else {
            msg.reply('La primera solicitud no fue exitosa: ' + response.data.msg);
        
      
            }
            
          } catch (error) {
            console.error('Error al registrar el estudiante:', error);
          }
      
      
        }
      });
}