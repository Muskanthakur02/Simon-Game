// Array of button colors
var colors = ["red", "blue", "green", "yellow"];

// Sequences
var gamePattern = [];
var userPattern = [];

// Game status
var started = false;
var level = 0;

// Start the game when any key is pressed
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextColor(); // start the game
    started = true;
  }
});

// When a color button is clicked
$(".btn").click(function () {
  var chosenColor = $(this).attr("id");
  userPattern.push(chosenColor);

  playSound(chosenColor);
  animatePress(chosenColor);

  checkAnswer(userPattern.length - 1);
});

// Check user's answer
function checkAnswer(index) {
  if (userPattern[index] === gamePattern[index]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextColor();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over! Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    resetGame();
  }
}

// Add a new color to the game sequence
function nextColor() {
  userPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomIndex = Math.floor(Math.random() * 4);
  var randomColor = colors[randomIndex];
  gamePattern.push(randomColor);

  // Flash and sound
  $("#" + randomColor).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

// Animate button press
function animatePress(color) {
  $("#" + color).addClass("pressed");

  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

// Play sound based on color
function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}


// Reset the game
function resetGame() {
  level = 0;
  gamePattern = [];
  started = false;
}
