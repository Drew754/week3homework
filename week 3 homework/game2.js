var masterWordList =  
    [
        "faith",   
        "sacrifice",
        "heresy",
        "inquisition",
        "xenos",
        "chaos",
        "daemons",
        "purge",
        "unclean",
        "emperor",
        "loyalty",
        "purity",
        "cleanse",
        "fire",
        ];

const totalMaxTries = 10;  
const space = "space";
 



var hangmanGame = {
    wordList: masterWordList,       
    guessingWord: [],                   
    guessedLetters: [],             
    currentWord: "",                
    lastWordIdx: -1,                 
    wins: 0,                        
    maxTries: totalMaxTries,        
    remainingGuesses: 0,           
    hasFinished: true,              
    resetGame: function () {
        var idx = -1;
        do  {
            idx = Math.floor(Math.random() * this.wordList.length);
        } while(idx === this.lastWordIdx)
        
        this.currentWord = this.wordList[idx];
        this.lastWordIdx = idx;
        
        this.guessingWord = [];
        this.guessedLetters = [];

        this.remainingGuesses = this.maxTries;

        this.hasFinished = false;

        document.getElementById("hangmanImage").src = "";
        
        var len = this.currentWord.length;
        for (var i = 0; i < len; i++) {
            
            if(this.currentWord[i] === " ") {
                this.guessingWord.push(space);
            } else {
                this.guessingWord.push("_");
            }
        }

        document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
        document.getElementById("gameover-image").style.cssText = "display: none";
        document.getElementById("youwin-image").style.cssText = "display: none";

        this.updateDisplay();
    },
    updateDisplay: function () {
        document.getElementById("totalWins").innerText = this.wins;
        var tempWord = "";
        for (var i = 0; i < this.guessingWord.length; i++) {
            if(this.guessingWord[i] === space) {
                tempWord += "&nbsp;";
            } else {
                tempWord += this.guessingWord[i];
            }
        }
        document.getElementById("currentWord").innerHTML = tempWord;
        document.getElementById("remainingGuesses").innerText = this.remainingGuesses;
        document.getElementById("guessedLetters").innerText = this.guessedLetters;
    },
    updateHangmanImage: function () {
        document.getElementById("hangmanImage").src = "assets/images/" + (this.maxTries - this.remainingGuesses) + ".png";
    },
    makeGuess: function (letter) {
        if (this.remainingGuesses > 0) {
            if (this.guessedLetters.indexOf(letter) === -1) {
                this.guessedLetters.push(letter);
               
                this.evaluateGuess(letter);
            } 
        }
        this.checkWinLose();
        this.updateDisplay();
    },
    evaluateGuess: function (letter) {
        
        var positions = [];

        
        for (var i = 0; i < this.currentWord.length; i++) {
            if (this.currentWord[i] === letter) {
                positions.push(i);
            }
        }

        
        if (positions.length <= 0) {
            this.remainingGuesses--;
            this.updateHangmanImage();
        } else {
            
            for (var i = 0; i < positions.length; i++) {
                this.guessingWord[positions[i]] = letter;
            }
        }
    },
    
    checkWinLose: function () {
        if (this.guessingWord.indexOf("_") === -1) {
            document.getElementById("youwin-image").style.cssText = "display: block";
            document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
            n
            this.wins++;
           
                      
            this.hasFinished = true;
            return;
        }
        if (this.remainingGuesses <= 0) {
            document.getElementById("gameover-image").style.cssText = "display: block";
            document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
            this.hasFinished = true;
            return;
        }
    },
};


function isLetter(keyCode) {
    return (keyCode >= 65 && keyCode <= 90);
}


document.onkeydown = function (event) {
  
    if (hangmanGame.hasFinished) {
        hangmanGame.resetGame();
        hangmanGame.hasFinished = false;
    } else {
       
        if (isLetter(event.keyCode)) {
            hangmanGame.makeGuess(event.key.toUpperCase());
        } 
    }
};
