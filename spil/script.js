// Starter et tilfældigt nummer mellem 1 og 20
let secretNumber = Math.floor(Math.random() * 20) + 1;

// Starter score ved 0 og highscore ved uendelig (vi vil opdatere den senere)
let score = 0;
let highscore = Infinity;

// Tomt array til at gemme alle gæt, spilleren laver
let guesses = [];

// Fanger alle nødvendige elementer fra HTML, som vi vil manipulere
const guessInput = document.querySelector('.guess'); // inputfeltet for gæt
const checkButton = document.querySelector('.check'); // knap til at tjekke gæt
const againButton = document.querySelector('.again'); // knap til at starte spillet igen
const messageDisplay = document.querySelector('.message'); // viser beskeder til brugeren
const scoreDisplay = document.querySelector('.score'); // viser nuværende score
const highscoreDisplay = document.querySelector('.highscore'); // viser highscore
const numberDisplay = document.querySelector('.number'); // viser det hemmelige nummer, når det er korrekt
const body = document.querySelector('body'); // vi ændrer baggrundsfarve på body ved korrekt gæt

// Funktion til at vise beskeder til brugeren
const displayMessage = function (message) {
    messageDisplay.textContent = message; // ændrer tekstindholdet for besked
};

// Funktion til at opdatere og vise tidligere gæt
const updateGuessHistory = function (guess) {
    guesses.push(guess); // tilføjer gæt til guesses array
    messageDisplay.textContent = `Guesses so far: ${guesses.join(', ')}`; // viser gæt som en liste af tal
};

// Når brugeren klikker på "Check!" knappen
checkButton.addEventListener('click', function () {
    const userGuess = Number(guessInput.value); // henter brugens gæt fra inputfeltet og gør det til et tal

    // Tjek om brugeren har skrevet et gyldigt tal (mellem 1 og 20)
    if (!userGuess || userGuess < 1 || userGuess > 20) {
        displayMessage('⛔️ Enter a valid number between 1 and 20!'); // viser en fejlbesked hvis tallet er ugyldigt
        return; // stopper funktionen, hvis input er ugyldigt
    }

    // Opdater gæt-historikken med det nye gæt
    updateGuessHistory(userGuess);

    // Tjek om gættet er korrekt
    if (userGuess === secretNumber) {
        displayMessage('🎉 Correct Number!'); // viser korrekt besked
        numberDisplay.textContent = secretNumber; // viser det hemmelige nummer i UI
        body.style.backgroundColor = '#60b347'; // ændrer baggrundsfarven til grøn, når der gættes korrekt

        // Opdater highscoren, hvis scoren er lavere (bedre) end tidligere highscore
        if (score < highscore) {
            highscore = score;
            highscoreDisplay.textContent = highscore; // viser ny highscore
        }

        // Rydder inputfeltet
        guessInput.value = '';
        confetti(); // Laver konfetti ved korrekt gæt

    } else {
        // Hvis gættet er forkert
        score++; // øger scoren med 1
        scoreDisplay.textContent = score; // opdaterer score i UI
        guessInput.value = ''; // rydder inputfeltet

        // Giv feedback om gættet var for højt eller for lavt
        displayMessage(userGuess > secretNumber ? '📈 Too high!' : '📉 Too low!');
    }
});

// Når brugeren klikker på "Again" knappen for at starte spillet igen
againButton.addEventListener('click', function () {
    score = 0; // nulstil score
    guesses = []; // nulstil gæt-historik
    secretNumber = Math.floor(Math.random() * 20) + 1; // generer et nyt hemmeligt nummer

    // Opdaterer UI for at starte forfra
    scoreDisplay.textContent = score; // viser nulstillet score
    numberDisplay.textContent = '?'; // viser spørgsmåls-tegn igen
    displayMessage('Start guessing...'); // nulstil besked til brugeren
    guessInput.value = ''; // rydder inputfeltet

    // Nulstil baggrundsfarve og gæt-historik
    body.style.backgroundColor = '#222'; // sætter baggrundsfarven tilbage til original
});

// Funktion der laver konfetti ved korrekt gæt (ekstra funktion)
function confetti() {
    const confettiCount = 5; // antallet af konfetti partikler
    const defaults = {
        spread: 360, // hvordan konfettien spredes ud
        ticks: 60, // hvor længe konfettien flyver
        gravity: 0.5, // hvor hurtigt konfettien falder
        decay: 0.9, // hvordan konfettien forsvinder
        startVelocity: 30, // start hastighed
        shapes: ['square', 'circle'], // form af konfetti
        colors: ['#bb0000', '#ffffff'], // farver på konfetti
    };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min; // laver tilfældig værdi mellem to tal
    }

    confetti({
        particleCount: confettiCount,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: {y: 0.6}, // starter lidt under toppen af siden
        colors: ['#bb0000', '#ffffff'], // konfettiens farver
    });
}