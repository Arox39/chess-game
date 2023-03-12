function check(color, verif) {
    // on selectionne toute les cases ainsi que les case occuper par les blanc et noir separement
    let cases = document.querySelectorAll('.cases')
    let bOccupied = document.querySelectorAll('.blackOccupied')
    let wOccupied = document.querySelectorAll('.whiteOccupied')
    // on verifie que toute les classes sont dans le bonne ordre 
    verification(cases)
    // dans le cas ou c'est les blanc qui joue
    if(color === 'white'){
        // on initialise la variable qui va contenir la pos du roi noir
        let bKing = null
        // on initialise la variable qui va dire si il y a echec ou pas
        let isCheck = null
        // on parcoure tous les element blanc sur le plateaux
        wOccupied.forEach(wElement => {
            // on regarde tous les coup possible
            legalMove(wElement.classList[1], cases, 'white', wElement.classList[3], true)
        })
        // on parcours tous les element occuper par les noirs
        bOccupied.forEach(bElement => {
            // on selectione le roi est on affecte cette element a la variable bKing
            if(bElement.classList[3] === 'king'){
                bKing = bElement
            }
        })
        // si le roi noir est un possibleMove alors c'est qu'on peut le bouffer donc ya echec
        if(bKing.classList[4] === 'possibleMove' || bKing.classList[5] === 'possibleMove'){
            // si c'est pas juste une simulation (comme dans clouage)
            if(!verif){
                // on met au roi noir la class 'check'
                bKing.classList.add('check')
            }
            // on dit qu'il ya echec
            isCheck = true
        }
        // sinon, quand ya pas echec
        else if(isCheck !== true){
            // on s'assure que le roi n'a pas la variable check
            bKing.classList.remove('check')
            // on dit qu'il n'y a pas echec
            isCheck = false
        }
        // on retire tout les possibleMove car c'etait juste une simulation pour voir si y avait echec
        cases.forEach(element => {
            element.classList.remove('possibleMove')
        })
        // on retourne finalement isCheck
        return isCheck
    }
    // dans le cas ou c'est les blanc qui joue
    else if (color === 'black'){
        // on initialise la variable qui va contenir la pos du roi noir
        let wKing = null
        // on initialise la variable qui va dire si il y a echec ou pas
        let isCheck = null
        // on parcoure tous les element blanc sur le plateaux
        bOccupied.forEach(bElement => {
            // on regarde tous les coup possible
            legalMove(bElement.classList[1], cases, 'black', bElement.classList[3], true)
        })
        // on parcours tous les element occuper par les noirs
        wOccupied.forEach(wElement => {
            // on selectione le roi est on affecte cette element a la variable bKing
            if(wElement.classList[3] === 'king'){
                wKing = wElement
            }
        })
        // si le roi noir est un possibleMove alors c'est qu'on peut le bouffer donc ya echec
        if(wKing.classList[4] === 'possibleMove' || wKing.classList[5] === 'possibleMove'){
            // si c'est pas juste une simulation (comme dans clouage)
            if(!verif){
                // on met au roi blanc la class 'check'
                wKing.classList.add('check')
            }
            // on dit qu'il ya echec
            isCheck = true
        }
        // sinon, quand ya pas echec
        else if(isCheck !== true){
            // on s'assure que le roi n'a pas la variable check
            wKing.classList.remove('check')
            // on dit qu'il n'y a pas echec
            isCheck = false
        }
    // on retire tout les possibleMove car c'etait juste une simulation pour voir si y avait echec
        cases.forEach(element => {
            element.classList.remove('possibleMove')
        })
        // on retourne finalement isCheck
        return isCheck
    }

}


function clouage(element, cases, color) {
    // on regarde les coup possible pour l'element que l'on voudrait jouer 
    legalMove(element.classList[1], cases, color, element.classList[3], false)
    // on selectionne tous les possibleMove
    let possibleMove = document.querySelectorAll('.possibleMove')
    // on initialise la variable qui contiendra si il y en a les coup interdit
    let forbiddenMove = []
    // on parcoure tous les element possible
    possibleMove.forEach(possibleElement => {
        // on stock les valeur des bg image qu'on a de base
        let storageElementBg = element.style.backgroundImage
        let storePossibleBg = possibleElement.style.backgroundImage

        // on fait genre on veut se deplacer au possibleMove pour voir si il y a echec si on va la-bas
        possibleElement.style.backgroundImage = element.style.backgroundImage
        element.style.backgroundImage = ''
        // on met a jours cases et on appelle caseOccupied
        cases = document.querySelectorAll('.cases')
        caseOccupied(cases)
        // on regarde si ya echec pour notre roi
        if(check(color === 'white' ? 'black' : 'white', true)){
            // si ya alors on met cette case dans les forbiddenMove
            forbiddenMove.push(possibleElement)
        }
        // on remet tous comme c'etait avant
        possibleElement.style.backgroundImage = storePossibleBg
        element.style.backgroundImage = storageElementBg
        cases = document.querySelectorAll('.cases')
        caseOccupied(cases)
    })
    // on verifie qu'il y a pas de problement avec les classe
    verification(cases)
    // on redetecte tous les element possible
    legalMove(element.classList[1], cases, color, element.classList[3], false)
    // mais on va parcourire tous les elements qui font que quand on va la-bas ya echec
    forbiddenMove.forEach(forbiddenElement => {
        // pour enlever le fait que ce soit un move possible
        forbiddenElement.classList.remove('possibleMove')
    })
}