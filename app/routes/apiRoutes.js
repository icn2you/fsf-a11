const fs = require('fs'),
      path = require('path');

module.exports = (() => {
  'use strict';

  const apiRoutes = require('express').Router();

/*   htmlRoutes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
  });

  htmlRoutes.get('/survey', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'survey.html'));
  }); */

  apiRoutes.post("/api/friends", (req, res) => {
    const newFriend = req.body;

    // ASSERT: newFriend is equal to friend from survey.js
    // DEBUG:
    console.log(newFriend);

    if (newFriend) {
      const dataFile = path.join(__dirname, '..', 'data', 'friends.js');
      fs.appendFile(dataFile, `\n${newFriend}`, (err) => {
        console.error(err);
      });
    }

    res.json(`newFriend = ${newFriend}`);
  });

  return apiRoutes;
})();