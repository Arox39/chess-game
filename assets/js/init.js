
const game = document.querySelector(".game")
const container = document.querySelector('.container')

let caseOccupied = (cases) => {
    // Fonction qui vérifie si chaque case passée en paramètre est occupée par une pièce

    // Pour chaque case, on vérifie si elle est occupée par une pièce blanche, noire ou libre
    cases.forEach(element => {
        // Si la case est occupée par une pièce blanche, on ajoute la classe "whiteOccupied" et on enlève les classes "blackOccupied" et "free"
        if (element.style.backgroundImage.includes('https://www.chess.com/chess-themes/pieces/neo/150/w')){
            element.classList.add('whiteOccupied')
            element.classList.remove('blackOccupied', 'free')

            // On appelle la fonction "colorCases" qui va colorer la case en fonction de son index et de sa classe
            colorCases(element)
        }
        
        // Si la case est occupée par une pièce noire, on ajoute la classe "blackOccupied" et on enlève les classes "whiteOccupied" et "free"
        else if (element.style.backgroundImage.includes('https://www.chess.com/chess-themes/pieces/neo/150/b')){
            element.classList.add('blackOccupied')
            element.classList.remove('whiteOccupied', 'free')

            // On appelle la fonction "colorCases" qui va colorer la case en fonction de son index et de sa classe
            colorCases(element)
        }
        
        // Si la case est libre, on ajoute la classe "free" et on enlève toutes les autres classes qui pourraient être présentes
        else{
            element.classList.add('free')
            element.classList.remove('whiteOccupied', 'blackOccupied', 'pawn', 'rook', 'knight', 'bishop', 'queen', 'king')
        }
    });
}   

let colorCases = (element) => {
    /**
    Cette fonction prend en paramètre un élément DOM représentant une case du jeu d'échecs,
    et attribue une classe CSS en fonction de la pièce qui occupe la case.
    @param {HTMLElement} element - L'élément DOM représentant la case à colorer.
    */
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
    /**
    La fonction initialization crée une grille d'échecs en générant des éléments div pour chaque
    case de la grille et en les plaçant dans des éléments de rangée (div également).
    Les cases sont coloriées avec une alternance de couleurs pour les cases noires et blanches.
    */
    const letter = ['a','b','c','d','e','f','g','h'] // les lettres pour les colonnes

    for (let row = 0; row < 8; row++) {
        let ligne = document.createElement('div') // création d'une div pour chaque ligne
        ligne.className = `row` // ajout de la classe 'row' à la div
        game.append(ligne) // ajout de la ligne à la div principale 'game'
        for (let col = 0; col < 8 ; col++) {
            let column = document.createElement('div') // création d'une div pour chaque case
            column.className = `cases _${row * 8 + col}` // ajout de la classe 'cases' avec le numéro correspondant à la case
            if ((row % 2 === 0 && col % 2 === 0) || (row % 2 != 0 && col % 2 != 0)){ // alternance des couleurs pour les cases
                column.style.backgroundColor = '#769656' // couleur vert foncé pour les cases de couleur
            }
            else{
                column.style.backgroundColor = '#eeeed2' // couleur crème pour les cases blanches
            }
            ligne.append(column) // ajout de la case à la ligne
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
    let cases = document.querySelectorAll('.cases')


    function listenerOccupiedElements() {
        wOccupied.forEach(elementOccupied => {
            elementOccupied.addEventListener('click', () => {
                if (elementOccupied.classList[2] !== 'free') {
                    selectedElement = elementOccupied
                    verification(selectedElement)
                    legalMove(selectedElement.classList[1], cases, 'white', selectedElement.classList[3])
                }
                let possibleMove = document.querySelectorAll('.possibleMove')
                elementTemp = []
                possibleMove.forEach(possibleElement => {
                    elementTemp.push(possibleElement)
                    possibleElement.addEventListener('click', possibleElementClickHandler)
                })
            })
        })
    }
    function possibleElementClickHandler() {
        let possibleMove = document.querySelectorAll('.possibleMoves')
        // on retire le listener de la case qu'on vient de bouger, pour revenir en haut de la
        // fonction
        elementTemp.forEach(tempElement => {
            tempElement.removeEventListener('click', possibleElementClickHandler)
        })

        // le deplacement de la piece
        this.style.backgroundImage = selectedElement.style.backgroundImage
        selectedElement.style.backgroundImage = ''
        // enlevage des possibles mouvements
        cases.forEach(element => {
            element.classList.remove('possibleMove')
       })
        // redetectage des cases libres et occuper
        cases = document.querySelectorAll('.cases')
        caseOccupied(cases)
        wOccupied = document.querySelectorAll('.whiteOccupied')
        possibleMove = document.querySelectorAll('.possibleMove')
        listenerOccupiedElements()
    }
    let selectedElement = null
    let elementTemp = []
    listenerOccupiedElements()
}

let verification = (element) => {
    // permet de regler le bug de quand un pion arrive sur la 7eme ligne whiteOccupied et pawn sont 
    // inverser 
    if (element.classList[2] !== 'free'){
        if (element.classList[3] !== 'pawn'){
            element.classList.remove('pawn')
            element.classList.add('pawn')
        }
    }
}


let caseeToRowCol = (casee) => {
    casee = casee.substr(1)
    let row = Math.floor(casee/8)
    let col = casee - row * 8

    // on met row et col a indice 'humain' (1ere ligne = 1 pas 0)
    row++
    col++
    return {row, col}
}

let rowColToCasee = (row, col) =>{
    let casee = ( row - 1 ) * 8 + col - 1
    return `_${casee}` 
}

let possibleMoveForWhitePawns = (casee, cases) => {
       // enlevage des possibles mouvements
       cases.forEach(element => {
        element.classList.remove('possibleMove')
    })
    let select = (casee) => document.querySelector(`.${casee}`)
    let { row, col } = caseeToRowCol(casee)
    let moves = []
    if(select(rowColToCasee(row + 1, col)).classList[2] === 'free'){
        moves.push([rowColToCasee(row + 1, col)])
        select(rowColToCasee(row + 1, col)).classList.add('possibleMove')
    }
    if(row === 2 && select(rowColToCasee(row + 2, col)).classList[2] === 'free'){
        moves.push([rowColToCasee(row + 2, col)])
        select(rowColToCasee(row + 2, col)).classList.add('possibleMove')
    }
    if(col !== 0 && select(rowColToCasee(row + 1, col - 1)).classList[2] === 'blackOccupied'){
        moves.push([rowColToCasee(row + 1, col - 1)])
        select(rowColToCasee(row + 1, col - 1)).classList.add('possibleMove')
    }
    if(col !== 9 && select(rowColToCasee(row + 1, col + 1)).classList[2] === 'blackOccupied'){
        moves.push([rowColToCasee(row + 1, col + 1)])
        select(rowColToCasee(row + 1, col + 1)).classList.add('possibleMove')
    }
    return moves
}



initalization()
move('white')

// let legalMove = (element) => {
//     let free = document.querySelectorAll('.free')
//     let cases = document.querySelectorAll('.cases')

//     casesPos = cases.classList[1]

//     white = element.classList[2] === 'whiteOccupied'
//     black = element.classList[2] === 'blackOccupied'

//     pawn = element.classList[3] === 'pawn'
//     rook = element.classList[3] === 'rook'
//     knight = element.classList[3] === 'knight'
//     bishop = element.classList[3] === 'bishop'
//     queen = element.classList[3] === 'queen'
//     king = element.classList[3] === 'king'


//     if(white && pawn){

//     }
// }
