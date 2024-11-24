const router = require('express').Router();
const utilities = require('../utilities');
const validate = require('../utilities/validation.js');
const booksController = require('../controllers/books');

router.get('/',
    () => {/* #swagger.responses[200] = { description: 'OK' } */},
    utilities.handleErrors(booksController.getAll));
router.get(
  '/:id',
  () => {/* #swagger.responses[200] = { description: 'OK' } */},
  validate.idRule(),
  validate.checkId,
  utilities.handleErrors(booksController.getSingle)
);

router.post(
  '/',
  () => {/* #swagger.responses[204] = { description: 'No Content' } */
    /* #swagger.responses[500] = { description: 'Internal Server Error' } */
    /* #swagger.parameters ['body'] = {
    in: 'body',
    description: 'Add a book',
    schema: { $ref: '#/definitions/book'}
    }*/},
  validate.bookRules(),
  validate.checkBook,
  utilities.handleErrors(booksController.addBook)
);

router.put(
    '/:id',
    () => {/* #swagger.responses[204] = { description: 'No Content' } */
      /* #swagger.responses[500] = { description: 'Internal Server Error' } */
      /* #swagger.parameters ['body'] = {
      in: 'body',
      description: 'Add a book',
      schema: { $ref: '#/definitions/book'}
      }*/},
      validate.idRule(),
      validate.checkId,
    validate.bookRules(),
    validate.checkBook,
    utilities.handleErrors(booksController.updateBook)
  );

  router.delete(
    '/:id',
    () => {/* #swagger.responses[204] = { description: 'No Content' } */
      /* #swagger.responses[500] = { description: 'Internal Server Error' } */
      },
      validate.idRule(),
      validate.checkId,
    utilities.handleErrors(booksController.deleteBook)
  );
  
module.exports = router;
