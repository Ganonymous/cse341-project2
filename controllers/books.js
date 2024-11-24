const mongoDb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongoDb.getDatabase().db('Project2').collection('books').find();
  result.toArray().then((books) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  });
};

const getSingle = async (req, res) => {
  const idString = String(req.params.id);
  const bookId = new ObjectId(idString);
  const result = await mongoDb
    .getDatabase()
    .db('Project2')
    .collection('books')
    .find({ _id: bookId });
  result.toArray().then((books) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books[0]);
  });
};

const addBook = async (req, res) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    isbn: req.body.isbn,
    genre: req.body.genre,
    pageCount: req.body.pageCount,
    rating: req.body.rating
  };
  const response = await mongoDb.getDatabase().db('Project2').collection('books').insertOne(book);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Something went wrong while adding the book.');
  }
};

const updateBook = async (req, res) => {
    const idString = String(req.params.id);
    const bookId = new ObjectId(idString);
    const book = {
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        isbn: req.body.isbn,
        genre: req.body.genre,
        pageCount: req.body.pageCount,
        rating: req.body.rating
      };
      const response = await mongoDb.getDatabase().db('Project2').collection('books').replaceOne({_id: bookId}, book);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Something went wrong while updating the book.');
      }
}

const deleteBook = async (req, res) => {
    const idString = String(req.params.id);
    const bookId = new ObjectId(idString);
      const response = await mongoDb.getDatabase().db('Project2').collection('books').deleteOne({_id: bookId});
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Something went wrong while deleting the book.');
      }
}

module.exports = { getAll, getSingle, addBook, updateBook, deleteBook };
