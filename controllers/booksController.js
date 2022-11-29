const fs = require("fs");

//** Lee los datos del archivo json permitiendo agregar un nuevo dato sin quitar los que ya estaban **/

const json_books = fs.readFileSync("books.json", "utf-8");
const books = JSON.parse(json_books);

//----------------------------------------------

// Peticiones GET
const cardBooks = (req, res) => {
  res.status(200).render("index.ejs", {
    books,
  });
};

const formBooks = (req, res) => {
  res.status(200).render("new-entry.ejs");
};

// Peticion POST
const createBook = (req, res) => {
  const { nombre, descripcion, año, genero, author, url } = req.body;

  if (!nombre || !descripcion || !año || !genero || !author || !url) {
    res.status(400).send("Debes Completar Todos Los Campos");
    return;
  }

  let newBook = {
    nombre,
    descripcion,
    año,
    genero,
    author,
    url,
  };
  books.push(newBook);

  //** Guarda los datos dentro de el archivo json llamdo book.json **/

  const json_books = JSON.stringify(books);
  fs.writeFileSync("books.json", json_books, "utf-8");

  res.redirect("/books");

  //----------------------------------------------

  res.status(200).send("Libro Añadido Exitosamente!");
  console.log(newBook);
  return;
};

// Peticion PUT
const updateBook = (req, res) => {
  res.status(200).send();
};

// Peticion DELETE
const deleteBook = (req, res) => {
  res.status(200).send();
};

// Peticion GET de un usuario
const oneBook = (req, res) => {
  res.status(200).send();
};

module.exports = {
  cardBooks,
  createBook,
  updateBook,
  deleteBook,
  oneBook,
  formBooks,
};
