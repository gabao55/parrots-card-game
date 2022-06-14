let numberOfCards;
let i;
let allCards = document.querySelectorAll(".card");
let frontImage;
let backImage;
let firstSelected = null;
let secondSelected = null;
let numberOfMoves = 0;

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

function startGame() {
    for (i = 0; i < numberOfCards; i++) {
        allCards[i].classList.remove("display-none")
    }
}

function showCard(element) {
    frontImage = element.querySelector('[data-identifier="front-face"]');
    backImage = element.querySelector('[data-identifier="back-face"]');

    if (frontImage.classList.contains("display-none") === true) {
        frontImage.classList.toggle("display-none");
        backImage.classList.toggle("display-none");
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
    }
}

function stop() {
    return true;
}

function hideCards() {
    if (firstSelected.getAttribute("src") != secondSelected.getAttribute("src")) {
        firstSelected.classList.toggle("display-none");
        firstSelected.parentNode.querySelector('[data-identifier="back-face"]').classList.toggle("display-none");
        secondSelected.classList.toggle("display-none");
        secondSelected.parentNode.querySelector('[data-identifier="back-face"]').classList.toggle("display-none");
    
    }

    firstSelected = null;
    secondSelected = null;
}

receiveNumberOfCards();
startGame();