const client = require("./client");

const numerosAutorizados = [
  "5219621397525-1600711669@g.us",
  "5219625219691@c.us",
  "5219621296648@c.us",
  "5213141223107@c.us",
  "5219622840326@c.us",
  "50377588153@c.us",
  "529621520184@c.us",
  "529622071932@c.us"
];

//COMMANDS
require('./commands/commands')(client, numerosAutorizados);

//STUDENTS
require('./commands/students/createUser')(client, numerosAutorizados);
require('./commands/students/viewstudentspdf')(client, numerosAutorizados);

//BOOKS
require('./commands/books/books/viewlibrarys')(client, numerosAutorizados);
require('./commands/books/editorial/viewEditorial')(client, numerosAutorizados);
require('./commands/books/author/viewAuthor')(client, numerosAutorizados);

//LOANDS
require('./commands/loand/viewloandpdf')(client, numerosAutorizados);

//subjects
require('./commands/subjects/viewsSubjects')(client, numerosAutorizados);
require('./commands/subjects/createSubjects')(client, numerosAutorizados);

//ADMINS
require('./commands/administration/users/viewAdmins')(client, numerosAutorizados);
require('./commands/administration/users/createAdmin')(client, numerosAutorizados);

//interacts
require('./commands/interact')(client, numerosAutorizados);
