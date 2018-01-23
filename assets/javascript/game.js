var secretWord;
var wordBank = ["Metroid", "Mega Man", "Super Mario Bros", "Castlevania", "Contra", "Devil May Cry", "Asteroids", "Galaga", "Donkey Kong", "Mortal Kombat", "Super Smash Bros", "Final Fantasy", "Pac Man", "Fire Emblem", "Legend of Zelda", "Sonic the Hedgehog", "Chrono Trigger", "The Sims", "Halo", "Tomb Raider", "Star Fox", "Pokemon", "Call Of Duty", "Tetris", "Need For Speed", "Grand Theft Auto", "Bomberman", "Doom", "Crash Bandicoot", "Guilty Gear", "Silent Hill", "Half Life", "Metal Gear", "Dance Dance Revolution", "Kingdom Hearts", "Fallout", "Resident Evil", "Bioshock", "Gears of War", "Mass Effect", "God of War", "Diablo", "Starcraft", "Warcraft", "Tekken", "Street Fighter", "SoulCaliber", "Space Invaders", "Medal of Honor", "Paperboy", "Doom", "Guitar Hero", "Angry Birds", "Gran Turismo", "Pong", "Portal", "Braid", "Mario Kart", "Mario Party", "Wolfenstein", "Myst", "Quake", "Counter Strike", "SimCity", "Civilization", "Minecraft", "The Oregon Trail", "Doodle Jump", "Advance Wars", "Breath of Fire", "Defender", "Joust", "Gauntlet", "Double Dragon", "Prince of Persia", "Shadow of the Colossus", "Streets of Rage", "The Secret of Monkey Island", "Grim Fandango", "Lemmings", "Adventure", "Gunstar Heroes", "Secret of Mana", "Earthbound", "Panzer Dragoon", "Thief", "Shenmue", "Unreal", "Deus Ex", "Jet Set Radio", "Max Payne", "Burnout", "Phoenix Wright", "Katamari Damacy", "The Elder Scrolls", "Okami", "Dead Space", "Uncharted", "Rock Band", "Dark Souls", "The Witcher", "Snake", "Centipede", "Zero Wing", "Missile Command", "Missile Command"];
var guessedLetter;
var lettersGuessed = [];
var filledLetters = [];
var lives = 3;
var wins = 0;
var losses = 0;
var mute = true;
//sound effects are from Nintendo and Square Enix. all rights belong to their respective owners

var instructionDisplay = document.querySelector("#instruction-text");
var answerDisplay = document.querySelector("#answer");
var statusDisplay = document.querySelector("#status");
var livesDisplay = document.querySelector("#lives");
var winsDisplay = document.querySelector("#wins");
var lossesDisplay = document.querySelector("#losses");
var guessedLettersDisplay = document.querySelector("#guessedLetters");

var audio1Up = new Audio("assets/audio/smb_1-up.wav");
var audioWrong = new Audio("assets/audio/bosspain.wav");
var audioWin = new Audio("assets/audio/FF7_Victory_Fanfare.mp3");
var audioLose = new Audio("assets/audio/smb_mariodie.wav");

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
    instructionDisplay.innerText = "A Winner Is You!";
    statusDisplay.innerText = "Press any key to play again";
    winsDisplay.innerText = "Wins: " + wins;
}

function updateLosses() {
    lossesDisplay.innerText = "losses: " + losses;
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

function toggleMute() {
    mute = !mute;
    if (mute) {
        muteObject.innerText = "UNMUTE";
    }
    else {
        muteObject.innerText = "MUTE";
    }
}

function reset() {
    lettersGuessed = [];
    filledLetters = [];
    lives = 3;
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
                    if (!mute) {
                        audioWin.play();
                    }
                    updateWins();
                    reset();
                }
                else {
                    statusDisplay.innerText = "1-Up!";
                    if (!mute) {
                        audio1Up.play();
                    }
                }
            }
            else {
                lives--;
                updateLives();
                if (lives === 0) {
                    losses++;
                    if (!mute) {
                        audioLose.play();
                    }
                    updateLosses();
                    instructionDisplay.innerText = "Game Over";
                    statusDisplay.innerText = "Press any key to play again";
                    reset();
                }
                else {
                    statusDisplay.innerText = "Try Again!";
                    if (!mute) {
                        audioWrong.play();
                    }
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
var muteObject = document.querySelector("#mute");
console.log(muteObject);
muteObject.addEventListener("click", toggleMute);
console.log(mute);

