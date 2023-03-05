let check = (color) => {
    let cases = document.querySelectorAll('.cases')
    let kings = document.querySelectorAll('.king')
    
    let whiteKing = null
    let blackKing = null

    let isCheck = false
    if(kings[0].classList[2] === 'whiteOccupied'){
        whiteKing = kings[0]
        blackKing = kings[1]
    }else{
        whiteKing = kings[1]
        blackKing = kings[0]
    }    

    if(color === 'black'){
        let pieces = document.querySelectorAll('.whiteOccupied')
        

        
        pieces.forEach(element => {
            legalMove(element.classList[1], cases, 'white', element.classList[3], true)
        })

        if (blackKing.classList[4] === 'possibleMove' || blackKing.classList[5] === 'possibleMove'){
            blackKing.classList.add('check')
            isCheck = true
        }else{
            blackKing.classList.remove('check')
            isCheck = false
        }
    }

    //  enlevage des possibles mouvements
    cases.forEach(element => {
        element.classList.remove('possibleMove')
    })

    return isCheck
}