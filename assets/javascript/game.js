var secretWord;
var wordBank = ["Metroid", "Mega Man", "Super Mario Bros", "Castlevania", "Contra", "Devil May Cry", "Asteroids", "Galaga", "Donkey Kong", "Mortal Kombat", "Super Smash Bros", "Final Fantasy", "Pac Man", "Fire Emblem", "Legend of Zelda", "Sonic the Hedgehog", "Chrono Trigger", "The Sims", "Halo", "Tomb Raider", "Star Fox", "Pokemon", "Call Of Duty", "Tetris", "Need For Speed", "Grand Theft Auto", "Bomberman", "Prince of Persia", "Doom", "Crash Bandicoot", "Guilty Gear", "Silent Hill", "Half Life", "Metal Gear", "Dance Dance Revolution", "Kingdom Hearts", "Fallout", "Resident Evil", "Bioshock", "Gears of War", "Mass Effect", "God of War", "Diablo", "Starcraft", "Warcraft", "Tekken", "Street Fighter", "Soul Caliber"];
var guessedLetter;
var lettersGuessed = [];
var filledLetters = [];
var start = false;
var won = false;
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
    console.log(secretWord);
    for (var i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === " ") {
            filledLetters[i] = " ";
        }
        else {
            filledLetters[i] = "_";
        }
    }
    start = true;
    console.log(start);
    console.log(secretWord);
    document.addEventListener("keyup", game);
}

function pickWord() {
    randomNumber = Math.floor(Math.random() * wordBank.length);
    return wordBank[randomNumber];
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
    start = false;
    won = false;
    lives = 4;
    document.removeEventListener("keyup", setLetter);
    document.addEventListener("keyup", begin);
    instructionDisplay.innerText = "Welcome to video game hangman! Press any key to start";
}

function game(event) {
        //begin the game engine
        // alert("Press any key to start!");

        if (lives > 0 && !won) {
            //guessedLetter = prompt("Lives: " + lives + "\n" + filledLetters + "\nGuess a letter!");

            if (!isValid(guessedLetter)) {
                statusDisplay.innerText = "Enter a single letter, please";
                continue;
            }

            if (!alreadyGuessed(guessedLetter)) {
                lettersGuessed.push(guessedLetter.toUpperCase());
                lettersGuessedDisplay.innerText = lettersGuessed.join("");
            }
            else {
                statusDisplay.innerText = "You already guessed that letter!";
                continue;
            }

            if (hasLetter(guessedLetter)) {
                fillAnswer(guessedLetter);
                answerDisplay.innerText = filledLetters.join("");
                lives++;

                if (filledLetters.every(isCorrect)) {
                    won = true;
                    wins++;
                    statusDisplay.innerText = "A winner is you!";
                }
                else {
                    statusDisplay.innerText = "1-Up!";
                }
            }
            else {
                lives--;

                if (lives == 0) {
                    losses++;
                    statusDisplay.innerText = "Game Over";
                }
                else {
                    statusDisplay.innerText = "Try Again!";
                }
            }
        }
        console.log(start);
        reset();
        //alert("Resetting the game just for you!");
    }
}

document.addEventListener("keyup", begin);


