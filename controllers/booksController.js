const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

//** Lee los datos del archivo json permitiendo agregar un nuevo dato sin quitar los que ya estaban **/

const json_books = fs.readFileSync("books.json", "utf-8");
let books = JSON.parse(json_books);

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
    id: uuidv4(),
    nombre,
    descripcion,
    año,
    genero,
    author,
    url,
  };
  books.push(newBook);
  res.status(200).send("Libro Añadido Exitosamente!");

  //** Guarda los datos dentro de el archivo json llamdo book.json **/

  const json_books = JSON.stringify(books);
  fs.writeFileSync("books.json", json_books, "utf-8");

  //----------------------------------------------
};

// Peticion PUT
const updateBook = (req, res) => {
  res.status(200).send();
};

// Peticion DELETE
const deleteBook = (req, res) => {
  books = books.filter((books) => books.id !== req.params.id);

  const json_books = JSON.stringify(books);
  fs.writeFileSync("books.json", json_books, "utf-8");

  res.status(200).send("Libro Eliminado Exitosamente");
};

// Peticion GET de un libro
const oneBook = (req, res) => {
  const json_books = fs.readFileSync("books.json", "utf-8");
  let books = JSON.parse(json_books);

  if (!books)
    return res.status(404).send({ message: "El Libro Solicitado No Existe." });

  books = books.filter((books) => books.id === req.params.id);

  res.status(200).render("index.ejs", { books });
};

module.exports = {
  cardBooks,
  createBook,
  updateBook,
  deleteBook,
  oneBook,
  formBooks,
};
