// add javascript here
let name = capitalizeName(prompt("What is your name?"));
let answer = 0;
let guessCount = 0;
let currentRange = 0;
const scores = [];

function capitalizeName(value) {
    if (!value) {
        return "";
    }
    const trimmed = value.trim().toLowerCase();
    if (trimmed.length === 0) {
        return "";
    }
    return trimmed[0].toUpperCase() + trimmed.slice(1);
}

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);

function play(){
    let range = 0;
    let levels = document.getElementsByName("level");
    for(let i=0; i<levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }
    document.getElementById("msg").textContent = "Guess a number 1-" + range + " " + name;
    answer = Math.floor(Math.random()*range) +1;
    currentRange = range;
    guessCount = 0;

    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    playBtn.disabled = true;
}

function makeGuess(){
    let guess = parseInt(document.getElementById("guess").value);
    if(isNaN(guess)){
        msg.textContent = "Please enter a valid number " + name; 
        return;
    }
    guessCount++;
    if(guess == answer){
        msg.textContent = "Correct, " + name + "! It took " + guessCount + " tries.";
        updateScore(guessCount);
        resetGame();
    }
    else if(guess < answer){
        msg.textContent = "Too low, try again.";
    }
    else{
        msg.textContent = "Too high, try again.";
    }

}

function updateScore(score){
    scores.push(score);
    wins.textContent = "Total wins: " + scores.length;
    let sum = 0;
    for(let i = 0; i < scores.length; i++){
        sum += scores[i];
    }
    avgScore.textContent = "Average Score: " + (sum/scores.length).toFixed(1);

    scores.sort(function(a,b){return a-b;});

    let lb = document.getElementsByName("leaderboard");
    for(let i = 0; i < lb.length; i++){
        if(i < scores.length){
            lb[i].textContent = scores[i];
        }
    }
}

function resetGame(){
    guess.value = "";
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;
    e.disabled = false;
    m.disabled = false;
    h.disabled = false;
    
}

function giveUp(){
    if(currentRange <= 0){
        return;
    }

    msg.textContent = "You gave up! Score set to " + currentRange;
    updateScore(currentRange);
    resetGame();
    currentRange = 0;
}

displayDate();

function displayDate(){
    const now = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const day = now.getDate();
    const suffix = getDateSuffix(day);
    const year = now.getFullYear();

    document.getElementById("date").textContent = monthNames[now.getMonth()] + " " + day + suffix + ", " + year;
}

function getDateSuffix(day){
    if(day % 100 >= 11 && day % 100 <= 13){
        return "th";
    }

    const lastDigit = day % 10;
    if(lastDigit === 1){
        return "st";
    } else if(lastDigit === 2){
        return "nd";
    } else if(lastDigit === 3){
        return "rd";
    } else {
        return "th";
    }
}