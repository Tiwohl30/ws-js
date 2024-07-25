const { jsPDF } = require("jspdf");
require('jspdf-autotable');
const { MessageMedia } = require("whatsapp-web.js");
const fs = require('fs');

function generatePDF(title, columns, rows, filePath) {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(title, doc.internal.pageSize.getWidth() / 2, 22, null, null, 'center');

    doc.autoTable({
        head: [columns],
        body: rows,
        startY: 30,
        theme: 'striped',
        headStyles: { fillColor: [41, 128, 185] },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { top: 10 },
    });

    doc.save(filePath);

    if (fs.existsSync(filePath)) {
        return MessageMedia.fromFilePath(filePath);
    } else {
        throw new Error('El archivo PDF no se generó correctamente.');
    }
}

module.exports = generatePDF;
