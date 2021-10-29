var gamePattern = [];


var userClickedPattern = [];


var buttonColours =["red","blue","green","yellow"];
var level;
$(document).on("keydown",function(e){
    
    if(e.key === "s"){
        level=0;
        nextSequence();
    }
    
});

var randomChosenColour;
function nextSequence(){
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random() *4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`.${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level: "+ level);
    
}
function checkAnswer(currentLevel){
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").html("Oyun Bitti <br> <br> başlamak için 's' ye basın");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
}

function startOver(){
    gamePattern= [];
    userClickedPattern= [];
}


$(".btn").on("click", function (e) {
    var userChosenColour = e.currentTarget.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

    
});

function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}


