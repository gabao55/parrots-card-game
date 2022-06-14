let numberOfCards;
let i;
let allCards = document.querySelectorAll(".card");

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
        console.log(allCards[i])
        allCards[i].classList.remove("display-none")
    }
}

receiveNumberOfCards();
startGame();