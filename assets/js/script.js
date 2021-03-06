let numberOfCards;
let i;
let cardsContainer = document.querySelector(".cards");
let frontImage;
let backImage;
let firstSelected = null;
let secondSelected = null;
let isLoading = false;
let numberOfMoves;
let allGifs = [
    "bobrossparrot",
    "explodyparrot",
    "fiestaparrot",
    "metalparrot",
    "revertitparrot",
    "tripletsparrot",
    "unicornparrot"
]
let gif;
let randomGifs;
let numberOfCheckedCards;
let playAgain;
let cardTemplate = `
    <div class="card" data-identifier="card" onclick="showCard(this);">
        <img src="assets/img/front.png" 
        data-identifier="back-face" alt="" />
        <img src="" 
        data-identifier="front-face" alt="" class=""/>
    </div>
`;

let timer = document.querySelector(".timer");
let time;

function refreshTime() {
    timer.innerHTML = time;
    time++;
}

function startGame() {
    receiveNumberOfCards();
    time = 0;
    numberOfMoves = 0;
    numberOfCheckedCards = 0;
    randomGifs = [];
    cardsContainer.innerHTML = '';
    
    allGifs.sort(comparer);
    for (i = 0; i < numberOfCards; i++) {
        cardsContainer.innerHTML += cardTemplate;
        if (i%2 == 0) {
            randomGifs.push(allGifs[i/2]);
            randomGifs.push(allGifs[i/2]);
        }
    }

    randomGifs.sort(comparer);
    let allCards = document.querySelectorAll(".card");

    for (i = 0; i < numberOfCards; i++) {
        gif = `assets/img/${randomGifs[i]}.gif`;
        allCards[i].querySelector('[data-identifier="front-face"]').setAttribute("src", gif);
    }
}

function receiveNumberOfCards() {
    numberOfCards = Number(prompt("Com quantas cartas quer jogar (de 4 a 14 e par)?"));

    if (numberOfCards == 0) {
        alert("Você deve inserir um número par para jogar!");
        receiveNumberOfCards();
    }
    else if (numberOfCards < 4) {
        alert("O número mínimo de cartas é 4!");
        receiveNumberOfCards();
    }
    else if (numberOfCards > 14) {
        alert("O número máximo de cartas é 14!");
        receiveNumberOfCards();
    }
    else if (numberOfCards%2 != 0) {
        alert("Você deve inserir um número par para jogar!");
        receiveNumberOfCards();
    }
}

function comparer() { 
	return Math.random() - 0.5; 
}

function showCard(element) {
    frontImage = element.querySelector('[data-identifier="front-face"]');
    backImage = element.querySelector('[data-identifier="back-face"]');
    if (backImage.parentNode.style.transform !== "rotateY(-180deg)"
    && isLoading === false) {
        backImage.parentNode.style.transform = "rotateY(-180deg)";

        numberOfMoves++;
    }
    else {
        return false;
    }

    if (firstSelected == null) {
        firstSelected = frontImage;
    }
    else {
        secondSelected = frontImage;
    }

    if (firstSelected != null && secondSelected != null) {
        isLoading = true;
        if (firstSelected.getAttribute("src") != secondSelected.getAttribute("src")) {
            setTimeout(hideCards, 1000);
        }
        else {
            numberOfCheckedCards += 2;

            firstSelected = null;
            secondSelected = null;

            isLoading = false;

            if (numberOfCheckedCards === numberOfCards) {
                setTimeout(endGame, 500);
            }
        }
    }
}

function hideCards() {
    firstSelected.parentNode.style.transform = "rotateY(0deg)";
    secondSelected.parentNode.style.transform = "rotateY(0deg)";

    firstSelected = null;
    secondSelected = null;

    isLoading = false;
}

function endGame() {
    alert(`Você ganhou em ${numberOfMoves} jogadas e ${time - 1} segundos!`);
    restartGame();
}

function restartGame() {
    playAgain = prompt("Você quer jogar novamente?");
    if (playAgain === "sim") {
        startGame();
    }
    else if (playAgain !== "não") {
        alert("Por favor, responda sim ou não.");
        restartGame();
    }
    else {
        clearInterval(interval);
    }
}

startGame();
let interval = setInterval(refreshTime, 1000);