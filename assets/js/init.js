
const game = document.querySelector(".game")
const container = document.querySelector('.container')

let caseOccupied = (cases) => {
    cases.forEach(element => {
        if (element.style.backgroundImage.includes('https://www.chess.com/chess-themes/pieces/neo/150/w')){
            element.classList.add('whiteOccupied')
            element.classList.remove('blackOccupied', 'free')
        }
        else if (element.style.backgroundImage.includes('https://www.chess.com/chess-themes/pieces/neo/150/b')){
            element.classList.add('blackOccupied')
            element.classList.remove('whiteOccupied', 'free')
        }
        else{
            element.classList.add('free')
            element.classList.remove('whiteOccupied', 'blackOccupied')
        }
    });
}


let initalization = () => {
    const letter = ['a','b','c','d','e','f','g','h']
    
    for (let index = 0; index < 8; index++) {
        let row = document.createElement('div')
        row.className = `row`
        game.append(row)
        for (let i = 0; i < 8 ; i++) {
            let column = document.createElement('div')
            if ((index % 2 === 0 && i % 2 === 0) || (index % 2 != 0 && i % 2 != 0)){
                column.className = `cases _${index + 1}${i + 1}`
                column.style.backgroundColor = '#769656'
            }
            else{
                column.className = `cases _${index + 1}${i + 1}`
                column.style.backgroundColor = '#eeeed2'
            }
            row.append(column)
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



let move = (start, end) => {
    end.style.backgroundImage = start.style.backgroundImage
    start.style.backgroundImage = ''

    // redetectage des cases libres et occupe
    let cases = document.querySelectorAll('.cases')
    caseOccupied(cases)
}

let foo = (color) => {

    let wOccupied = document.querySelectorAll('.whiteOccupied')
    let bOccupied = document.querySelectorAll('.blackOccupied')
    let cases = document.querySelectorAll('.cases')
    let free = document.querySelectorAll('.free')

    function listenerOccupiedElements() {
        wOccupied.forEach(elementOccupied => {
            elementOccupied.addEventListener('click', () => {
                console.log('dd', elementOccupied);
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
        move(selectedElement, this)
        console.log('move');
        wOccupied = document.querySelectorAll('.whiteOccupied')
        free = document.querySelectorAll('.free')
        console.log('ici');
        listenerOccupiedElements()
    }
    let selectedElement = null

    listenerOccupiedElements()
}


initalization()
foo('white')




// let move = () => {
//     let cases = document.querySelectorAll('.cases')

    
//     let occupied = document.querySelectorAll('.occupied')
//     let compteur = 0
//     let compteur2 = 0
//     let start;
//     let target;

        
//     occupied.forEach(occupiedElement => {
//         occupiedElement.addEventListener('click', () => {
//             cases = document.querySelectorAll('.cases')
//             caseOccupied(cases)
//             if (compteur != 1) {
//                 compteur2 = 0
//                 start = occupiedElement
//                 compteur = 1
//                 console.log('hey');
//                 cases.forEach(element =>{
//                     element.addEventListener('click',() => {
//                         if (compteur2 != 1 && element.classList[3] == 'free'){
//                             console.log('salut', compteur, compteur2);
//                             target = element
//                             compteur2 = 1
//                             compteur = 0
//                             target.style.backgroundImage = start.style.backgroundImage
//                             start.style.backgroundImage = ''
//                             console.log('salut2', compteur, compteur2);
//                             // Callback function
//                             resetListener();
//                         }
//                     })
//                 })
//             }
//         })
//     });

//     // Callback function
//     function resetListener(){
//         cases = document.querySelectorAll('.cases')
//         caseOccupied(cases)
//         occupied = document.querySelectorAll('.occupied')
//         occupied.forEach(occupiedElement => {
//             occupiedElement.addEventListener('click', () => {
//                 cases = document.querySelectorAll('.cases')
//                 caseOccupied(cases)
//                 if (compteur != 1) {
//                     compteur2 = 0
//                     start = occupiedElement
//                     compteur = 1
//                     console.log('hey');
//                     cases.forEach(element =>{
//                         element.addEventListener('click',() => {
//                             if (compteur2 != 1 && element.classList[3] == 'free'){
//                                 console.log('salut', compteur, compteur2);
//                                 target = element
//                                 compteur2 = 1
//                                 target.style.backgroundImage = start.style.backgroundImage
//                                 start.style.backgroundImage = ''
//                                 compteur = 0
//                                 console.log('salut2', compteur, compteur2);
//                                 // Callback function
//                                 resetListener();
//                             }
//                         })
//                     })
//                 }
//             })
//         });
//     };
// }