var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
var userClickedPattern=[]
    
var started=false;
var level=0;

$(document).keypress(function()
{
    console.log("pressed");
    if(!started)
    {
        nextSequence();
    }
    started=true;
});

$ (".btn").click(function(event)
{
    userChosenColour=event.target.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
})
 

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");

        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }
    }
    else
    {
       console.log("wrong");
       $("body").addClass("game-over");
       playSound("wrong");
       $("h1").text("Game Over, Press Any Key to Restart");
       setTimeout(function()
       {
        $("body").removeClass("game-over");
       },200)
       startOver();
    }
    
}



function startOver()
{
    started=false;
    level=0;
    gamePattern=[];
    userClickedPattern=[];
}

function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);

    var randomNumber=(Math.random()*4);
    randomNumber=Math.floor(randomNumber);

    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio=new Audio("sounds/"+randomChosenColour+".mp3");
    audio.play();

}
function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function()
    {
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}







