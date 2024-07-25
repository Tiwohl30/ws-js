const axios = require("axios");
const { url, postData, headerss } = require("../../../apis/login");
const { default: jsPDF } = require("jspdf");
require("jspdf-autotable");
const generatePDF = require("../../../utils/pdfGenerator");
const { MessageMedia } = require("whatsapp-web.js");
const fs = require("fs");

module.exports = (client, numerosAutorizados) => {
  client.on("message", async (msg) => {

    if (!numerosAutorizados.includes(msg.from)) {
      return;
    }

    if (msg.body === "/verAdministradores") {
      try {
        const response = await axios.post(url, postData, { headers: headerss });

        if (response.data.icono === "success") {
          const homeUrl = "https://remsystem.net/Usuarios/listar?_=";
          const homeResponse = await axios.get(homeUrl, { headers: headerss });
          console.log("scxzlkvnzlnxlcklnkc", homeResponse)

          const Admins = homeResponse.data;
          
          const tableColumn = [
            "ID",
            "USUARIO",
            "NOMBRE",
            "ESTADO ACTUAL"
          ];
          const tableRows = Admins.map((Admin) => [
            Admin.id,
            Admin.usuario,
            Admin.nombre,
            Admin.estado.replace(/<[^>]+>/g, "")
          ]);

          const filePath = "C:/Users/eduar/Documents/dev/ws-js/pdf/Administradores.pdf";
          const media = generatePDF(
            "ADMINISTRADORES BIBLIOTECA VIRTUAL 2.0",
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
