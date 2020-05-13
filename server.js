// Standard Node packages
const express = require('express'),
      morgan = require('morgan'),
      path = require('path');

// Local resources
const htmlRoutes = require('./app/routes/htmlRoutes');

// http port
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'app/public')));
app.use(htmlRoutes);
app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`FriendFinder app listening on port ${PORT} ...`);
});