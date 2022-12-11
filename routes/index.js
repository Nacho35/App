const express = require("express");
const api = express.Router();

const { booksController } = require("../controllers");

api.get("/books", booksController.cardBooks);
api.get("/books/new-entry", booksController.formBooks);
api.post("/books/new-book", booksController.createBook);
api.get("/update/:id", booksController.updateBook);
api.get("/delete/:id", booksController.deleteBook);
api.get("/books/:id", booksController.oneBook);

module.exports = api;
