var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;

function flashAndSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

  $("#" + name)
    .fadeOut(100)
    .fadeIn(100);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];

  //generating random number
  var randomNum = Math.floor(Math.random() * 4);

  //generating random color
  var randomChosenColor = buttonColors[randomNum];

  //pushing color to array
  gamePattern.push(randomChosenColor);

  level++;

  $("#level-title").text("LEVEL " + level);

  flashAndSound(randomChosenColor);
}

$(".btn").click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  checkAns(userClickedPattern.length - 1);

  flashAndSound(this.id);
  animatePress(this.id);
});

function checkAns(currentLvl) {
  if (gamePattern[currentLvl] === userClickedPattern[currentLvl]) {
    // console.log("success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log("wrong");
    gameOver();
    $("body").one("keypress", function () {
      nextSequence();
    });
    startOver();
  }
}

$(document).one("keydown", function () {
  nextSequence();
});

function gameOver() {
  var audio1 = new Audio("sounds/wrong.mp3");
  audio1.play();

  $("h1").text("Game Over, Press Any Key to Restart");

  $("body").addClass("game-over");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function startOver() {
  level = 0;
  gamePattern = [];
}
