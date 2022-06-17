let numberOfCards;
let i;
let allCards = document.querySelectorAll(".card");
let frontImage;
let backImage;
let firstSelected = null;
let secondSelected = null;
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

function startGame() {
    receiveNumberOfCards();
    numberOfMoves = 0;
    numberOfCheckedCards = 0;
    randomGifs = [];
    
    allGifs.sort(comparer);
    for (i = 0; i < numberOfCards; i++) {
        allCards[i].classList.remove("display-none");
        if (i%2 == 0) {
            randomGifs.push(allGifs[i/2]);
            randomGifs.push(allGifs[i/2]);
        }
    }

    randomGifs.sort(comparer);

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
    if (backImage.parentNode.style.transform !== "rotateY(-180deg)") {
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
        setTimeout(hideCards, 1000);
        // #TODO: Fix asyncronous bug when user clicks too fast different cards
    }
}

function hideCards() {
    if (firstSelected.getAttribute("src") != secondSelected.getAttribute("src")) {
        firstSelected.parentNode.style.transform = "rotateY(0deg)";
        backImage.parentNode.style.transform = "rotateY(0deg)";
    }
    else {
        firstSelected.classList.add("checked");
        secondSelected.classList.add("checked");
        numberOfCheckedCards += 2;
    }

    firstSelected = null;
    secondSelected = null;

    if (numberOfCheckedCards === numberOfCards) {
        endGame();
    }
}

function endGame() {
    alert(`Você ganhou em ${numberOfMoves} jogadas!`);
    // restartGame();  
}

function restartGame() {
    playAgain = prompt("Você quer jogar novamente?");
    if (playAgain === "sim") {
        for (i = 0; i < numberOfCards; i++) {
            allCards[i].classList.add("display-none");
        }
        startGame();
    }
}

startGame();