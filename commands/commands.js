module.exports = (client) => {
  client.on("message", (msg) => {
    if (msg.body === "Comandos" | msg.body ==='comandos') {
      msg.reply(`
🛡️ ¡Comandos disponibles! 🛡️
        
Aquí tienes algunas cosas que puedo hacer:
        
💠 *CONSULTAS* 💠\n
📚 *\/verLibros*: Muestra la lista de todos los libros.\n
👨‍🎓 *\/verEstudiantes*: Muestra la lista de estudiantes.\n
👨‍🏫 *\/verMaterias*: Muestra la lista de materias.\n
📖 *\/verEditoriales*: Muestra la lista de editoriales.\n
✍️ *\/verAutores*: Muestra la lista de autores.\n
📑 *\/verPrestamos*: Envía un reporte de los préstamos de la biblioteca.\n
        
💠 *ACTUALIZACIONES* 💠\n
👩‍🎓 *\/crearEstudiante*: Envía el comando seguido de los datos del alumno: 
\n\n*MATRICULA*, *NOMBRE*, *CARRERA*, *DIRECCIÓN*, *TELEFONO*.
        
💠 *ADMINISTRACIÓN* 💠\n
🛡️ *\/verAdministradores*: Muestra la lista de administradores.
        `);        
    }
  });
};
///crearMateria
