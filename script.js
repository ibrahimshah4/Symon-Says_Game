let gameSeq = [];
let userSeq = [];

let btns = [ "red", "yellow", "purple", "green"];

let highScore = 0;
let p = document.querySelector("p");

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let startBtn = document.querySelector(".startBtn")
startBtn.addEventListener("click", function(){
    if (started == false){
        console.log("Game is started");
        started = true;
        pressStartBtn();

        levelUP();
    }
})

//Start button event
function pressStartBtn(){
    startBtn.style.backgroundColor = "white";
    // startBtn.classList.add("flash");
    setTimeout(function(){
        startBtn.style.backgroundColor = "rgb(88, 185, 148)";
    },150)
}

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
    btn.classList.remove("flash")}, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
    btn.classList.remove("userflash")}, 250);
}

function levelUP(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIndx = Math.floor(Math.random() * 3);
    let randColor = btns[randIndx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);

    // console.log(randIndx);
    // console.log(randColor);
    // console.log(randBtn);

    gameFlash(randBtn);
}

function checkAns(idx){

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUP, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press Start key to restart`;
        highestScore();
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150)
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function highestScore (){
    if(highScore < level){
        highScore = level;
        p.innerText = `(High score: ${highScore})`;
    }
}
