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

    if (msg.body === "/verEstudiantes") {
      try {
        const response = await axios.post(url, postData, { headers: headerss });

        if (response.data.icono === "success") {
          const homeUrl = "https://remsystem.net/Estudiantes/listar?_=";
          const homeResponse = await axios.get(homeUrl, { headers: headerss });

          const usuarios = homeResponse.data;

          const tableColumn = [
            "ID",
            "MATRICULA",
            "NOMBRE",
            "CARRERA",
            "ESTADO",
            "TELEFONO"
          ];
          const tableRows = usuarios.map((usuario) => [
            usuario.id,
            usuario.dni,
            usuario.nombre,
            usuario.carrera,
            usuario.estado.replace(/<[^>]+>/g, ""),
            usuario.telefono
          ]);

          const filePath =
            "C:/Users/eduar/Documents/dev/ws-js/pdf/estudiantes.pdf";
          const media = generatePDF(
            "LISTA DE ESTUDIANTES BIBLIOTECA VIRTUAL",
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
