const express = require('express');
const app = express();

const mongoDb = require('./data/database');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/', require('./routes'));

app.use(async (err, req, res, next) => {
  console.log(err);
  console.error(`Error at: "${req.originalURI}": ${err}`);
  res.status(500).send(err.message || "Uh Oh! Something we didn't account for went wrong!");
});

mongoDb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => console.log(`Running on port ${port}`));
  }
});
