const router = require('express').Router();
const utilities = require('../utilities');
const validate = require('../utilities/validation.js');
const booksController = require('../controllers/books');

router.get('/', utilities.handleErrors(booksController.getAll));
router.get(
  '/:id',
  validate.idRule(),
  validate.checkId,
  utilities.handleErrors(booksController.getSingle)
);

router.post(
  '/',
  validate.bookRules(),
  validate.checkBook,
  utilities.handleErrors(booksController.addBook)
);

module.exports = router;
