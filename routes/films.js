const router = require('express').Router();
const utilities = require('../utilities');
const validate = require('../utilities/validation.js');
const filmsController = require('../controllers/films');

router.get(
  '/',
  (req, res, next) => {
    /* #swagger.responses[200] = { description: 'OK' } */
    next();
  },
  utilities.handleErrors(filmsController.getAll)
);
router.get(
  '/:id',
  (req, res, next) => {
    /* #swagger.responses[200] = { description: 'OK' } */
    next();
  },
  validate.idRule(),
  validate.checkId,
  utilities.handleErrors(filmsController.getSingle)
);

router.post(
  '/',
  (req, res, next) => {
    /* #swagger.responses[204] = { description: 'No Content' } */
    /* #swagger.responses[401] = { description: 'Unauthorized' } */
    /* #swagger.responses[500] = { description: 'Internal Server Error' } */
    /* #swagger.parameters ['body'] = {
    in: 'body',
    description: 'Add a film',
    schema: { $ref: '#/definitions/film'}
    }*/
    next();
  },
  utilities.isAuthenticated,
  validate.filmRules(),
  validate.checkFilm,
  utilities.handleErrors(filmsController.addFilm)
);

router.put(
  '/:id',
  (req, res, next) => {
    /* #swagger.responses[204] = { description: 'No Content' } */
    /* #swagger.responses[401] = { description: 'Unauthorized' } */
    /* #swagger.responses[500] = { description: 'Internal Server Error' } */
    /* #swagger.parameters ['body'] = {
      in: 'body',
      description: 'Film information',
      schema: { $ref: '#/definitions/film'}
      }*/
    next();
  },
  utilities.isAuthenticated,
  validate.idRule(),
  validate.checkId,
  validate.filmRules(),
  validate.checkFilm,
  utilities.handleErrors(filmsController.updateFilm)
);

router.delete(
  '/:id',
  (req, res, next) => {
    /* #swagger.responses[204] = { description: 'No Content' } */
    /* #swagger.responses[401] = { description: 'Unauthorized' } */
    /* #swagger.responses[500] = { description: 'Internal Server Error' } */
    next();
  },
  utilities.isAuthenticated,
  validate.idRule(),
  validate.checkId,
  utilities.handleErrors(filmsController.deleteFilm)
);

module.exports = router;
