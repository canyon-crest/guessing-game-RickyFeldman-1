// add javascript here
let name = capitalizeName(prompt("What is your name?"));
let answer = 0;
let guessCount = 0;
let currentRange = 0;
let startTime = 0;
const scores = [];
const times = [];

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
    startTime = new Date().getTime();

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
        const elapsed = (new Date().getTime() - startTime) / 1000;
        msg.textContent = "Correct, " + name + "! It took " + guessCount + " tries.";
        updateTime(elapsed);
        updateScore(guessCount);
        resetGame();
    }
    else {
        const diff = Math.abs(guess - answer);
        let heat = "cold";
        if(diff <= 2){
            heat = "hot";
        } else if(diff <= 5){
            heat = "warm";
        }

        if(guess < answer){
            msg.textContent = "Too low, you're " + heat + ".";
        } else {
            msg.textContent = "Too high, you're " + heat + ".";
        }
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

function updateTime(elapsed){
    times.push(elapsed);
    const fastest = Math.min.apply(null, times);
    let sum = 0;
    for(let i = 0; i < times.length; i++){
        sum += times[i];
    }
    const average = sum / times.length;

    document.getElementById("fastest").textContent = "Fastest Game: " + fastest.toFixed(3) + " seconds";
    document.getElementById("avgTime").textContent = "Average Time: " + average.toFixed(3) + " seconds";
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

    const elapsed = (new Date().getTime() - startTime) / 1000;
    msg.textContent = "You gave up! Score set to " + currentRange;
    updateTime(elapsed);
    updateScore(currentRange);
    resetGame();
    currentRange = 0;
}

updateDate();
setInterval(updateDate, 1000);

function updateDate(){
    const now = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const day = now.getDate();
    const suffix = getDateSuffix(day);
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("date").textContent =
        monthNames[now.getMonth()] + " " + day + suffix + ", " + year + " " +
        hours + ":" + minutes + ":" + seconds;
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
