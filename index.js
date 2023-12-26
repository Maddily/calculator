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
/**
 * 
 * @param {*} operator 
 * @param {*} n1 
 * @param {*} n2 
 * @returns 
 */
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

function receiveInput(character) {
	/* Prevent inputting two decimal points in the same number */
	if (input.includes('.') && character === '.') {
		input = input;
	}
	else {
		input += character;
		equation.textContent += character;
	}
}

function listenForOperandClick() {
	/* Listens for a click on a number button */
    numberButtons.forEach((numberButton) => {
        numberButton.addEventListener('click', () => {
            receiveInput(numberButton.textContent);
        });
    })
}

function listenForOperandKeyDown() {
	/* Listen for a number key press */
	const numbers = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	window.addEventListener('keydown', (e) => {
		if (numbers.includes(e.key))
		{
			receiveInput(e.key);
		}
	});
}

function handleOperator(operator) {
	if (storedValue !== undefined && storedValue !== +input && input !== ''
			|| storedValue === +input) {
				/* Example: displayed equation is "1 + 2" or "2 + 2" and an operator is clicked */
                signNow = operator.textContent;
                storedValue = operate(signThen, storedValue, +input);
                equation.textContent = storedValue + ' ' + signNow + ' ';
                input = '';
                signThen = signNow;
            }
            else if (/[0-9] [^0-9] [0-9]/.test(equation.textContent) && result.textContent !== '') {
				/* Example: displayed equation is "3 + 2" and "=" was clicked before the operator */
                equation.textContent = result.textContent + ' ' + operator.textContent + ' ';
                storedValue = +result.textContent;
                result.textContent = '';
                signThen = operator.textContent;
            }
            else if (equation.textContent.split(' ')[2] === '') {
				/* When the user wants to change the selected operator */
				/* Example: displayed equation is "3 + " */
                equation.textContent = equation.textContent.replace(/ [^0-9]/, ' ' + operator.textContent);
                signThen = operator.textContent;
            }
            else if (storedValue !== undefined && input === '') {
                signThen = operator.textContent;
                equation.textContent += ' ' + operator.textContent + ' ';
            }
            else {
				/* When there's only one number and no operator in the equation */
                equation.textContent += ' ' + operator.textContent + ' ';
                storedValue = +input;
                signThen = operator.textContent;
                input = '';
            }
}

function listenForOperatorClick() {
    operators.forEach((operator) => {
        operator.addEventListener('click', () => {
            handleOperator(operator);
        })
    });
}

function listenForOperatorKeyDown() {
	const currentOperators = ['+', '-', '/', '*', '%'];

	window.addEventListener('keydown', (e) => {
		if (currentOperators.includes(e.key))
		{
			const dummyElement = document.createElement('div');
			if (e.key == '*')
			{
				dummyElement.textContent = '×';
			}
			else if (e.key == '/')
			{
				dummyElement.textContent = '÷';;
			}
			else if (e.key == '-')
			{
				dummyElement.textContent = '–';
			}
			else
			{
				dummyElement.textContent = e.key;
			}

			handleOperator(dummyElement);
		}
	});
}

function handleEqual() {
	if (signNow === undefined && signThen !== undefined && input !== '') {
		result.textContent = operate(signThen, storedValue, +input);
		storedValue = +result.textContent;
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
		result.textContent = operate(signThen, storedValue, +input);
		storedValue = +result.textContent;
		input = '';
	}
}

function listenForEqualClick() {
    equal.addEventListener('click', () => {
        handleEqual();
    });
}

function listenForEqualKeyDown() {
	window.addEventListener('keydown', (e) => {
		if (e.key == '=')
		{
			handleEqual();
		}
	});
}

let storedValue;
let input = '';
let equation = document.querySelector('.equation');
let result = document.querySelector('.result');
const numberButtons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
let signThen;
let signNow;
const ce = document.querySelector('.ce');
const c = document.querySelector('.c');

ce.addEventListener('click', () => {
    if (result.textContent !== '') {
        result.textContent = result.textContent;
    } else {
        let array = equation.textContent.split(/ /);
        array = array.slice(0, array.length - 1);
        equation.textContent = array.join(' ') + ' ';
        input = '';
    }
});
c.addEventListener('click', () => {
    input = '';
    result.textContent = '';
    equation.textContent = '';
    storedValue = undefined;
    signThen = undefined;
    signNow = undefined;
});

listenForOperandClick();
listenForOperandKeyDown();
listenForOperatorClick();
listenForOperatorKeyDown();
listenForEqualClick();
listenForEqualKeyDown();