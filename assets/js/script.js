let numberOfCards;
let i;
let allCards = document.querySelectorAll(".card");
let frontImage;
let backImage;
let firstSelected = null;
let secondSelected = null;
let numberOfMoves = 0;
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
let randomGifs = [];
let numberOfCheckedCards = 0;


function comparer() { 
	return Math.random() - 0.5; 
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

function startGame() {
    allGifs.sort(comparer);
    for (i = 0; i < numberOfCards; i++) {
        allCards[i].classList.remove("display-none")
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

function showCard(element) {
    frontImage = element.querySelector('[data-identifier="front-face"]');
    backImage = element.querySelector('[data-identifier="back-face"]');

    if (frontImage.classList.contains("display-none") === true) {
        // TODO: Implement 3D animation for flipping cards
        backImage.classList.toggle("rotate-back");
        setTimeout(function() {backImage.classList.toggle("display-none");}, 500)
        setTimeout(function() {frontImage.classList.toggle("rotate-front");}, 501)
        setTimeout(function() {frontImage.classList.toggle("display-none");}, 500)
        
        // frontImage.classList.toggle("display-none");
        numberOfMoves++;
    }
    else {
        backImage.classList.toggle("rotate-back");
        frontImage.classList.toggle("rotate-front");

        return false;
    }

    if (firstSelected == null) {
        firstSelected = frontImage;
    }
    else {
        secondSelected = frontImage;
    }

    if (firstSelected != null && secondSelected != null) {
        // setTimeout(hideCards, 1000);
        hideCards()
        // #TODO: Fix asyncronous bug when user clicks too fast different cards
    }
    console.log(numberOfCheckedCards)

    if (numberOfCheckedCards === numberOfCards) {
        endGame();
    }
}

function hideCards() {
    if (firstSelected.getAttribute("src") != secondSelected.getAttribute("src")) {
        firstSelected.classList.toggle("display-none");
        firstSelected.parentNode.querySelector('[data-identifier="back-face"]').classList.toggle("display-none");
        secondSelected.classList.toggle("display-none");
        secondSelected.parentNode.querySelector('[data-identifier="back-face"]').classList.toggle("display-none");
    }
    else {
        firstSelected.classList.add("checked");
        secondSelected.classList.add("checked");
        numberOfCheckedCards += 2;
    }

    firstSelected = null;
    secondSelected = null;
}

function endGame() {
    alert(`Você ganhou em ${numberOfMoves} jogadas!`);
}

receiveNumberOfCards();
startGame();