function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n1 / n2;
}

function remainder(n1, n2) {
    return n1 % n2;
}

function operate(operator, n1, n2) {
    if (operator == '+') {
        return add(n1, n2);
    }
    else if (operator == '–') {
        return subtract(n1, n2);
    }
    else if (operator == '×') {
        if (!Number.isInteger(multiply(n1, n2)) && multiply(n1, n2).toString().split('.')[1].length > 10) {
            return multiply(n1, n2).toFixed(10);
        } else {
            return multiply(n1, n2);
        }
    }
    else if (operator == '÷') {
        if (!Number.isInteger(divide(n1, n2)) && divide(n1, n2).toString().split('.')[1].length > 10) {
            return divide(n1, n2).toFixed(10);
        } else {
            return divide(n1, n2);
        }
    }
    else if (operator == '%') {
        return remainder(n1, n2);
    }
}

function ListenForOperand() {
    numberButtons.forEach((numberButton) => {
        numberButton.addEventListener('click', () => {
            if (displayResult.textContent.includes('.') && numberButton.textContent === '.') {
                displayResult.textContent = displayResult.textContent;
            } else {
                displayResult.textContent += numberButton.textContent;
            }
        });
    })
}

function listenForOperator() {
    operators.forEach((operator) => {
        operator.addEventListener('click', () => {
            if (storedValue.textContent !== '' && storedValue.textContent !== displayResult.textContent && displayResult.textContent !== '') {
                signNow = operator.textContent;
                displayResult.textContent = operate(signThen, +storedValue.textContent, +displayResult.textContent);
                storedValue.textContent = +displayResult.textContent;
                displayResult.textContent = '';
                signThen = signNow;
            }
            else if (storedValue.textContent !== '' && displayResult.textContent === '') {
                signThen = operator.textContent;
            }
            else if (storedValue.textContent === displayResult.textContent) {
                signNow = operator.textContent;
                displayResult.textContent = operate(signThen, +storedValue.textContent, +displayResult.textContent);
                storedValue.textContent = +displayResult.textContent;
                displayResult.textContent = '';
                signThen = signNow;
            }
            else {
                storedValue.textContent = +displayResult.textContent;
                signThen = operator.textContent;
                displayResult.textContent = '';
            }
        })
    });
}

let storedValue = document.querySelector('.stored-value');
let displayResult = document.querySelector('.result');
const numberButtons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
let signThen;
let signNow;
const ce = document.querySelector('.ce');
const c = document.querySelector('.c');

ce.addEventListener('click', () => displayResult.textContent = '');
c.addEventListener('click', () => {
    displayResult.textContent = '';
    storedValue.textContent = '';
    signThen = undefined;
    signNow = undefined;
});