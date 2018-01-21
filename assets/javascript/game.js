var secretWord;
var wordBank = ["Metroid", "Mega Man", "Super Mario Bros", "Castlevania", "Contra", "Devil May Cry", "Asteroids", "Galaga", "Donkey Kong", "Mortal Kombat", "Super Smash Bros", "Final Fantasy", "Pac Man", "Fire Emblem", "Legend of Zelda", "Sonic the Hedgehog", "Chrono Trigger", "The Sims", "Halo", "Tomb Raider", "Star Fox", "Pokemon", "Call Of Duty", "Tetris", "Need For Speed", "Grand Theft Auto", "Bomberman", "Prince of Persia", "Doom", "Crash Bandicoot", "Guilty Gear", "Silent Hill", "Half Life", "Metal Gear", "Dance Dance Revolution", "Kingdom Hearts", "Fallout", "Resident Evil", "Bioshock", "Gears of War", "Mass Effect", "God of War", "Diablo", "Starcraft", "Warcraft", "Tekken", "Street Fighter", "Soul Caliber", "Space Invaders"];
var guessedLetter;
var lettersGuessed = [" "];
var filledLetters = [];
var lives = 4;
var wins = 0;
var losses = 0;

var instructionDisplay = document.querySelector("#instruction-text");
var answerDisplay = document.querySelector("#answer");
var statusDisplay = document.querySelector("#status");
var livesDisplay = document.querySelector("#lives");
var winsDisplay = document.querySelector("#wins");
var lossesDisplay = document.querySelector("#losses");
var guessedLettersDisplay = document.querySelector("#guessedLetters");

function begin(event) {
    document.removeEventListener("keyup", begin);
    secretWord = pickWord();
    for (var i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === " ") {
            filledLetters[i] = " ";
        }
        else {
            filledLetters[i] = "_";
        }
    }
    document.addEventListener("keyup", game);
    updateLives();
    updateWins();
    updateLosses();
    updateAnswer();
    updateGuessedLetters();
    instructionDisplay.innerText = "Guess a letter!";
    statusDisplay.innerText = "Ready Player One";
}

function pickWord() {
    randomNumber = Math.floor(Math.random() * wordBank.length);
    return wordBank[randomNumber];
}

function updateLives() {
    livesDisplay.innerText = lives;
}

function updateWins() {
    instructionDisplay.innerText = "A winner is you!";
    statusDisplay.innerText = "Press any key to play again";
    winsDisplay.innerText = wins;
}

function updateLosses() {
    lossesDisplay.innerText = losses;
}

function updateAnswer() {
    answerDisplay.innerText = filledLetters.join("");
}

function updateGuessedLetters() {
    guessedLettersDisplay.innerText = lettersGuessed.join("");
}

function hasLetter(letter) {
    for (var i = 0; i < secretWord.length; i++) {
        if (secretWord[i].toUpperCase() === letter.toUpperCase()) {
            return true;
        }
    }
    return false;
}

function isValid(input) {
    var az = /^[A-Za-z]$/;
    if (input.match(az)) {
        return true;
    }
    else {
        return false;
    }
}

function isCorrect(current) {
    return current !== "_";
}

function fillAnswer(letter) {
    for (var i = 0; i < filledLetters.length; i++) {
        if (secretWord[i].toUpperCase() === letter.toUpperCase()) {
            filledLetters[i] = secretWord[i].toUpperCase();
        }
    }
}

function alreadyGuessed(letter) {
    for (var i = 0; i < lettersGuessed.length; i++) {
        if (lettersGuessed[i] === letter.toUpperCase())
            return true;
    }
    return false;
}

function reset() {
    lettersGuessed = [];
    filledLetters = [];
    lives = 4;
    document.removeEventListener("keyup", game);
    document.addEventListener("keyup", begin);
}

function game(event) {
    guessedLetter = event.key;
    if (isValid(guessedLetter)) {
        if (!alreadyGuessed(guessedLetter)) {
            lettersGuessed.push(guessedLetter.toUpperCase());
            updateGuessedLetters();
            if (hasLetter(guessedLetter)) {
                fillAnswer(guessedLetter);
                updateAnswer();
                lives++;
                updateLives();

                if (filledLetters.every(isCorrect)) {
                    wins++;
                    updateWins();
                    reset();
                }
                else {
                    statusDisplay.innerText = "1-Up!";
                }
            }
            else {
                lives--;
                updateLives();
                console.log(typeof lives);
                if (lives === 0) {
                    losses++;
                    updateLosses();
                    instructionDisplay.innerText = "Game Over";
                    statusDisplay.innerText = "Press any key to play again";
                    reset();
                }
                else {
                    statusDisplay.innerText = "Try Again!";
                }
            }

        }
        else {
            statusDisplay.innerText = "You already guessed that letter!";
        }
    }
    else {
        statusDisplay.innerText = "Enter a letter, please";
    }
}

document.addEventListener("keyup", begin);


