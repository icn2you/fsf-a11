const fs = require('fs'),
      path = require('path');

module.exports = (() => {
  'use strict';

  const apiRoutes = require('express').Router(),
        dataFile = path.join(__dirname, '..', 'data', 'friends.json'),
        totalQns = 10;

  function getFriends() {
    try {
      const rawData = fs.readFileSync(dataFile);

      return JSON.parse(rawData);
    } 
    catch (err) {
      console.error(err);

      // Service Unavailable
      res.status(503).end();
    }
  }

  apiRoutes.get('/api/friends', (req, res) => {
    res.json(getFriends());
  });

  apiRoutes.post('/api/friends', (req, res) => {
    const newFriend = req.body;

    // ASSERT: newFriend is equal to friend from survey.js
    // DEBUG:
    // console.log(newFriend);

    let friends = getFriends(),
        friendExists = false,
        match = null;

    if (newFriend) {
      const newFriendScores = newFriend.scores;
      
      let potentialMatchName = null,
          potentialMatchScore = 0,
          firstIteration = true;

      for (const friend of friends) {
        // Make sure visitor is not in "database" already.
        if (newFriend.name !== friend.name)
        {
          const potentialMatchName = friend.name,
                potentialMatchScores = friend.scores; 
          
          let totalScoreDiff = 0;

          for (let i = 0; i < totalQns; i++) {
            const qDiff = Math.abs(
              parseInt(newFriendScores[i]) - potentialMatchScores[i]);

            totalScoreDiff += qDiff;
          }

          // Only do this the first time to seed the variable.
          if (firstIteration) {
            potentialMatchScore = totalScoreDiff;
            firstIteration = false;
          }

          // If newFriend has a lower or equal score difference with
          // this friend, make this friend the potential match. This
          // ensures the user always gets the most recent match.
          if (totalScoreDiff <= potentialMatchScore) {
            potentialMatchScore = totalScoreDiff;
            match = friend;
          }

          // DEBUG:
          console.log(`You have a score difference of ${totalScoreDiff} with ${potentialMatchName}.`);
        }
        else {
          friendExists = true;
        }
      }

      // DEBUG:
      console.log(`You and ${match.name} should definitely get to know one another!`);

      res.json(match);
   
      // Add user to "database" if they don't already exist.
      if (!friendExists) {
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
    }
    else {
      // Bad Request
      res.status(400).end();
    }
  });

  return apiRoutes;
})();