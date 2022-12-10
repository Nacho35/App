const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

//** Lee los datos del archivo json permitiendo agregar un nuevo dato sin quitar los que ya estaban **//

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
    return res
      .status(400)
      .send({ message: "Debes Completar Todos Los Campos" });
  }

  const id = uuidv4();
  if (!id) {
    return res.status(500).send({ message: "Error al generar ID del libro" });
  }

  let newBook = {
    id,
    nombre,
    descripcion,
    año,
    genero,
    author,
    url,
  };

  books.push(newBook);

  //** Guarda los datos dentro de el archivo json llamdo book.json **//

  const json_books = JSON.stringify(books);
  fs.writeFileSync("books.json", json_books, "utf-8");

  res.status(200).send({ message: "Libro Añadido Exitosamente!" });

  //----------------------------------------------
};

// Peticion PUT
const updateBook = (req, res) => {
  book = books.find((books) => books.id === req.params.id);

  book.nombre = req.body.nombre;
  book.descripcion = req.body.descripcion;
  book.año = req.body.año;
  book.genero = req.body.genero;
  book.author = req.body.author;
  book.url = req.body.url;

  if (!book)
    return res.status(404).send({ message: "El libro no se puede actualizar" });

  const json_books = JSON.stringify(books);
  fs.writeFileSync("books.json", json_books, "utf-8");

  res.status(200).send({ message: "Libro actualizado exitosamente!" });
};

// Peticion DELETE
const deleteBook = (req, res) => {
  //*** primero busca si el elemento existe en la base de datos ***//

  const book = books.find((books) => books.id === req.params.id);

  if (!book)
    return res.status(404).send({ message: "El libro no se encuentra" });

  //*** luego si existe el elemento lo elimina de la base de datos ***//

  books = books.filter((books) => books.id !== req.params.id);

  const json_books = JSON.stringify(books);
  fs.writeFileSync("books.json", json_books, "utf-8");

  res.status(200).send({ message: "Libro eliminado exitosamente" });
};

// Peticion GET de un libro
const oneBook = (req, res) => {
  const json_books = fs.readFileSync("books.json", "utf-8");
  let books = JSON.parse(json_books);

  const book = books.find((books) => books.id === req.params.id);

  if (!book)
    return res.status(404).send({ message: "El libro no se Encuentra" });

  res.status(200).send({ message: "Libro Encontrado Exitosamente" });
};

module.exports = {
  cardBooks,
  createBook,
  updateBook,
  deleteBook,
  oneBook,
  formBooks,
};
