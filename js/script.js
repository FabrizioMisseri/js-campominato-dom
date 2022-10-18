// **Consegna**
// Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.


// inizializzo l' array vuoto
let array = [];
let arrayBomb = [];
let flag = false;
let cellCatched = 0;
let winnerCounter = 0;

// seleziono il container, le differenti modalità di difficoltà, e il btn di start-play
const container = document.querySelector(".container");
const diffMode = document.getElementById("difficulty-mode");
const playBtn = document.getElementById("play-btn");

// Aggiungo effetto al click del bottone start-play; con un IF-composto riesco a generare differenti tabelloni in base alla difficoltà
// BUTTON PLAY
playBtn.addEventListener("click", function() {

    cleanGame(container);

    // genero l' array contenente le bombe
    arrayBomb = generateBombs(16);
    console.log(arrayBomb);

    playBtn.innerHTML = "RESTART";

    if (diffMode.value === "easy") {
        array = scoreBoard(100);
        winnerCounter = 84;
    } else if (diffMode.value === "normal") {
        array = scoreBoard(81);
        winnerCounter = 65;
    } else if (diffMode.value === "hard") {
        array = scoreBoard(49);
        winnerCounter = 33;
    }

})


// FUNCTIONS

/** SCOREBOARD
 * Description: genera un tabellone pieno di carte
 * @param {number} num numero di carte da inserire
 * @returns {object} container pieno
 */
function scoreBoard(num) {
    for (let i = 1; i <= num; i++) {
        const card = cardGenerator(i);
        container.append(card);
        card.addEventListener("click", clickAction);
    }
}


/** CARD GENERATOR
 * Description: genera una carta con tutte le features connesse
 * @param {number} numIndex
 * @returns {object} ritorna la carta
 */
function cardGenerator(numIndex) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("white");
    card.setAttribute("id", numIndex);

    if (diffMode.value === "easy") {
        card.classList.add("X10");
    } else if (diffMode.value === "normal") {
        card.classList.add("X9");
    } else if (diffMode.value === "hard") {
        card.classList.add("X7");
    }

    card.innerHTML = `${numIndex}`;
    return card;
}


/** CLICK ACTIONS
 * Description: genera una serie di eventi al click del mouse, scopre IF bomba
 * @param {} 
 * @returns {} :colora il quadrato selezionato di verde o rosso e mostra il num casella in console
 */
function clickAction() {
    
    if (flag === false) {

        const num = parseInt(this.textContent);
        console.log(num);
        if (arrayBomb.includes(num)) {
    
            for (let i = 0; i < arrayBomb.length; i++){
                let numBomb = arrayBomb[i];
                let bomb = document.getElementById(`${numBomb}`)
                bomb.classList.add("bg-red");
            }
    
            alert("you lose");
            alert(`you catch ${cellCatched} cell`);
    
            flag = true;
            
        } else {
            this.classList.add("bg-green");
            cellCatched++
            winnerCondition(cellCatched);
        }
    } 


}


/** CLEAN GAME
 * Description: ripulisce la schermata di gioco
 * @param {html-element} board è il container
 * @returns {}
 */
function cleanGame(board) {
    board.innerHTML = ("");
    flag = false;
    cellCatched = 0;
}



/** GENERATE BOMBS
 * Description: funzione che genera X bombe
 * @param {number} num numero selezionabile di bombe
 * @returns {object} :ritorna array contenente le bombe
 */
function generateBombs(num) {

    const array = [];

    for (let i = 1; i <= num; i++) {
        let rndNumber = rndNumbers(1, 100);

        while (array.includes(rndNumber)) {
            rndNumber = rndNumbers(1, 100);
        }

        array.push(rndNumber);
    }

    return array;
}




/** RANDOM NUMBERS
 * Description: genera numeri randomici in un intorno MIN - MAX
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function rndNumbers(min, max) {
    const rndNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return rndNumber;
}



function winnerCondition(counter) {
    if(counter === winnerCounter) {
        alert("you win");
        flag = true;
    }
}