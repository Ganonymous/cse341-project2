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
  const contactId = new ObjectId(idString);
  const result = await mongoDb
    .getDatabase()
    .db('Project2')
    .collection('books')
    .find({ _id: contactId });
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

module.exports = { getAll, getSingle, addBook };
