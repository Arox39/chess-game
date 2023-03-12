
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




let legalMove = (casee, cases, color, piece, all) => {
    if (!all){
        // enlevage des possibles mouvements
        cases.forEach(element => {
            element.classList.remove('possibleMove')
        })
    }
    let { row, col } = caseeToRowCol(casee)
    let moves = []



    let possibleMoveForWhitePawns = (row, col) => {
    
        let select = (casee) => document.querySelector(`.${casee}`)
        
        if(row + 1 <= 8 && select(rowColToCasee(row + 1, col)).classList[2] === 'free'){
            moves.push([rowColToCasee(row + 1, col)])
            select(rowColToCasee(row + 1, col)).classList.add('possibleMove')
        }
        if(row === 2 && select(rowColToCasee(row + 2, col)).classList[2] === 'free' 
        && select(rowColToCasee(row + 1, col)).classList[2] === 'free'){
            moves.push([rowColToCasee(row + 2, col)])
            select(rowColToCasee(row + 2, col)).classList.add('possibleMove')
        }
        if(col - 1 >= 1 && row + 1 <= 8 && select(rowColToCasee(row + 1, col - 1)).classList[2] === 'blackOccupied'){
            moves.push([rowColToCasee(row + 1, col - 1)])
            select(rowColToCasee(row + 1, col - 1)).classList.add('possibleMove')
        }
        if(col + 1 <= 8  && row + 1 <= 8 && select(rowColToCasee(row + 1, col + 1)).classList[2] === 'blackOccupied'){
            moves.push([rowColToCasee(row + 1, col + 1)])
            select(rowColToCasee(row + 1, col + 1)).classList.add('possibleMove')
        }
    }
    
    let possibleMoveForWhiteRooks = (row, col) => {
        let select = (casee) => document.querySelector(`.${casee}`) 
        
        let max = 1
    
        // Verifie la ligne devant lui 
        while(max <= 7) {
            let avant = select(rowColToCasee(row + max, col))
            if(row + max >= 9 || avant.classList[2] === 'whiteOccupied'){
                break;
            }
            else if(avant.classList[2] === 'free'){
                moves.push(avant)
                avant.classList.add('possibleMove')
            }
            else if(avant.classList[2] === 'blackOccupied'){
                moves.push(avant)
                avant.classList.add('possibleMove')
                break;
            }
            max++
        }
        max = 1
         // Verifie la ligne derriere lui 
         while(max <= 7) {
            let arriere = select(rowColToCasee(row - max, col))
            if(row - max <= 0 || arriere.classList[2] === 'whiteOccupied'){
                break;
            }
            else if(arriere.classList[2] === 'free'){
                moves.push(arriere)
                arriere.classList.add('possibleMove')
            }
            else if(arriere.classList[2] === 'blackOccupied'){
                moves.push(arriere)
                arriere.classList.add('possibleMove')
                break;
            }
            max++
        }
        max = 1 
         // Verifie la ligne a gauche 
         while(max <= 7) {
            let gauche = select(rowColToCasee(row, col - max))
            if(col - max <= 0 || gauche.classList[2] === 'whiteOccupied'){
                break;
            }
            else if(gauche.classList[2] === 'free'){
                moves.push(gauche)
                gauche.classList.add('possibleMove')
            }
            else if(gauche.classList[2] === 'blackOccupied'){
                moves.push(gauche)
                gauche.classList.add('possibleMove')
                break;
            }
            max++
        }
        max = 1 
         // Verifie la ligne a droite 
         while(max <= 7) {
            let droite = select(rowColToCasee(row, col + max))
            if(col + max >= 9 || droite.classList[2] === 'whiteOccupied'){
                break;
            }
            else if(droite.classList[2] === 'free'){
                moves.push(droite)
                droite.classList.add('possibleMove')
            }
            else if(droite.classList[2] === 'blackOccupied'){
                moves.push(droite)
                droite.classList.add('possibleMove')
                break;
            }
            max++
        }
    
    }
    
    let possibleMoveForWhiteBishop = (row, col) => {
    
        let select = (casee) => document.querySelector(`.${casee}`)
        
        let max = 1
        // diago en haut a droite
        while (max <= 7) {
            // raccourcie 
            let avantDroit = select(rowColToCasee(row + max, col + max))
            // arrete si on sort ou si on rencontre une piece blanche
            if(row + max >= 9 || col + max >= 9|| avantDroit.classList[2] === 'whiteOccupied'){
                break;
            }
            else if(avantDroit.classList[2] === 'free'){
                moves.push(avantDroit)
                avantDroit.classList.add('possibleMove')
            }
            else if(avantDroit.classList[2] === 'blackOccupied'){
                moves.push(avantDroit)
                avantDroit.classList.add('possibleMove')
                break;
            }
            max++
        }
        max = 1
        // diago en haut a gauche
        while (max <= 7) {
            // raccourcie 
            let avantGauche = select(rowColToCasee(row + max, col - max))
            // arrete si on sort ou si on rencontre une piece blanche
            if(row + max >= 9 || col - max <= 0 || avantGauche.classList[2] === 'whiteOccupied'){
                break;
            }
            else if(avantGauche.classList[2] === 'free'){
                moves.push(avantGauche)
                avantGauche.classList.add('possibleMove')
            }
            else if(avantGauche.classList[2] === 'blackOccupied'){
                moves.push(avantGauche)
                avantGauche.classList.add('possibleMove')
                break;
            }
            max++
        }
        max = 1
        // diago en bas a droite
        while (max <= 7) {
            // raccourcie 
            let arriereDroit = select(rowColToCasee(row - max, col + max))
            // arrete si on sort ou si on rencontre une piece blanche
            if(row - max <= 0 || col + max >= 9|| arriereDroit.classList[2] === 'whiteOccupied'){
                break;
            }
            else if(arriereDroit.classList[2] === 'free'){
                moves.push(arriereDroit)
                arriereDroit.classList.add('possibleMove')
            }
            else if(arriereDroit.classList[2] === 'blackOccupied'){
                moves.push(arriereDroit)
                arriereDroit.classList.add('possibleMove')
                break;
            }
            max++
        }
        max = 1
        // diago en haut a droite
        while (max <= 7) {
            // raccourcie 
            let arriereGauche = select(rowColToCasee(row - max, col - max))
            // arrete si on sort ou si on rencontre une piece blanche
            if(row - max <= 0 || col - max <= 0|| arriereGauche.classList[2] === 'whiteOccupied'){
                break;
            }
            else if(arriereGauche.classList[2] === 'free'){
                moves.push(arriereGauche)
                arriereGauche.classList.add('possibleMove')
            }
            else if(arriereGauche.classList[2] === 'blackOccupied'){
                moves.push(arriereGauche)
                arriereGauche.classList.add('possibleMove')
                break;
            }
            max++
        }
    }
    
    let possibleMoveForWhiteKnight = (row, col) => {
        
        let select = (casee) => document.querySelector(`.${casee}`)  
    
        let hautDroit = select(rowColToCasee(row + 2, col + 1))
        let hautMilieuDroit = select(rowColToCasee(row + 1, col + 2))
        let basMilieuDroit = select(rowColToCasee(row - 1, col + 2))
        let basDroit = select(rowColToCasee(row + 1, col - 2))
    
        let hautGauche = select(rowColToCasee(row + 2, col - 1))
        let hautMilieuGauche = select(rowColToCasee(row + 1, col - 2))
        let basMilieuGauche = select(rowColToCasee(row - 1, col - 2))
        let basGauche = select(rowColToCasee(row - 2, col - 1))
    
        if(row + 2 <= 8 &&  col + 1 <= 8 && hautDroit.classList[2] !== 'whiteOccupied'){
            moves.push(hautDroit)
            hautDroit.classList.add('possibleMove')
        }
        if(row + 1 <= 8 &&  col + 2 <= 8 && hautMilieuDroit.classList[2] !== 'whiteOccupied'){
            moves.push(hautMilieuDroit)
            hautMilieuDroit.classList.add('possibleMove')
        }
        if(row - 1 >= 1 &&  col + 2 <= 8 && basMilieuDroit.classList[2] !== 'whiteOccupied'){
            moves.push(basMilieuDroit)
            basMilieuDroit.classList.add('possibleMove')
        }
        if(row + 1 <= 8 &&  col - 2 >= 1 && basDroit.classList[2] !== 'whiteOccupied'){
            moves.push(basDroit)
            basDroit.classList.add('possibleMove')
        }
        if(row + 2 <= 8 &&  col - 1 >= 1 && hautGauche.classList[2] !== 'whiteOccupied'){
            moves.push(hautGauche)
            hautGauche.classList.add('possibleMove')
        }
        if(row + 1 <= 8 &&  col - 2 >= 1 && hautMilieuGauche.classList[2] !== 'whiteOccupied'){
            moves.push(hautMilieuGauche)
            hautMilieuGauche.classList.add('possibleMove')
        }
        if(row - 1 >= 1 &&  col - 2 >= 1 &&  basMilieuGauche.classList[2] !== 'whiteOccupied'){
            moves.push(basMilieuGauche)
            basMilieuGauche.classList.add('possibleMove')
        }
        if(row - 2 >= 1 &&  col - 1 >= 1 && basGauche.classList[2] !== 'whiteOccupied'){
            moves.push(basGauche)
            basGauche.classList.add('possibleMove')
        }
    
    }
    
    let possibleMoveForWhiteQueen = (row, col) => {
    
        possibleMoveForWhiteBishop(row, col)
        possibleMoveForWhiteRooks(row, col)
    }
    
    let possibleMoveForWhiteKing = (row, col) => {
    
        let select = (casee) => document.querySelector(`.${casee}`)
    
        if(row + 1 <= 8 && select(rowColToCasee(row+1, col)).classList[2] === 'free'){
            moves.push(select(rowColToCasee(row+1, col)))
            select(rowColToCasee(row+1, col)).classList.add('possibleMove')
        }
        if(col + 1 <= 8 && select(rowColToCasee(row, col + 1)).classList[2] === 'free'){
            moves.push(select(rowColToCasee(row, col + 1)))
            select(rowColToCasee(row, col + 1)).classList.add('possibleMove')
        }
        if(row - 1 >= 1 && select(rowColToCasee(row - 1, col)).classList[2] === 'free'){
            moves.push(select(rowColToCasee(row - 1, col)))
            select(rowColToCasee(row - 1, col)).classList.add('possibleMove')
        }
        if(col - 1 >= 1 && select(rowColToCasee(row, col - 1)).classList[2] === 'free'){
            moves.push(select(rowColToCasee(row, col - 1)))
            select(rowColToCasee(row, col - 1)).classList.add('possibleMove')
        }
        if(row + 1 <= 8 && col + 1 <= 8 && select(rowColToCasee(row+1, col + 1)).classList[2] === 'free'){
            moves.push(select(rowColToCasee(row+1, col + 1)))
            select(rowColToCasee(row+1, col + 1)).classList.add('possibleMove')
        }
        if(row - 1 >= 1 && col + 1 <= 8 && select(rowColToCasee(row - 1, col + 1)).classList[2] === 'free'){
            moves.push(select(rowColToCasee(row - 1, col + 1)))
            select(rowColToCasee(row - 1, col + 1)).classList.add('possibleMove')
        }
        if(row - 1 >= 1 && col - 1 >= 1 && select(rowColToCasee(row - 1, col - 1)).classList[2] === 'free'){
            moves.push(select(rowColToCasee(row - 1, col - 1)))
            select(rowColToCasee(row - 1, col - 1)).classList.add('possibleMove')
        }
        if(row + 1 <= 8 && col - 1 >= 0 && select(rowColToCasee(row+1, col - 1)).classList[2] === 'free'){
            moves.push(select(rowColToCasee(row+1, col - 1)))
            select(rowColToCasee(row+1, col - 1)).classList.add('possibleMove')
        }
    
    }

    let possibleMoveForBlackPawns = (row, col) => {
    
        let select = (casee) => document.querySelector(`.${casee}`)
        
        if(row - 1 >= 1 && select(rowColToCasee(row - 1, col)).classList[2] === 'free'){
            moves.push([rowColToCasee(row - 1, col)])
            select(rowColToCasee(row - 1, col)).classList.add('possibleMove')
        }
        if(row === 7 && select(rowColToCasee(row - 2, col)).classList[2] === 'free' 
        && select(rowColToCasee(row - 1, col)).classList[2] === 'free'){
            moves.push([rowColToCasee(row - 2, col)])
            select(rowColToCasee(row - 2, col)).classList.add('possibleMove')
        }
        if(col - 1 >= 1 && row - 1 >= 1 && select(rowColToCasee(row - 1, col - 1)).classList[2] === 'whiteOccupied'){
            moves.push([rowColToCasee(row - 1, col - 1)])
            select(rowColToCasee(row - 1, col - 1)).classList.add('possibleMove')
        }
        if(col + 1 <= 8 && row - 1 >= 1 && select(rowColToCasee(row - 1, col + 1)).classList[2] === 'whiteOccupied'){
            moves.push([rowColToCasee(row - 1, col + 1)])
            select(rowColToCasee(row - 1, col + 1)).classList.add('possibleMove')
        }
    }

    let possibleMoveForBlackRooks = (row, col) => {
        let select = (casee) => document.querySelector(`.${casee}`) 
        
        let max = 1
    
        // Verifie la ligne devant lui 
        while(max <= 7) {
            let avant = select(rowColToCasee(row + max, col))
            if(row + max >= 9 || avant.classList[2] === 'blackOccupied'){
                break;
            }
            else if(avant.classList[2] === 'free'){
                moves.push(avant)
                avant.classList.add('possibleMove')
            }
            else if(avant.classList[2] === 'whiteOccupied'){
                moves.push(avant)
                avant.classList.add('possibleMove')
                break;
            }
            max++
        }
        max = 1
         // Verifie la ligne derriere lui 
         while(max <= 7) {
            let arriere = select(rowColToCasee(row - max, col))
            if(row - max <= 0 || arriere.classList[2] === 'blackOccupied'){
                break;
            }
            else if(arriere.classList[2] === 'free'){
                moves.push(arriere)
                arriere.classList.add('possibleMove')
            }
            else if(arriere.classList[2] === 'whiteOccupied'){
                moves.push(arriere)
                arriere.classList.add('possibleMove')
                break;
            }
            max++
        }
        max = 1 
         // Verifie la ligne a gauche 
         while(max <= 7) {
            let gauche = select(rowColToCasee(row, col - max))
            if(col - max <= 0 || gauche.classList[2] === 'blackOccupied'){
                break;
            }
            else if(gauche.classList[2] === 'free'){
                moves.push(gauche)
                gauche.classList.add('possibleMove')
            }
            else if(gauche.classList[2] === 'whiteOccupied'){
                moves.push(gauche)
                gauche.classList.add('possibleMove')
                break;
            }
            max++
        }
        max = 1 
         // Verifie la ligne a droite 
         while(max <= 7) {
            let droite = select(rowColToCasee(row, col + max))
            if(col + max >= 9 || droite.classList[2] === 'blackOccupied'){
                break;
            }
            else if(droite.classList[2] === 'free'){
                console.log(droite.classList[2])
                moves.push(droite)
                droite.classList.add('possibleMove')
            }
            else if(droite.classList[2] === 'whiteOccupied'){
                moves.push(droite)
                droite.classList.add('possibleMove')
                break;
            }
            max++
        }
    
    }
    
    let possibleMoveForBlackBishop = (row, col) => {
    
        let select = (casee) => document.querySelector(`.${casee}`)
        
        let max = 1
        // diago en haut a droite
        while (max <= 7) {
            // raccourcie 
            let avantDroit = select(rowColToCasee(row + max, col + max))
            // arrete si on sort ou si on rencontre une piece blanche
            if(row + max >= 9 || col + max >= 9|| avantDroit.classList[2] === 'blackOccupied'){
                break;
            }
            else if(avantDroit.classList[2] === 'free'){
                moves.push(avantDroit)
                avantDroit.classList.add('possibleMove')
            }
            else if(avantDroit.classList[2] === 'whiteOccupied'){
                moves.push(avantDroit)
                avantDroit.classList.add('possibleMove')
                break;
            }
            max++
        }
        max = 1
        // diago en haut a gauche
        while (max <= 7) {
            // raccourcie 
            let avantGauche = select(rowColToCasee(row + max, col - max))
            // arrete si on sort ou si on rencontre une piece blanche
            if(row + max >= 9 || col - max <= 0 || avantGauche.classList[2] === 'blackOccupied'){
                break;
            }
            else if(avantGauche.classList[2] === 'free'){
                moves.push(avantGauche)
                avantGauche.classList.add('possibleMove')
            }
            else if(avantGauche.classList[2] === 'whiteOccupied'){
                moves.push(avantGauche)
                avantGauche.classList.add('possibleMove')
                break;
            }
            max++
        }
        max = 1
        // diago en bas a droite
        while (max <= 7) {
            // raccourcie 
            let arriereDroit = select(rowColToCasee(row - max, col + max))
            // arrete si on sort ou si on rencontre une piece blanche
            if(row - max <= 0 || col + max >= 9|| arriereDroit.classList[2] === 'blackOccupied'){
                break;
            }
            else if(arriereDroit.classList[2] === 'free'){
                moves.push(arriereDroit)
                arriereDroit.classList.add('possibleMove')
            }
            else if(arriereDroit.classList[2] === 'whiteOccupied'){
                moves.push(arriereDroit)
                arriereDroit.classList.add('possibleMove')
                break;
            }
            max++
        }
        max = 1
        // diago en haut a droite
        while (max <= 7) {
            // raccourcie 
            let arriereGauche = select(rowColToCasee(row - max, col - max))
            // arrete si on sort ou si on rencontre une piece blanche
            if(row - max <= 0 || col - max <= 0|| arriereGauche.classList[2] === 'blackOccupied'){
                break;
            }
            else if(arriereGauche.classList[2] === 'free'){
                moves.push(arriereGauche)
                arriereGauche.classList.add('possibleMove')
            }
            else if(arriereGauche.classList[2] === 'whiteOccupied'){
                moves.push(arriereGauche)
                arriereGauche.classList.add('possibleMove')
                break;
            }
            max++
        }
    }
    
    let possibleMoveForBlackKnight = (row, col) => {
        
        let select = (casee) => document.querySelector(`.${casee}`)  
    
        let hautDroit = select(rowColToCasee(row + 2, col + 1))
        let hautMilieuDroit = select(rowColToCasee(row + 1, col + 2))
        let basMilieuDroit = select(rowColToCasee(row - 1, col + 2))
        let basDroit = select(rowColToCasee(row + 1, col - 2))
    
        let hautGauche = select(rowColToCasee(row + 2, col - 1))
        let hautMilieuGauche = select(rowColToCasee(row + 1, col - 2))
        let basMilieuGauche = select(rowColToCasee(row - 1, col - 2))
        let basGauche = select(rowColToCasee(row - 2, col - 1))
    
        if(row + 2 <= 8 &&  col + 1 <= 8 && hautDroit.classList[2] !== 'blackOccupied'){
            moves.push(hautDroit)
            hautDroit.classList.add('possibleMove')
        }
        if(row + 1 <= 8 &&  col + 2 <= 8 && hautMilieuDroit.classList[2] !== 'blackOccupied'){
            moves.push(hautMilieuDroit)
            hautMilieuDroit.classList.add('possibleMove')
        }
        if(row - 1 >= 1 &&  col + 2 <= 8 && basMilieuDroit.classList[2] !== 'blackOccupied'){
            moves.push(basMilieuDroit)
            basMilieuDroit.classList.add('possibleMove')
        }
        if(row + 1 <= 8 &&  col - 2 >= 1 && basDroit.classList[2] !== 'blackOccupied'){
            moves.push(basDroit)
            basDroit.classList.add('possibleMove')
        }
        if(row + 2 <= 8 &&  col - 1 >= 1 && hautGauche.classList[2] !== 'blackOccupied'){
            moves.push(hautGauche)
            hautGauche.classList.add('possibleMove')
        }
        if(row + 1 <= 8 &&  col - 2 >= 1 && hautMilieuGauche.classList[2] !== 'blackOccupied'){
            moves.push(hautMilieuGauche)
            hautMilieuGauche.classList.add('possibleMove')
        }
        if(row - 1 >= 1 &&  col - 2 >= 1 &&  basMilieuGauche.classList[2] !== 'blackOccupied'){
            moves.push(basMilieuGauche)
            basMilieuGauche.classList.add('possibleMove')
        }
        if(row - 2 >= 1 &&  col - 1 >= 1 && basGauche.classList[2] !== 'blackOccupied'){
            moves.push(basGauche)
            basGauche.classList.add('possibleMove')
        }
    
    }
    
    let possibleMoveForBlackQueen = (row, col) => {
    
        possibleMoveForBlackBishop(row, col)
        possibleMoveForBlackRooks(row, col)
    }
    
    let possibleMoveForBlackKing = (row, col) => {
    
        let select = (casee) => document.querySelector(`.${casee}`)
    
        if(row + 1 <= 8 && select(rowColToCasee(row+1, col)).classList[2] === 'free'){
            moves.push(select(rowColToCasee(row+1, col)))
            select(rowColToCasee(row+1, col)).classList.add('possibleMove')
        }
        if(col + 1 <= 8 && select(rowColToCasee(row, col + 1)).classList[2] === 'free'){
            moves.push(select(rowColToCasee(row, col + 1)))
            select(rowColToCasee(row, col + 1)).classList.add('possibleMove')
        }
        if(row - 1 >= 1 && select(rowColToCasee(row - 1, col)).classList[2] === 'free'){
            moves.push(select(rowColToCasee(row - 1, col)))
            select(rowColToCasee(row - 1, col)).classList.add('possibleMove')
        }
        if(col - 1 >= 1 && select(rowColToCasee(row, col - 1)).classList[2] === 'free'){
            moves.push(select(rowColToCasee(row, col - 1)))
            select(rowColToCasee(row, col - 1)).classList.add('possibleMove')
        }
        if(row + 1 <= 8 && col + 1 <= 8 && select(rowColToCasee(row+1, col + 1)).classList[2] === 'free'){
            moves.push(select(rowColToCasee(row+1, col + 1)))
            select(rowColToCasee(row+1, col + 1)).classList.add('possibleMove')
        }
        if(row - 1 >= 1 && col + 1 <= 8 && select(rowColToCasee(row - 1, col + 1)).classList[2] === 'free'){
            moves.push(select(rowColToCasee(row - 1, col + 1)))
            select(rowColToCasee(row - 1, col + 1)).classList.add('possibleMove')
        }
        if(row - 1 >= 1 && col - 1 >= 1 && select(rowColToCasee(row - 1, col - 1)).classList[2] === 'free'){
            moves.push(select(rowColToCasee(row - 1, col - 1)))
            select(rowColToCasee(row - 1, col - 1)).classList.add('possibleMove')
        }
        if(row + 1 <= 8 && col - 1 >= 0 && select(rowColToCasee(row+1, col - 1)).classList[2] === 'free'){
            moves.push(select(rowColToCasee(row+1, col - 1)))
            select(rowColToCasee(row+1, col - 1)).classList.add('possibleMove')
        }
    
    }


    if (color === 'white'){
        if (piece === 'pawn'){
            return possibleMoveForWhitePawns(row, col)
        }
        else if (piece === 'rook'){
            return possibleMoveForWhiteRooks(row, col)
        }
        else if (piece === 'knight'){
            return possibleMoveForWhiteKnight(row, col)
        }
        else if (piece === 'bishop'){
            return possibleMoveForWhiteBishop(row, col)
        }
        else if (piece === 'queen'){
            return possibleMoveForWhiteQueen(row, col)
        }
        else if (piece === 'king'){
            return possibleMoveForWhiteKing(row, col)
        }
        
    }
    if (color === 'black'){
        if (piece === 'pawn'){
            return possibleMoveForBlackPawns(row, col)
        }
        else if (piece === 'rook'){
            return possibleMoveForBlackRooks(row, col)
        }
        else if (piece === 'knight'){
            return possibleMoveForBlackKnight(row, col)
        }
        else if (piece === 'bishop'){
            return possibleMoveForBlackBishop(row, col)
        }
        else if (piece === 'queen'){
            return possibleMoveForBlackQueen(row, col)
        }
        else if (piece === 'king'){
            return possibleMoveForBlackKing(row, col)
        }
    }
    
    return moves
}


