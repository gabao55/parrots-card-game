let numberOfCards

function startGame() {
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

startGame();
