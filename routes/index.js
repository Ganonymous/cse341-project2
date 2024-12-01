const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger.json');
const passport = require('passport');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
router.use('/books', require('./books') /*#swagger.tags = ['Books']*/);
router.use('/films', require('./films') /*#swagger.tags = ['Films']*/);

router.get(
  '/login',
  passport.authenticate('github', (req, res) => {})
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
