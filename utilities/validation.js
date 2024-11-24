const { body, param, validationResult } = require('express-validator');
const validate = {};

validate.idRule = () => {
  return [param('id').isMongoId()];
};

validate.checkId = (req, res, next) => {
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error('Invalid Id format');
  }
  next();
};

validate.bookRules = () => {
  return [
    body('title').trim().escape().isLength({ min: 1 }).withMessage('Please provide a title.'),
    body('author').trim().escape().isLength({ min: 1 }).withMessage('Please provide an author.'),
    body('publisher')
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Please provide a publisher.'),
    body('isbn').isISBN().withMessage('Please provide the ISBN'),
    body('genre').trim().escape().isLength({ min: 1 }).withMessage('Please provide a genre.'),
    body('pageCount')
      .isInt({ min: 1 })
      .withMessage('Please include the number of pages, minimum 1'),
    body('rating')
      .isFloat({ min: 0, max: 5 })
      .withMessage(
        'Please include an average rating, as a number of stars between 0 and 5, inclusive.'
      )
  ];
};

validate.checkBook = (req, res, next) => {
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorString = errors.errors
      .map((error) => {
        return `${error.path}: ${error.message}`;
      })
      .join('\n');
    throw new Error(`Invalid book:
            Errors detected:
            ${errorString}`);
  }
  next();
};

module.exports = validate;
