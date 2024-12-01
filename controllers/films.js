const mongoDb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongoDb.getDatabase().db('Project2').collection('films').find();
  result.toArray().then((films) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(films);
  });
};

const getSingle = async (req, res) => {
  const idString = String(req.params.id);
  const filmId = new ObjectId(idString);
  const result = await mongoDb
    .getDatabase()
    .db('Project2')
    .collection('films')
    .find({ _id: filmId });
  result.toArray().then((films) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(films[0]);
  });
};

const addFilm = async (req, res) => {
  const film = {
    title: req.body.title,
    length: req.body.length,
    genre: req.body.genre,
    rating: req.body.rating
  };
  const response = await mongoDb.getDatabase().db('Project2').collection('films').insertOne(film);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Something went wrong while adding the film.');
  }
};

const updateFilm = async (req, res) => {
  const idString = String(req.params.id);
  const filmId = new ObjectId(idString);
  const film = {
    title: req.body.title,
    length: req.body.length,
    genre: req.body.genre,
    rating: req.body.rating
  };
  const response = await mongoDb
    .getDatabase()
    .db('Project2')
    .collection('films')
    .replaceOne({ _id: filmId }, film);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Something went wrong while updating the film.');
  }
};

const deleteFilm = async (req, res) => {
  const idString = String(req.params.id);
  const filmId = new ObjectId(idString);
  const response = await mongoDb
    .getDatabase()
    .db('Project2')
    .collection('films')
    .deleteOne({ _id: filmId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Something went wrong while deleting the film.');
  }
};

module.exports = { getAll, getSingle, addFilm, updateFilm, deleteFilm };
