const router = require('express').Router();
const utilities = require('../utilities');
const validate = require('../utilities/validation.js');
const booksController = require('../controllers/books');

router.get(
  '/',
  (req, res, next) => {
    /* #swagger.responses[200] = { description: 'OK' } */
    next();
  },
  utilities.handleErrors(booksController.getAll)
);
router.get(
  '/:id',
  (req, res, next) => {
    /* #swagger.responses[200] = { description: 'OK' } */
    next();
  },
  validate.idRule(),
  validate.checkId,
  utilities.handleErrors(booksController.getSingle)
);

router.post(
  '/',
  (req, res, next) => {
    /* #swagger.responses[204] = { description: 'No Content' } */
    /* #swagger.responses[500] = { description: 'Internal Server Error' } */
    /* #swagger.parameters ['body'] = {
    in: 'body',
    description: 'Add a book',
    schema: { $ref: '#/definitions/book'}
    }*/
    next();
  },
  validate.bookRules(),
  validate.checkBook,
  utilities.handleErrors(booksController.addBook)
);

router.put(
  '/:id',
  (req, res, next) => {
    /* #swagger.responses[204] = { description: 'No Content' } */
    /* #swagger.responses[500] = { description: 'Internal Server Error' } */
    /* #swagger.parameters ['body'] = {
      in: 'body',
      description: 'Add a book',
      schema: { $ref: '#/definitions/book'}
      }*/
    next();
  },
  validate.idRule(),
  validate.checkId,
  validate.bookRules(),
  validate.checkBook,
  utilities.handleErrors(booksController.updateBook)
);

router.delete(
  '/:id',
  (req, res, next) => {
    /* #swagger.responses[204] = { description: 'No Content' } */
    /* #swagger.responses[500] = { description: 'Internal Server Error' } */
    next();
  },
  validate.idRule(),
  validate.checkId,
  utilities.handleErrors(booksController.deleteBook)
);

module.exports = router;
