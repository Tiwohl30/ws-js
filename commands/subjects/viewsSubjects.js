const axios = require("axios");
const { url, postData, headerss } = require("../../apis/login");
const { default: jsPDF } = require("jspdf");
require("jspdf-autotable");
const generatePDF = require("../../utils/pdfGenerator");
const { MessageMedia } = require("whatsapp-web.js");
const fs = require("fs");

module.exports = (client, numerosAutorizados) => {
  client.on("message", async (msg) => {

    if (!numerosAutorizados.includes(msg.from)) {
      return;
    }

    if (msg.body === "/verMaterias") {
      try {
        const response = await axios.post(url, postData, { headers: headerss });

        if (response.data.icono === "success") {
          const homeUrl = "https://remsystem.net/Materia/listar?_=";
          const homeResponse = await axios.get(homeUrl, { headers: headerss });

          const materias = homeResponse.data;
          
          const tableColumn = [
            "ID",
            "MATERIA",
            "ESTADO",
          ];
          const tableRows = materias.map((materia) => [
            materia.id,
            materia.materia,
            materia.estado.replace(/<[^>]+>/g, "").toUpperCase(),
          ]);

          const filePath = "C:/Users/eduar/Documents/dev/ws-js/pdf/Materias.pdf";
          const media = generatePDF(
            "MATERIAS DISPONIBLES",
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
        console.error("Error durante el proceso:", error);
        msg.reply("Hubo un error al intentar iniciar sesión.");
      }
    }
  });
};
