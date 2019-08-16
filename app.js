/* -------------- Variables!!! -------------- */
var currentRow = 1,
    colors = [
      'black',
      'purple',
      'blue',
      'green',
      'yellow',
      'orange',
      'red',
      'white'
    ],
    answer = [],
    guess = [];


/* -------------- Methods!!! -------------- */

// Generate random color
const randomColor = () => colors[Math.floor(Math.random() * 8)];

// Fill answer rubric with colors
const setAnswer = () => {
  if (answer.length) { answer = [];};
  for (let i = 0; i < 4; i++) {
    answer.push(randomColor());
  };
};

// Add the correct answer as classes in the answer section
const displayAnswer = () => {
  for (let i = 1; i < 5; i++) {
    $(`#answer${i}`).toggleClass(`${answer[i-1]}`);
  };
};

// Switch active spots after a single spot is clicked
const switchSpots = () => {
  let currentSpot = $(`#row${currentRow} > .spots > .spot.up-next`);
  let currentSpotNum = +currentSpot
    .attr('class')
    .split(/\s/)
    .filter(el => /spot\d/.test(el))[0].slice(4);
  currentSpot.toggleClass('up-next');
  $(`#row${currentRow} > .spots > .spot${currentSpotNum + 1}`).toggleClass('up-next');
}

// Compare the guess array and answer array to see if they are the same
const itIsRight = (arr1, arr2) => arr1.join('') === arr2.join('');

// Count how many spots are correct (Right Spot, Right Place)
const howManyAreCorrect = (arr1, arr2) => {
  var count = 0;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) {
      count++;
    }
  }
  return count;
}

// Remove correct spots for the howManyAreClose calculation
const removeCorrectSpots = (arr1, arr2) => {
  [arr1, arr2] = [arr1.slice(0), arr2.slice(0)];
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) {
      [arr1[i], arr2[i]] = ['X', 'X'];
    };
  };
  return [arr1, arr2];
}

// Count how many spots are the right color but in the wrong index
const howManyAreClose = (arr1, arr2) => {
  [arr1, arr2] = removeCorrectSpots(arr1, arr2);
  var count = 0;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === 'X') {}
    else if (arr2.indexOf(arr1[i]) !== -1 && arr1[i] !== arr2[i]) {
      count++;
      arr2.splice(arr2.indexOf(arr1[i]), 1, 'X');
    };
  };
  return count;
}

// Place a color in a guess
const selectColor = color => {
  $(`.up-next`).toggleClass(`${color}`);
  $(`.up-next`).attr('data-value', `${color}`);
  guess.push($(`.up-next`).attr('data-value'));
  if (guess.length > 3) {
    $('.btn-guess').prop('disabled', false);
    $('.color').off();
  };
  switchSpots();
};

// Change rows after an incorrect guess has been made
const changeRows = () => {
  $(`#row${currentRow} > .spots > .spot`).removeClass('up-next');
  $(`#row${currentRow}`).removeClass('current');
  currentRow++;
  $(`#row${currentRow} > .spots > .spot:first`).toggleClass('up-next');
  $(`#row${currentRow}`).addClass('current');
  $('.btn-guess').prop('disabled', true);
};

// Clear all classes and data attributes of an unsubmitted guess line
const clearOneRow = () => {
  $(`#row${currentRow} > .spots > .spot`).removeClass('black purple blue green yellow orange red white up-next');
  $(`#row${currentRow} > .spots > .spot`).removeAttr('data-value');
  $(`#row${currentRow} > .spots > .spot:first`).toggleClass('up-next');
};

// Clear the entire board of all classes and data attributes, resets to the start condition
const clearAllRows = () => {
  $('.spot').removeClass('black purple blue green yellow orange red white up-next');
  $('.spot').removeAttr('data-value');
  $(`#row1 > .spots > .spot:first`).toggleClass('up-next');
  currentRow = 1;
};

// Reset guess array to empty array
const resetGuess = () => guess = [];

// Start the game
const startGame = () => {
  $('.colors').toggle();
  $('.btn-start').toggle();
  $('.btn-guess').toggle();
  $('.btn-clear').toggle();
};

// End the game
const finishGame = () => {
  $('.colors').toggle();
  $('.btn-restart').toggle();
  $('.btn-guess').prop('disabled', true);
  $('.btn-guess').toggle();
  $('.btn-clear').toggle();
  $('.hide-answer-row').toggle();
  $('.answer-row').toggle();
  $(`#row${currentRow}`).addClass('winner');
};

// Start a new game
const restartGame = () => {
  $('.colors').toggle();
  $('.btn-guess').toggle();
  $('.btn-clear').toggle();
  $('.btn-restart').toggle();
  $('.hide-answer-row').toggle();
  $('.answer-row').toggle();
  $('.answer-spot').removeClass('black purple blue green yellow orange red white');
};

/* -------------- Click Events!!! -------------- */

// Start the game
$('.btn-start').click(function() {
  startGame();
  setAnswer();
  displayAnswer();
});

// Start a new game
$('.btn-restart').click(function() {
  clearAllRows();
  resetGuess();
  restartGame();
  setAnswer();
  displayAnswer();
  $('.color').click(function() {
    var color = $(this).attr('class').split(/\s/)[0];
    selectColor(color);
  });
});

// Placing a guess
$('.color').click(function() {
  var color = $(this).attr('class').split(/\s/)[0];
  selectColor(color);
});

// Submitting a guess
$('.btn-guess').click(function() {
  if (itIsRight(guess, answer)) {
    finishGame();
  } else {
    console.log(howManyAreCorrect(guess, answer), howManyAreClose(guess, answer));
    changeRows();
    resetGuess();
    $('.color').click(function() {
      var color = $(this).attr('class').split(/\s/)[0];
      selectColor(color);
    });
  };
});

// Clearing a guess
$('.btn-clear').click(function() {
  clearOneRow();
  if (guess.length === 4) {
    $('.color').click(function() {
      var color = $(this).attr('class').split(/\s/)[0];
      selectColor(color);
    });
  };
  resetGuess();
});
