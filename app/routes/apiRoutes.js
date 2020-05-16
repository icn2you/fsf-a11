const fs = require('fs'),
      path = require('path');

module.exports = (() => {
  'use strict';

  const apiRoutes = require('express').Router(),
        dataFile = path.join(__dirname, '..', 'data', 'friends.json'),
        totalQns = 10;

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

    let friendExists = false,
        match = null;

    if (newFriend) {
      const newFriendScores = newFriend.scores;
      
      let matchName = null,
          matchScore = 0,
          potentialMatchScore = 0;

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

          if (totalScoreDiff < potentialMatchScore) {
            matchScore = totalScoreDiff;
            matchName = potentialMatchName;
            match = friend;
          }

          potentialMatchScore = totalScoreDiff;

          // DEBUG:
          console.log(`You have a score difference of ${potentialMatchScore} with ${potentialMatchName}.`);
        }
        else {
          friendExists = true;
        }
      }

      console.log(`You and ${matchName} should definitely get to know one another!`);

      // DEBUG:
      // console.log(match);

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
  });

  return apiRoutes;
})();