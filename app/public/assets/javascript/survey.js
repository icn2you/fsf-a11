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

$(document).ready(() => {
  let qNo = 0,
      surveyQs = '';

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
});