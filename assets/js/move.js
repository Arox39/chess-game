let move = (color) => {

    // Sélectionne tous les éléments occupés par les pièces blanches et noires
    let wOccupied = document.querySelectorAll('.whiteOccupied')
    let cases = document.querySelectorAll('.cases')
    let bOccupied = document.querySelectorAll('.blackOccupied')


        // Fonction qui "écoute" les clics sur les éléments occupés par les pièces blanches
    function listenerOccupiedElements(occupiedElement, color) {
        occupiedElement.forEach(elementOccupied => {
            // Ajoute un événement "click" sur l'élément occupé
            elementOccupied.addEventListener('click', () => {
                // Vérifie si la classe "free" n'est pas présente dans les classes de l'élément occupé
                if (elementOccupied.classList[2] !== 'free') {
                    // Si c'est le cas, cet élément est considéré comme la pièce sélectionnée pour le déplacement
                    selectedElement = elementOccupied
                    verification(cases)
                    check(color)
                    clouage(selectedElement, cases, color)
                }
                let possibleMove = document.querySelectorAll('.possibleMove')
                elementTemp = []
                paramStorage.push(occupiedElement, color)
                possibleMove.forEach(possibleElement => {
                    elementTemp.push(possibleElement)
                    possibleElement.addEventListener('click', possibleElementClickHandler)
                })
            })
        })
    }
    function possibleElementClickHandler() {
        if(this.classList[3] === 'possibleMove' || this.classList[4] === 'possibleMove'){
            let possibleMove = document.querySelectorAll('.possibleMove')
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
            possibleMove = document.querySelectorAll('.possibleMove')
    
            if (color === 'white'){
                wOccupied = document.querySelectorAll('.whiteOccupied')
                console.log(possibleMove);
                check(color)
                listenerOccupiedElements(wOccupied, 'white')
            }
            else if (color === 'black'){
                bOccupied = document.querySelectorAll('.blackOccupied')
                check(color)
                listenerOccupiedElements(bOccupied, 'black')
            }
        }
        
        
    }
    
    let selectedElement = null
    let elementTemp = []
    let paramStorage = []
    if (color === 'white'){
        listenerOccupiedElements(wOccupied, color)
    }
    else if (color === 'black'){
        listenerOccupiedElements(bOccupied, color)
    }

    
}


let verification = (cases) => {
    // permet de regler le bug de quand un pion arrive sur la 7eme ligne whiteOccupied et pawn sont 
    // inverser 

    cases.forEach(element => {
        let state = element.classList[2]
        if (state !== 'free' && state !== 'whiteOccupied' && state !== 'blackOccupied'){
            element.classList.remove(state)
            element.classList.add(state)
        }
    })
}
