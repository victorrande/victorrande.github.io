// -------------==============SNAKE===============-----------

//rutenett
var blockSize; //størrelsen på "rutene", altså 5x5 // 16 på liten mobil

calcSize()

var rows = 20; //legger inn 20 "ruter" i y retning
var cols = 20; //legger inn 20 "ruter" i x retning
var board;
var context; //tegne-objekt

let boardEl = document.getElementById("board");

//high score
let scoreEl = document.querySelector("#score")
let highScoreEl = document.getElementById(`highScore`);
let S = Number(0)

if (!localStorage.highScore) {  //if test for å sette localstoragen til bane 1 dersom brukeren er ny
    localStorage.highScore = 1
}

highScoreEl.innerHTML = (`Highscore: ${localStorage.highScore}`)

//slangens kropp
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;  //farten til slangen
var velocityY = 0;  //farte til slangen

var snakeBody = [];

//frukten
var foodX;
var foodY;

//controller



if(!localStorage.snakeDifficulty){  //if test for å sette localstoragen slik at slangen går i riktig fart
    localStorage.snakeDifficulty = 7.5
}

if(!localStorage.difficultySelected){  //if test for å sette localstoragen slik at slangen går i riktig fart
    localStorage.difficultySelected = (`LETT`)
}

console.log(localStorage.snakeDifficulty)

let intervalTime = 1000/ localStorage.snakeDifficulty;
let intervalID = setInterval(update, intervalTime);

//  -------  Innstillinger ------- 
let settingsEl = document.querySelector(`#settings`)
let closeSettingsEl = document.getElementById("close")

settingsEl.addEventListener(`click`, settings)
closeSettingsEl.addEventListener(`click`, closeSettings)

function settings(){
    console.log("Settings")

    document.querySelector(`.parentSettingsOff`).setAttribute("class","parentSettings") //endrer id til parentSettingOff -> parentSetting
    document.querySelector(`#board`).setAttribute("id","boardOff") //endrer id til parentSettingOff -> parentSetting
    
}

function closeSettings(){
    console.log("Settings")

    document.querySelector(`.parentSettings`).setAttribute("class","parentSettingsOff") //endrer id til parentSettingOff -> parentSetting
    document.querySelector(`#boardOff`).setAttribute("id","board") //endrer id til parentSettingOff -> parentSetting
}

let easy = document.querySelector(`#easy`)
let medium = document.querySelector(`#medium`)
let hard = document.querySelector(`#hard`)
let i_hard = document.querySelector(`#i_hard`)

let difficultyEl = document.querySelector(`#difficulty`)

difficultyEl.innerHTML = localStorage.difficultySelected


    easy.addEventListener(`click`, function() {
        intervalTime = 7.5;
        clearInterval(intervalID);
        intervalID = setInterval(update, 1000/intervalTime)
        localStorage.snakeDifficulty = 7.5;
        localStorage.difficultySelected = (`LETT`)
        difficultyEl.innerHTML = localStorage.difficultySelected
    })

    medium.addEventListener(`click`, function() {
        intervalTime = 10;
        clearInterval(intervalID);
        intervalID = setInterval(update, 1000/intervalTime)
        localStorage.snakeDifficulty = 10;
        console.log(localStorage.snakeDifficulty)
        localStorage.difficultySelected = (`MIDDELS`)
        console.log(localStorage.difficultySelected)
        difficultyEl.innerHTML = localStorage.difficultySelected

    })


    hard.addEventListener(`click`, function() {
        intervalTime = 12.5;
        clearInterval(intervalID);
        intervalID = setInterval(update, 1000/intervalTime)
        localStorage.snakeDifficulty = 12.5;
        localStorage.difficultySelected = (`VANSKELIG`)
        difficultyEl.innerHTML = localStorage.difficultySelected


    })

    i_hard.addEventListener(`click`, function() {
        intervalTime = 20;
        clearInterval(intervalID);
        intervalID = setInterval(update, 1000/intervalTime)
        localStorage.snakeDifficulty = 20;
        localStorage.difficultySelected = (`EKSTRA VANSKELIG`)
        difficultyEl.innerHTML = localStorage.difficultySelected
        //document.querySelector(`#difficulty`).setAttribute("id","i_hard")
    })


// Innstillinger slutt

//gameover
var gameOver = false;

//funksjon for hva som skjer når man loader inn nettsiden
window.onload = function restart() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // tegnebrettet

    placeFood(); //setter i gang plasser frukt 
    document.addEventListener("keyup", changeDirection); //Setter spillet i gang når en trykker på en av piltastene

}


function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height); //gjør tegnebrettet/rutenettet grønt

    context.fillStyle = "black";
    context.strokeRect(25, 25, board.width - 50, board.height - 50)


    var fruit = document.getElementById("fruit")
    //var pat = context.createPattern(fruit,"repeat")
    context.drawImage(fruit, foodX, foodY, blockSize, blockSize)


    if (snakeX == foodX && snakeY == foodY) { //if test, dersom fruktens koordinater og slangens koordinater er like skal det plasseres en ny frukt
        snakeBody.push([foodX, foodY]);
        placeFood();
        plusScore();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime"; //slangens farge


    snakeX += velocityX * blockSize; //* elapsed / 500
    snakeY += velocityY * blockSize; //* elapsed / 500
    context.fillRect(snakeX, snakeY, blockSize, blockSize); //fyller rutene slangen dekker med fargen lime
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
        //alert("Game Over");
        location.reload();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            //alert("Game Over");
            location.reload();
        }
    }


}



//retningsendrer for kontroller
var controllerUp = document.getElementById(`controllerUp`);
var controllerLeft = document.getElementById(`controllerLeft`);
var controllerRight = document.getElementById(`controllerRight`);
var controllerDown = document.getElementById(`controllerDown`);

    controllerUp.addEventListener(`click`, function(){
        velocityX = 0;
        velocityY = -1;
    })

    controllerDown.addEventListener(`click`, function(){
        velocityX = 0;
        velocityY = 1;
    })

    controllerLeft.addEventListener(`click`, function(){
        velocityX = -1; 
        velocityY = 0;
    })


    controllerRight.addEventListener(`click`, function(){
        velocityX = 1; 
        velocityY = 0;
    })


//retningsendrer for piltaster
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1 || e.key === "w" && velocityY != 1) { // dersom brukeren trykket pil opp eller W beveger objektet seg oppover
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1 || e.key === "s" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1 || e.key == "a" && velocityX != 1) {
        velocityX = -1; //venstre er -1 i X retning
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1 || e.key == "d" && velocityX != -1) {
        velocityX = 1; //høyre er + 1 i x retning
        velocityY = 0;
    }
}

//funksjon som gir frukten en random destinasjon
function placeFood() {
    //et random nummer mellom (0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;

    //dersom S passerer 5 øker farten med 10%
    if(S === 5 && S > 0){
        console.log("Score over 5")
        clearInterval(intervalID);
        intervalTime *= 0.9;
        intervalID = setInterval(update, intervalTime);

    }

    //dersom S passerer 10 øker farten med 20%
    if(S === 10 ){
        console.log("Score over 10")
        clearInterval(intervalID);
        intervalTime *= 0.8;
        intervalID = setInterval(update, intervalTime);

    }

    //dersom S passerer 20 øker farten med 20%
    if(S === 20 ){
        console.log("Score over 10")
        clearInterval(intervalID);
        intervalTime *= 0.8;
        intervalID = setInterval(update, intervalTime);

    }

}

function plusScore() {
    S += 1
    console.log(S)
    console.log(highScore)
    scoreEl.innerHTML = (`Score: ${S}     <img id="fruit" src="bilder/cookie1.png" alt="">`)
    if (localStorage.highScore < S) {
        localStorage.highScore = S
    }
}



window.addEventListener(`resize`, calcSize)
function calcSize() {
    if (window.matchMedia("(max-width: 480px)").matches){
        blockSize = 16
    } else {
        blockSize = 25
    }

    console.log(blockSize)
}

