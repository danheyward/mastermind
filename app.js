// Testing, testing

// Seriously, is this not working?

/* -------------- Variables!!! -------------- */
var currentRow = 1,
    colors = [
      'black',
      'brown',
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
  for (var i = 0; i < 4; i++) {
    answer.push(randomColor());
  };
  return answer;
};

const displayAnswer = () => {
  for (var i = 1; i < 5; i++) {
    $(`#answer${i}`).toggleClass(`${answer[i-1]}`);
  };
};

// Switching active spots after a single guess is made
const switchSpots = () => {
  var spots = $(`#row${currentRow} > .spots > .spot`);
  var currentSpot = $(`#row${currentRow} > .spots > .spot.up-next`);
  var currentSpotNum = +currentSpot
    .attr('class')
    .split(/\s/)
    .filter(el => el !== 'up-next' && el !== 'spot')[0].slice(4);
  currentSpot.toggleClass('up-next');
  $(`#row${currentRow} > .spots > .spot${currentSpotNum + 1}`).toggleClass('up-next')
}

// See if the guess is correct or incorrect
const itIsRight = (arr1, arr2) => {
  return arr1.join('') === arr2.join('');
}

// Right Spot, Right Place
const rSrP = (arr1, arr2) => {
  var num = 0;
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) {
      num++;
    }
  }
  return num;
}

// Remove RSRP spots for RSWP calculation
const removeCorrectSpots = (arr1, arr2) => {
  [arr1, arr2] = [arr1.slice(0), arr2.slice(0)];
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) {
      [arr1[i], arr2[i]] = ['X', 'X'];
    }
  }
  return [arr1, arr2];
}

// Right Spot, Wrong Place
const rSwP = (arr1, arr2) => {
  [arr1, arr2] = removeCorrectSpots(arr1, arr2);
  var num = 0;
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] === 'X') {}
    else if (arr2.indexOf(arr1[i]) !== -1 && arr1[i] !== arr2[i]) {
      num++;
      arr2.splice(arr2.indexOf(arr1[i]), 1, 'X');
    }
  }
  return num;
}

// Place a color in a guess
const selectColor = color => {
  $(`.up-next`).toggleClass(`${color}`);
  $(`.up-next`).attr('data-value', `${color}`);
  guess.push($(`.up-next`).attr('data-value'));
  if (guess.length > 3) {
    $('.btn-guess').prop('disabled', false);
    $('.color').off();
  }
  switchSpots();
}

// Start the game
const startGame = () => {
  $('.colors').toggle();
  $('.btn-start').toggle();
  $('.btn-guess').toggle();
  $('.btn-clear').toggle();
};

const restartGame = () => {
  $('.colors').toggle();
  $('.btn-guess').toggle();
  $('.btn-clear').toggle();
  $('.btn-restart').toggle();
  $('.hide-answer-row').toggle();
  $('.answer-row').toggle();
  $('.answer-spot').removeClass('black brown blue green yellow orange red white');
}

// Change rows after an incorrect guess has been made
const changeRows = () => {
  $(`#row${currentRow} > .spots > .spot`).removeClass('up-next');
  currentRow++;
  $(`#row${currentRow} > .spots > .spot:first`).toggleClass('up-next');
  $('.btn-guess').prop('disabled', true);
};

// Clear all classes and data attributes of an unsubmitted guess line
const clearSingleRowValues = () => {
  $(`#row${currentRow} > .spots > .spot`).removeClass('black brown blue green yellow orange red white up-next');
  $(`#row${currentRow} > .spots > .spot`).removeAttr('data-value');
  $(`#row${currentRow} > .spots > .spot:first`).toggleClass('up-next');
};

const clearAllValues = () => {
  $('.spot').removeClass('black brown blue green yellow orange red white up-next');
  $('.spot').removeAttr('data-value');
  $(`#row1 > .spots > .spot:first`).toggleClass('up-next');
  currentRow = 1;
}

// Reset guess array to empty array
const resetGuess = () => { guess = []; };

// End the game
const finishGame = () => {
  $('.colors').toggle();
  $('.btn-restart').toggle();
  $('.btn-guess').prop('disabled', true);
  $('.btn-guess').toggle();
  $('.btn-clear').toggle();
  $('.hide-answer-row').toggle();
  $('.answer-row').toggle();
};

/* -------------- Click Events!!! -------------- */

// Start the game
$('.btn-start').click(function() {
  startGame();
  setAnswer();
  displayAnswer();
})

// Start a new game
$('.btn-restart').click(function() {
  clearAllValues();
  restartGame();
  setAnswer();
  displayAnswer();
  resetGuess();
  $('.color').on('click', function() {
    var color = $(this).attr('class').split(/\s/)[0];
    selectColor(color);
  });
})

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
    console.log(rSrP(guess, answer), rSwP(guess, answer));
    changeRows();
    resetGuess();
    $('.color').on('click', function() {
      var color = $(this).attr('class').split(/\s/)[0];
      selectColor(color);
    });
  };
});

// Clearing a guess
$('.btn-clear').click(function() {
  clearSingleRowValues();
  if (guess.length === 4) {
    $('.color').on('click', function() {
      var color = $(this).attr('class').split(/\s/)[0];
      selectColor(color);
    });
  };
  resetGuess();
});
