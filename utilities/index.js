const handleErrors = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(401).json('Log in to gain access');
  }
  next();
};

module.exports = { handleErrors, isAuthenticated };
