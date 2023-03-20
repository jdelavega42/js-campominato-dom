const difficultyInput = document.getElementById('difficulty')
const play = document.getElementById('play');
const container = document.querySelector('.container');
let bombArray = [];
let winCounter = [];
play.addEventListener("click", function(){
    play.classList.add('d-none');
    const difficulty = difficultyInput.value;
    const gridValues = gridValuesGenerator(difficulty);
    const boxNumber = gridValues[0];
    const boxColumn = gridValues[1];
    const bombNumber = 16;
    container.innerHTML= '';
    gridGenerator(boxNumber, boxColumn);
    const bombArray = bombArrayGenerator(boxNumber, bombNumber)
    winCondition = boxNumber - bombArray.length;
    addFunctionToQuerySelectorAll('div.box', handleDivClick);
})

// !FUNCTIONS
// #@general
function gridValuesGenerator(anyMode){
    const modeArray = [];
    let boxNumber = '';
    let boxColumn = '';
        if (anyMode === 'easy'){
            boxNumber = 100;
            boxColumn = "column10";
    } else if ( anyMode === 'medium'){
        boxNumber = 81;
        boxColumn = "column9"
    } else if (anyMode === 'hard'){
        boxNumber = 49;
        boxColumn = "column7"
    }
    modeArray.push(boxNumber, boxColumn)
    return modeArray;
}

function gridGenerator (generalNumber, generalColumn){
    for (let i = 1; i <= generalNumber; i++){
        const grid = gridBoxGenerator(i, generalColumn)
        container.append(grid);
    }
}

function gridBoxGenerator(generalContent, generalColumn){
    const item = document.createElement("div");
    const itemContent = document.createElement("span");
    const content = generalContent;
    item.classList.add("box", generalColumn);
    item.appendChild(itemContent);
    itemContent.innerText = content;
    return item;    
}

function bombArrayGenerator (generalNumber, generalBomb){
    bombArray = [];
    while( bombArray.length < generalBomb){
        let rndNumber = getRandomIntInclusive(1, generalNumber)
        if (!bombArray.includes(rndNumber)){
            bombArray.push(rndNumber);
        }
    }
 return bombArray;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1))
} 
// @dom related function
function handleDivClick(){
    let clicked = parseInt(this.textContent)
    if (bombArray.includes(parseInt(this.textContent))){
        for (let i = 0; i < bombArray.length; i++){
            bombArray[i];
            bombSelector = bombArray[i];
        }
        console.log(this);
        this.classList.add("red");
        play.classList.remove("d-none");
        play.innerHTML = `<span>Hai perso! Clicca per rigiocare</span>`;
    } else {
        this.classList.add("azure");
    }
    if(!winCounter.includes(clicked)){
        winCounter.push(clicked);
    }
    if (winCondition === winCounter.length){
        play.innerHTML = `<span>Complimenti, hai vinto! Clicca per rigiocare</span>`;
    }
}

function addFunctionToQuerySelectorAll(genericElement, genericFunction){
    const elementArray = document.querySelectorAll(genericElement);
    for (i = 0; i < elementArray.length; i++){
        const currentElement = elementArray[i];
        currentElement.addEventListener("click", genericFunction)
    }
}