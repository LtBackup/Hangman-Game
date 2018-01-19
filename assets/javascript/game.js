var secretWord;
var wordBank = ["Metroid", "Mega Man", "Mario", "Castlevania", "Contra", "Devil May Cry", "Asteroids", "Galaga", "Donkey Kong", "Mortal Kombat", "Super Smash Bros", "Final Fantasy", "Pac Man", "Fire Emblem", "Legend of Zelda", "Sonic the Hedgehog", "Chrono Trigger"];
var guessedLetter;
var lettersGuessed = [];
var filledLetters = [];
var won = false;
var lives = 4;
var wins = 0;
var losses = 0;


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
            console.log(filledLetters);
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
    won = false;
    lives = 4;
}

while (true) {
    secretWord = pickWord();
    for (var i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === " ") {
            filledLetters[i] = " ";
        }
        else {
            filledLetters[i] = "_";
        }
    }
    console.log(secretWord);

    //begin the game engine
    alert("Press any key to start!");
    alert("Ready Player One");

    while (lives > 0 && !won) {
        guessedLetter = prompt("Lives: " + lives + "\n" + filledLetters + "\nGuess a letter!");

        if (!isValid(guessedLetter)) {
            alert("Enter a single letter, please");
            continue;
        }

        if (!alreadyGuessed(guessedLetter)) {
            lettersGuessed.push(guessedLetter.toUpperCase());
        }
        else {
            alert("You already guessed that letter!");
            continue;
        }

        console.log("guessed letters", lettersGuessed);

        //display guessed letter
        if (hasLetter(guessedLetter)) {
            fillAnswer(guessedLetter);
            lives++;
            console.log(lives);

            if (filledLetters.every(isCorrect)) {
                won = true;
                wins++;
                alert("A winner is you!");
            }
            else {
                alert("1-Up!");
            }
        }
        else {
            lives--;
            console.log(lives);
            if (lives == 0) {
                losses++;
                alert("Game Over");
            }
            else {
                alert("Try Again!");
            }
        }
    }

    reset();
    alert("Resetting the game just for you!");
}




