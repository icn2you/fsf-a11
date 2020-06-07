/***********************************************************************
FSWD:  Christopher B. Zenner
Date:  05/16/2020
File:  survey.js
Ver.:  0.2.0 20200517
       
This JS script serves the following functions:

1. renders the FriendFinder survey for the user to complete
2. listens for the user to submit their completed survey and then POSTs
   the results for processing
3. listens for button click events on the match modal and modifies the 
   survey.html page accordingly
***********************************************************************/
const questions = [
  'You are a fairly traditional, even old-fashioned person.',
  'You are easily bored when you are alone or not busy.',
  'Dancing at a club or attending a big pop-culture event sound like a good time to you.',
  'You are often told you are too idealistic or impractical.',
  'You hate small talk and feel awkward trying to engage in it.',
  'A day in solitude sounds like a great time.',
  'You find yourself easily overwhelmed by too much activity or socializing.',
  'You easily remember small details about people and things (<em>e.g.</em>, hairstyle, car model, or the sound of someone\'s voice)',
  'People turn to you for advice on complex issues like relationships, personal finances, career choices, etc.',
  'Your hobbies and leisure activities tend to be very hands-on or active (<em>e.g.</em>, knitting, skating, dancing).',
];

// On page load ...
$(document).ready(() => {
  let qNo = 0,
      surveyQs = '',
      user = null,
      userMatch = null;

  for (const q of questions) {
  /*
    <h5>Question 1</h5>
    <h6>A day entirely by yourself sounds like a great time.</h6>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="q1-radio-opts" id="q1-radio-opt1" value="1" required>
      <label class="form-check-label" for="q1-radio-opt1">1 (Strongly Disagree)</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="q1-radio-opts" id="q1-radio-opt2" value="2" required>
      <label class="form-check-label" for="q1-radio-opt2">2 (Somewhat Disagree)</label>
    </div>              
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="q1-radio-opts" id="q1-radio-opt3" value="3" required>
      <label class="form-check-label" for="q1-radio-opt3">3 (Neither Agree nor Disagree)</label>
    </div>            
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="q1-radio-opts" id="q1-radio-opt4" value="4" required>
      <label class="form-check-label" for="q1-radio-opt4">4 (Somewhat Agree)</label>
    </div>            
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="q1-radio-opts" id="q1-radio-opt5" value="5" required>
      <label class="form-check-label" for="q1-radio-opt5">5 (Strongly Agree)</label>
    </div>
  */
    qNo++;

    surveyQs += `<h5>Question ${qNo}</h5>`;
    surveyQs += `<h6>${q}</h6>`;
    surveyQs += `<div class="form-check form-check-inline">`;
    surveyQs += `<input class="form-check-input" type="radio" name="q${qNo}-radio-opts" id="q${qNo}-radio-opt1" value="1" required>`;
    surveyQs += `<label class="form-check-label" for="q${qNo}-radio-opt1">1 (Strongly Disagree)</label>`;
    surveyQs += `</div>`;
    surveyQs += `<div class="form-check form-check-inline">`;
    surveyQs += `<input class="form-check-input" type="radio" name="q${qNo}-radio-opts" id="q${qNo}-radio-opt2" value="2" required>`;
    surveyQs += `<label class="form-check-label" for="q${qNo}-radio-opt2">2 (Somewhat Disagree)</label>`;
    surveyQs += `</div>`;
    surveyQs += `<div class="form-check form-check-inline">`;
    surveyQs += `<input class="form-check-input" type="radio" name="q${qNo}-radio-opts" id="q${qNo}-radio-opt3" value="3" required>`;
    surveyQs += `<label class="form-check-label" for="q${qNo}-radio-opt3">3 (Neither Agree nor Disagree)</label>`;
    surveyQs += `</div>`;
    surveyQs += `<div class="form-check form-check-inline">`;
    surveyQs += `<input class="form-check-input" type="radio" name="q${qNo}-radio-opts" id="q${qNo}-radio-opt4" value="4" required>`;
    surveyQs += `<label class="form-check-label" for="q${qNo}-radio-opt2">4 (Somewhat Agree)</label>`;
    surveyQs += `</div>`;    
    surveyQs += `<div class="form-check form-check-inline">`;
    surveyQs += `<input class="form-check-input" type="radio" name="q${qNo}-radio-opts" id="q${qNo}-radio-opt5" value="5" required>`;
    surveyQs += `<label class="form-check-label" for="q${qNo}-radio-opt2">5 (Stongly Agree)</label>`;
    surveyQs += `</div>`;
  }

  $('#survey-qns').append(surveyQs);

  // Survey submission event listener
  $('#submit-survey-btn').on('click', (event) => {
    event.preventDefault();

    $('html, body').animate({ scrollTop: 0 }, 100);

    // Validate that form was actually completed by user.
    function isFormFilled() {
      let formValid = true;

      $('.form-control').each(function() {
        if ($(this).val() === '')
          formValid = false;
      });

      $('.form-check-input').each(function() {
        const name = $(this).attr('name');

        if ($(`input:radio[name="${name}"]:checked`).length == 0) {
          // DEBUG:
          // console.log(`${name} is not valid!`);
          
          formValid = false;
        }        
      });

      return formValid;
    }

    if (isFormFilled()) {
      // Get user name and photo URL from form data.
      const friend = {
        name: $('#friend-name').val().trim(),
        photo: $('#friend-photo').val().trim(),
      };

      // Clear respective form fields.
      $('#friend-name').val('');
      $('#friend-photo').val('');

      // Get user's survey responses from form data.
      const formData = $('#survey').serializeArray(),
            scores = [];

      formData.forEach((score, i) => {
        scores.push(parseInt(`${score.value}`));

        // Clear respective form element.
        $(`input[name='${score.name}']#q${i+1}-radio-opt${score.value}`).prop('checked', false);
      });

      friend.scores = scores;
      user = friend;

      $.post('/api/friends', friend, (match) => {
        if (!match) {
          $('#alert-msg').text('You are not compatible with anyone. Better luck next time, and consider seeing a therapist!');
      
          $('#alert-modal').modal('toggle');
        }
        else {
          // DEBUG:
          // console.log(match);

          $('.match-name').text(match.name);
          $('#match-photo').attr({
            'src': match.photo,
            'alt': match.name
          });

          // Display best match
          $('#friend-modal').modal('toggle');
          
          userMatch = match;
        }
      });
    }
    else {
      $('#alert-msg').text('Your survey was not completed properly.');
      
      $('#alert-modal').modal('toggle'); 
    }

    return false;
  });

  // I'm in Love! button click event listener
  $('#love-btn').on('click', (event) => { 
    event.preventDefault();

    let userPlusMatch = `<!-- 1 --><div class="row h-100 mt-2 justify-content-center">`;
      userPlusMatch += `<!-- 2 --><div class="col-lg-10 my-auto">`;
      userPlusMatch += `<!-- 3 --><div class="card">`;
      userPlusMatch += `<!-- 4 --><div class="card-body text-center">`;
      userPlusMatch += `<!-- 5 --><div class="card-text">`;
      userPlusMatch += `<!-- 6 --><div id="friend-match" class="container">`;
      userPlusMatch += `<!-- 7 --><div class="row mt-4 justify-content-center align-items-center">`;
      userPlusMatch += `<!-- 8 --><div class="col-4">`;
      userPlusMatch += `<figure>`;
      userPlusMatch += `<img class="img-fluid" src="${user.photo}" alt="${user.name}">`;
      userPlusMatch += `<figcaption class="gray"><h3>${user.name}</h3></figcaption>`;
      userPlusMatch += `</figure>`;
      userPlusMatch += `</div><!-- /8 -->`;
      userPlusMatch += `<!-- 9 --><div id="lg-plus" class="col-1"><i class="fas fa-plus"></i></div><!-- /9 -->`;
      userPlusMatch += `<!-- 10 --><div class="col-4">`;            
      userPlusMatch += `<figure>`;
      userPlusMatch += `<img class="img-fluid" src="${userMatch.photo}" alt="${userMatch.name}">`;
      userPlusMatch += `<figcaption class="blood"><h3>${userMatch.name}</h3></figcaption>`;
      userPlusMatch += `</figure>`;
      userPlusMatch += `</div><!-- /10 -->`;
      userPlusMatch += `</div><!-- /7 -->`;      
      userPlusMatch += `</div><!-- /6 -->`;
      userPlusMatch += `<h1 class="card-title"><span class="gray">Friend</span><i class="fas fa-plus"></i><span class="blood">Finder</span> Match</h1>`;
      userPlusMatch += `<h5 id="ff-msg">May you both enjoy a lifetime of friendship<i class="fas fa-plus gray"></i>!</h5>`;
      userPlusMatch += `</div><!-- /5 -->`;
      userPlusMatch += `</div><!-- /4 -->`;
      userPlusMatch += `</div><!-- /3 -->`;
      userPlusMatch += `<!-- 11 --><div id="dev-links" class="text-center">`;
      userPlusMatch += `<a href="/api/friends" target="_blank">API Friends List</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://github.com/icn2you/fsf-hw11-friendfinder-node-app.git" target="_blank">GitHub Repo</a>`;
      userPlusMatch += `</div><!-- /11 -->`;
      userPlusMatch += `</div><!-- /2 -->`;
      userPlusMatch += `</div><!-- /1 -->`;

    $('main.container').empty().html(userPlusMatch);
  });

  // Not So Much button click event listener
  $('#meh-btn').on('click', (event) => { 
    event.preventDefault();

    let userPlusMatch = `<!-- 1 --><div class="row h-100 mt-2 justify-content-center">`;
      userPlusMatch += `<!-- 2 --><div class="col-lg-8 my-auto">`;
      userPlusMatch += `<!-- 3 --><div class="card">`;
      userPlusMatch += `<img src="/img/lonely-boy.jpg" alt="Lonely Boy" id="lonely-boy" class="card-img-top">`
      userPlusMatch += `<!-- 4 --><div class="card-body text-center">`;
      userPlusMatch += `<h1 class="card-title"><span class="gray">Friend</span><i class="fas fa-plus"></i><span class="blood">Finder</span></h1>`;
      userPlusMatch += `<h5 class="card-text">Better luck next time. <i class="fas fa-heart-broken blood"></i></h5>`;
      userPlusMatch += `</div><!-- /4 -->`;
      userPlusMatch += `</div><!-- /3 -->`;
      userPlusMatch += `<!-- 5 --><div id="dev-links" class="text-center">`;
      userPlusMatch += `<a href="/api/friends" target="_blank">API Friends List</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://github.com/icn2you/fsf-hw11-friendfinder-node-app.git" target="_blank">GitHub Repo</a>`;
      userPlusMatch += `</div><!-- /5 -->`;
      userPlusMatch += `</div><!-- /2 -->`;
      userPlusMatch += `</div><!-- /1 -->`;

    $('main.container').empty().html(userPlusMatch);
  });
});
