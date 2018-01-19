var secretWord;
var wordBank = ["Metroid", "Mega Man", "Mario", "Castlevania", "Contra", "Devil May Cry", "Asteroids", "Galaga", "Donkey Kong", "Mortal Kombat", "Super Smash Bros", "Final Fantasy", "Pac Man", "Fire Emblem", "Legend of Zelda", "Sonic the Hedgehog", "Chrono Trigger"];
var guessedLetter;
var lettersGuessed = [];
var filledLetters = [];
var won = false;
var lives = 5;
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
    var letters = /^[A-Za-z]$/;
    if (input.value.match(letters)) {
        return true;
    }
    else {
        return false;
    }
}

function isTrue(current) {
    return current;
}

function fillAnswer(letter) {
    for (var i = 0; i < filledLetters.length; i++) {
        if (secretWord[i].toUpperCase() === letter.toUpperCase()) {
            filledLetters[i] = true;
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
}

while (true) {
    secretWord = pickWord();
    for (var i = 0; i < secretWord.length; i++) {
        filledLetters[i] = false;
    }
    console.log(secretWord);

    //begin the game engine
    alert("Press any key to start!");
    alert("Ready Player One");

    while (lives > 0 && !won) {
        guessedLetter = prompt("Guess a letter!");
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
            
            if (filledLetters.every(isTrue)) {
                won = true;
                alert("A winner is you!");
            }
            else {
                alert("1-Up!");
            }
        }
        else {
            lives--;
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




