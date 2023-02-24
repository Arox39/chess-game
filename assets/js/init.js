
const game = document.querySelector(".game")
const container = document.querySelector('.container')

let caseOccupied = (cases) => {
    cases.forEach(element => {
        if (element.style.backgroundImage.includes('https://www.chess.com/chess-themes/pieces/neo/150/w')){
            element.classList.add('whiteOccupied')
            element.classList.remove('blackOccupied', 'free')
            colorCases(element)
        }
        else if (element.style.backgroundImage.includes('https://www.chess.com/chess-themes/pieces/neo/150/b')){
            element.classList.add('blackOccupied')
            element.classList.remove('whiteOccupied', 'free')
            colorCases(element)
        }
        else{
            element.classList.add('free')
            element.classList.remove('whiteOccupied', 'blackOccupied', 'pawn', 'rook', 'knight', 'bishop', 'queen', 'king')
        }
    });

    
}

let colorCases = (element) => {
    let bgImg = element.style.backgroundImage
    if(bgImg.includes(white.pawn) || bgImg.includes(black.pawn)){
        element.classList.add('pawn')
        element.classList.remove('rook', 'knight', 'bishop', 'queen', 'king')
    }
    else if(bgImg.includes(white.rook) || bgImg.includes(black.rook)){
        element.classList.add('rook')
        element.classList.remove('pawn', 'knight', 'bishop', 'queen', 'king')
    }
    else if(bgImg.includes(white.knight) || bgImg.includes(black.knight)){
        element.classList.add('knight')
        element.classList.remove('pawn', 'rook', 'bishop', 'queen', 'king')
    }
    else if(bgImg.includes(white.bishop) || bgImg.includes(black.bishop)){
        element.classList.add('bishop')
        element.classList.remove('pawn', 'rook', 'knight', 'queen', 'king')
    }
    else if(bgImg.includes(white.queen) || bgImg.includes(black.queen)){
        element.classList.add('queen')
        element.classList.remove('pawn', 'rook', 'knight', 'bishop', 'king')
    }
    else if(bgImg.includes(white.king) || bgImg.includes(black.king)){
        element.classList.add('king')
        element.classList.remove('pawn', 'rook', 'knight', 'bishop', 'queen')
    }
    

}
let initalization = () => {
    const letter = ['a','b','c','d','e','f','g','h']
    
    for (let row = 0; row < 8; row++) {
        let ligne = document.createElement('div')
        ligne.className = `row`
        game.append(ligne)
        for (let col = 0; col < 8 ; col++) {
            let column = document.createElement('div')
            console.log(row, col);
            column.className = `cases _${row * 8 + col}`
            if ((row % 2 === 0 && col % 2 === 0) || (row % 2 != 0 && col % 2 != 0)){
                column.style.backgroundColor = '#769656'
            }
            else{
                column.style.backgroundColor = '#eeeed2'
            }
            ligne.append(column)
        }
    }
    
    container.append(game)

    // Positionnement des pieces de bases
    let cases = document.querySelectorAll('.cases');
    let imagesW = [white.rook, white.bishop, white.knight, white.queen, white.king,
    white.bishop, white.knight, white.rook];
    let imagesB = [black.rook, black.bishop, black.knight, black.king, black.queen, 
    black.bishop, black.knight, black.rook];
    for (let i = 0; i < 8; i++) {
        cases[i].style.backgroundImage = `url(${imagesW[i]})`;
        cases[63 - i].style.backgroundImage = `url(${imagesB[i]})`;
    }
    for (let i = 0; i< 8; i++){
        cases[8+i].style.backgroundImage = `url(${white.pawn})`
        cases[63 - 8 - i].style.backgroundImage = `url(${black.pawn})`
    }

    caseOccupied(cases)

}





let move = (color) => {

    let wOccupied = document.querySelectorAll('.whiteOccupied')
    let bOccupied = document.querySelectorAll('.blackOccupied')
    let cases = document.querySelectorAll('.cases')
    let free = document.querySelectorAll('.free')

    function listenerOccupiedElements() {
        wOccupied.forEach(elementOccupied => {
            elementOccupied.addEventListener('click', () => {
                if (elementOccupied.classList[2] !== 'free') {
                    selectedElement = elementOccupied
                }
                free.forEach(freeElement => {
                    freeElement.addEventListener('click', freeElementClickHandler)
                })
            })
        })
    }
    function freeElementClickHandler() {
        free.forEach(freeElement => {
            freeElement.removeEventListener('click', freeElementClickHandler)
        })
        this.style.backgroundImage = selectedElement.style.backgroundImage
        selectedElement.style.backgroundImage = ''
        // redetectage des cases libres et occuper
        cases = document.querySelectorAll('.cases')
        caseOccupied(cases)
        wOccupied = document.querySelectorAll('.whiteOccupied')
        free = document.querySelectorAll('.free')
        listenerOccupiedElements()
    }
    let selectedElement = null

    listenerOccupiedElements()
}

let legalMove = (element) => {
    let free = document.querySelectorAll('.free')
    let cases = document.querySelectorAll('.cases')

    casesPos = cases.classList[1]

    white = element.classList[2] === 'whiteOccupied'
    black = element.classList[2] === 'blackOccupied'

    pawn = element.classList[3] === 'pawn'
    rook = element.classList[3] === 'rook'
    knight = element.classList[3] === 'knight'
    bishop = element.classList[3] === 'bishop'
    queen = element.classList[3] === 'queen'
    king = element.classList[3] === 'king'


    if(white && pawn){

    }
}


initalization()
move('white')



