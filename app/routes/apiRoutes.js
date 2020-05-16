const fs = require('fs'),
      path = require('path');

module.exports = (() => {
  'use strict';

  const apiRoutes = require('express').Router(),
        dataFile = path.join(__dirname, '..', 'data', 'friends.json');

  let friends = null;

  try {
    const rawData = fs.readFileSync(dataFile);

    friends = JSON.parse(rawData);
  } 
  catch (err) {
    console.error(err);
  }

  apiRoutes.get('/api/friends', (req, res) => {
    res.json(friends);
  });

  apiRoutes.post('/api/friends', (req, res) => {
    const newFriend = req.body;

    // ASSERT: newFriend is equal to friend from survey.js
    // DEBUG:
    // console.log(newFriend);

    if (newFriend) {


      try {
        const rawData = fs.readFileSync(dataFile);

        friends = JSON.parse(rawData);

        console.log(friends);
      } 
      catch (err) {
        console.error(err);
      }

      try {
        if (friends)
          friends.push(newFriend);
        else
          friends = [].push(friend);

        fs.writeFileSync(dataFile, JSON.stringify(friends, null, 2));
      }
      catch (err) {
        console.error(err);
      }     
    }
  });

  return apiRoutes;
})();