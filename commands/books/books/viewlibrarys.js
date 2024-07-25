const { default: jsPDF } = require("jspdf");
const { url, postData, headerss } = require("../../../apis/login");
const axios = require("axios");
const { MessageMedia } = require("whatsapp-web.js");
const generatePDF = require("../../../utils/pdfGenerator");
require("jspdf-autotable");

module.exports = (client, numerosAutorizados) => {
  client.on("message", async (msg) => {
    if (!numerosAutorizados.includes(msg.from)) {
      console.log("Numero no autorizado");
    }

    if (msg.body === "/verLibros") {
      try {
        const response = await axios.post(url, postData, { headers: headerss });

        if (response.data.icono === "success") {
          const homeUrl =
            "https://remsystem.net/Libros/listar?_=1721742083529 ";
          const homeResponse = await axios.get(homeUrl, { headers: headerss });

          const libros = homeResponse.data;
          const tableColumn = [
            "TITULO",
            "UNIDADES",
            "AÑO EDICION",
            "DESCRIPCION",
            "EDITORIAL"
          ];

          const tableRows = libros.map((libro) => [
            libro.titulo,
            libro.cantidad,
            libro.anio_edicion,
            libro.descripcion,
            libro.editorial.replace(/<[^>]+>/g, "")
          ]);

          const filePath = "C:/Users/eduar/Documents/dev/ws-js/pdf/libros.pdf";
          const media = generatePDF(
            "LISTA DE LIBROS BIBLIOTECA VIRTUAL",
            tableColumn,
            tableRows,
            filePath
        );
        await client.sendMessage(msg.from, media);

        } else if (response.data.icono === "warning") {
          msg.reply("Usuario o contraseña incorrecta.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        msg.reply("Hubo un error al intentar iniciar sesión.");
      }
    }
  });
};
