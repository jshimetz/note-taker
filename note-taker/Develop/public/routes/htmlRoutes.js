const path = require('path');

module.exports = function (app) {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
  });

  app.get('/notes', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/notes.html'));
  });
};
