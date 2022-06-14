let numberOfCards;
let numberOfInsertedCards = 0;
let cardNode = document.createElement("div.card");
cardNode.classList.add("card")
cardNode.innerHTML = '<img src="assets/img/front.png" alt="" />';

function receiveNumberOfCards() {
    numberOfCards = Number(prompt("Com quantas cartas quer jogar (de 4 a 14)?"));
    if (numberOfCards < 4) {
        alert("O número mínimo de cartas é 4!");
        startGame();
    }
    else if (numberOfCards > 14) {
        alert("O número máximo de cartas é 14!");
        startGame();
    }
    else if (numberOfCards%2 != 0) {
        alert("Você deve inserir um número par para jogar!");
        startGame();
    }
}

function startGame() {
    while (numberOfInsertedCards < numberOfCards) {
        document.querySelector(".cards").appendChild(cardNode.cloneNode(true));
        numberOfInsertedCards++;
        startGame();
    }
}

receiveNumberOfCards();

startGame();