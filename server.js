const express = require('express'),
      morgan = require('morgan'),
      path = require('path');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`FriendFinder app listening on port ${PORT} ...`);
});