let books = [];

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
  const { nombre, descripcion, año, author, genero, url } = req.body;

  if (!nombre || !descripcion || !año || !author || !genero || !url) {
    res.status(400).send("Debes Completar Todos Los Campos");
  }

  let newBook = {
    nombre,
    descripcion,
    genero,
    url,
    año,
    author,
  };
  books.push(newBook);
  res.status(200).send("Libro Añadido Exitosamente!"); // !!! REVISAR PORQUE FALLA NO MUESTRA LA INFO EN LA TARJETA CREADA DESDE EL FORMULARIO !!!
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
