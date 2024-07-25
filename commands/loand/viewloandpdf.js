const { url, postData, headerss } = require("../../apis/login");
const path = require("path");
const axios = require("axios");
const { jsPDF } = require('jspdf');
const { MessageMedia } = require("whatsapp-web.js");
const generatePDF = require("../../utils/pdfGenerator");
require('jspdf-autotable');

module.exports = (client, numerosAutorizados)=>{

    client.on("message", async (msg) => {
        console.log("mesaje recibido:", msg.body);
      
        if (!numerosAutorizados.includes(msg.from)) {
          return;
        }
      
        if (msg.body === "/verPrestamos") {
          try {
            const response = await axios.post(url, postData, { headers: headerss });

            if (response.data.icono === "success") {
                const homeUrl = "https://remsystem.net/Prestamos/listar?_=";
                const homeResponse = await axios.get(homeUrl, { headers: headerss });

                const prestamos = homeResponse.data;

                const tableColumn = [
                    "Estudiante",
                    "Título",
                    "Fecha de Préstamo",
                    "Fecha de Devolución",
                    "Cantidad",
                    "Observación",
                    "Estado"
                  ];

                  const tableRows = prestamos.map((prestamo) =>[
                    prestamo.nombre,
                    prestamo.titulo,
                    prestamo.fecha_prestamo,
                    prestamo.fecha_devolucion,
                    prestamo.cantidad,
                    prestamo.observacion,
                    prestamo.estado.replace(/<[^>]+>/g, "")
                ]);
                const filePath = "C:/Users/eduar/Documents/dev/ws-js/pdf/prestamos.pdf";
                const media = generatePDF(
                    "LISTA DE PRESTAMOS BIBLIOTECA VIRTUAL",
                    tableColumn,
                    tableRows,
                    filePath
                );
                await client.sendMessage(msg.from, media);

            } else if (response.data.icono === "warning") {
                msg.reply("Usuario o contraseña incorrecta.");
            } else {
                msg.reply("Error inesperado en la autenticación.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            msg.reply("Hubo un error al intentar iniciar sesión.");
        }
        
        }
      });
}