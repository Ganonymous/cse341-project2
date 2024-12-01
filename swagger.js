const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: "Andrew Leetham's CSE341 Project 2 API",
    description: 'Library API'
  },
  host: 'cse341-project2-a22r.onrender.com',
  schemes: ['https'],
  definitions: {
    book: {
      title: 'book title',
      author: 'author name',
      publisher: 'publisher name',
      isbn: '978-0-544-27299-6',
      genre: 'genre',
      pageCount: 123,
      rating: 4.4
    },
    film: {
      title: 'film title',
      length: 90,
      genre: 'genre',
      rating: 3.67
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
