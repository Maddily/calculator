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
            if (input.includes('.') && numberButton.textContent === '.') {
                input = input;
            }
            else if (/[0-9] [^0-9]/.test(equation.textContent)) {
                input += numberButton.textContent;
                equation.textContent += numberButton.textContent;
            }
            else {
                input += numberButton.textContent;
                equation.textContent += numberButton.textContent;
            }
        });
    })
}

function listenForOperator() {
    operators.forEach((operator) => {
        operator.addEventListener('click', () => {
            if (storedValue !== undefined && storedValue !== +input && input !== '') {
                signNow = operator.textContent;
                storedValue = operate(signThen, storedValue, +input);
                equation.textContent = storedValue + ' ' + operator.textContent + ' ';
                input = '';
                signThen = signNow;
            }
            else if (/[0-9] [^0-9] [0-9]/.test(equation.textContent) && displayResult.textContent !== '') {
                equation.textContent = displayResult.textContent + ' ' + operator.textContent + ' ';
                storedValue = +displayResult.textContent;
                displayResult.textContent = '';
                signThen = operator.textContent;
            }
            else if (equation.textContent.split(' ')[2] === '') {
                equation.textContent = equation.textContent.replace(/ [^0-9]/, ' ' + operator.textContent);
                signThen = operator.textContent;
            }
            else if (storedValue !== undefined && input === '') {
                signThen = operator.textContent;
                equation.textContent += ' ' + operator.textContent + ' ';
            }
            else if (storedValue === +input) {
                signNow = operator.textContent;
                storedValue = operate(signThen, storedValue, +input);
                equation.textContent = storedValue + ' ' + operator.textContent + ' ';
                input = '';
                signThen = signNow;
            }
            else {
                equation.textContent += ' ' + operator.textContent + ' ';
                storedValue = +input;
                signThen = operator.textContent;
                input = '';
            }
        })
    });
}

function listenForEqual() {
    equal.addEventListener('click', () => {
        if (signNow === undefined && signThen !== undefined && input !== '') {
            displayResult.textContent = operate(signThen, storedValue, +input);
            storedValue = +displayResult.textContent;
            input = '';
        }
        else if (signThen === undefined && input !== '') {
            storedValue = +input;
            input = '';
        }
        else if (storedValue !== undefined && input === '') {
            input = '';
        }
        else if (storedValue === undefined && input === '') {
            storedValue = undefined;
        }
        else {
            displayResult.textContent = operate(signThen, storedValue, +input);
            storedValue = +displayResult.textContent;
            input = '';
        }
    });
}

let storedValue;
let input = '';
let equation = document.querySelector('.equation');
let displayResult = document.querySelector('.result');
const numberButtons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
let signThen;
let signNow;
const ce = document.querySelector('.ce');
const c = document.querySelector('.c');

ce.addEventListener('click', () => {
    if (displayResult.textContent !== '') {
        displayResult.textContent = displayResult.textContent;
    } else {
        let array = equation.textContent.split(/ /);
        array = array.slice(0, array.length - 1);
        equation.textContent = array.join(' ') + ' ';
        input = '';
    }
});
c.addEventListener('click', () => {
    input = '';
    displayResult.textContent = '';
    equation.textContent = '';
    storedValue = undefined;
    signThen = undefined;
    signNow = undefined;
});

ListenForOperand();
listenForOperator();
listenForEqual();