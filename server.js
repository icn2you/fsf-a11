// Standard Node packages
const express = require('express'),
      morgan = require('morgan'),
      path = require('path');

// Local resources
const apiRoutes = require('./app/routes/apiRoutes')
      htmlRoutes = require('./app/routes/htmlRoutes');

// http port
const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'app/public')));
app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, () => {
  console.log(`FriendFinder app listening on port ${PORT} ...`);
});