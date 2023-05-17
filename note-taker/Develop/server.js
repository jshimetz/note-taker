const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

apiRoutes(app);
htmlRoutes(app);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
