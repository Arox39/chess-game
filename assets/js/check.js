function check(color) {
    let cases = document.querySelectorAll('.cases')
    let bOccupied = document.querySelectorAll('.blackOccupied')
    let wOccupied = document.querySelectorAll('.whiteOccupied')
    verification(cases)
    if(color === 'white'){
        let bKing = null
        let isCheck = null
        wOccupied.forEach(wElement => {
            legalMove(wElement.classList[1], cases, 'white', wElement.classList[3], true)
        })
        bOccupied.forEach(bElement => {
            if(bElement.classList[3] === 'king'){
                bKing = bElement
            }
        })
        if(bKing.classList[4] === 'possibleMove' || bKing.classList[5] === 'possibleMove'){
            bKing.classList.add('check')
            isCheck = true
        }
        else if(isCheck !== true){
            bKing.classList.remove('check')
            isCheck = false
        }

        cases.forEach(element => {
            element.classList.remove('possibleMove')
        })
        return isCheck
    }
    else if (color === 'black'){
        let wKing = null
        let isCheck = null
        bOccupied.forEach(bElement => {
            legalMove(bElement.classList[1], cases, 'black', bElement.classList[3], true)
        })
        wOccupied.forEach(wElement => {
            if(wElement.classList[3] === 'king'){
                wKing = wElement
            }
        })
        if(wKing.classList[4] === 'possibleMove' || wKing.classList[5] === 'possibleMove'){
            wKing.classList.add('check')
            isCheck = true
        }
        else if(isCheck !== true){
            wKing.classList.remove('check')
            isCheck = false
        }

        cases.forEach(element => {
            element.classList.remove('possibleMove')
        })
        
        return isCheck
    }

}


function clouage(element, cases, color) {
    legalMove(element.classList[1], cases, color, element.classList[3], false)
    let possibleMove = document.querySelectorAll('.possibleMove')
    let forbiddenMove = []
    possibleMove.forEach(possibleElement => {
        let storageElementBg = element.style.backgroundImage
        let storePossibleBg = possibleElement.style.backgroundImage
        possibleElement.style.backgroundImage = element.style.backgroundImage
        element.style.backgroundImage = ''
        cases = document.querySelectorAll('.cases')
        caseOccupied(cases)
        if(check(color === 'white' ? 'black' : 'white')){
            forbiddenMove.push(possibleElement)
        }
        possibleElement.style.backgroundImage = storePossibleBg
        element.style.backgroundImage = storageElementBg
        cases = document.querySelectorAll('.cases')
        caseOccupied(cases)
    })
    verification(cases)
    legalMove(element.classList[1], cases, color, element.classList[3], false)
    forbiddenMove.forEach(forbiddenElement => {
        forbiddenElement.classList.remove('possibleMove')
    })
}