/**
 * Adds two numbers
 *
 * @param {number} n1 - The first number
 * @param {number} n2 - The seconf number
 *
 * @returns {number} The sum of n1 and n2
 */
function add(n1, n2) {
    return n1 + n2;
}

/**
 * Subtracts two numbers
 *
 * @param {number} n1 - The first number
 * @param {number} n2 - The seconf number
 *
 * @returns {number} The difference between n1 and n2
 */
function subtract(n1, n2) {
    return n1 - n2;
}

/**
 * Multiplies two numbers
 *
 * @param {number} n1 - The first number
 * @param {number} n2 - The seconf number
 *
 * @returns {number} The product of n1 and n2
 */
function multiply(n1, n2) {
    return n1 * n2;
}

/**
 * Divides two numbers
 *
 * @param {number} n1 - The first number
 * @param {number} n2 - The seconf number
 *
 * @returns {number} The quotient of dividing n1 and n2
 */
function divide(n1, n2) {
    return n1 / n2;
}

/**
 * Calculates the remainder of dividing two numbers
 *
 * @param {number} n1 - The first number
 * @param {number} n2 - The seconf number
 *
 * @returns {number} The remainder of dividing n1 and n2
 */

function remainder(n1, n2) {
    return n1 % n2;
}

/**
 * Carries out an operation on two operands
 *
 * @param {string} operator - An operator: +, -, *, ÷ or %
 * @param {number} n1 - The first operand
 * @param {number} n2 - The second operand
 *
 * @returns {number} The result of the operation
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

/**
 * Stores the received number
 *
 * @param {string} character - A number from 0 to 9, or a decimal point
 */
function receiveInput(character) {
	// Prevent inputting two decimal points in the same number
	if (input.includes('.') && character === '.') {
		input = input;
	}
	// When the equation is full and a result is displayed, start over
	else if (/[0-9]+ [^0-9] [0-9]+/.test(equation.textContent) && result.textContent !== '') {
		result.textContent = '';
		storedValue = undefined;
		input = character;
		equation.textContent = character;
	}
	// The case when the displayed equation isn't full. Ex: "2" or "7 + "
	// and the last entered input is an operand or an operator
	else {
		input += character;
		equation.textContent += character;
	}
}

/**
 * Captures mouse clicks on number buttons and stores selected (clicked) data
 */
function listenForOperandClick() {
	// The event listener is applied to number buttons from 0 to 9 and decimal point button
    numberButtons.forEach((numberButton) => {
        numberButton.addEventListener('click', () => {
            receiveInput(numberButton.textContent);
        });
    })
}

/**
 * Receives data when a key is pressed and applies styling to pressed keys
 */
function listenForOperandKeyDown() {
	const numbers = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	window.addEventListener('keydown', (e) => {
		if (numbers.includes(e.key))
		{
			receiveInput(e.key);

			// Add styling to a key when pressed
			if (e.key == '.') {
				const element = document.getElementById('d-point');
				element.classList.add('active');
			}
			else {
				const element = document.getElementById(`n${e.key}`);
				element.classList.add('active');
			}
		}
	});
	// Remove styling after releasing the key
	window.addEventListener('keyup', (e) => {
		if (numbers.includes(e.key)) {
			if (e.key == '.') {
				const element = document.getElementById('d-point');
				element.classList.remove('active');
			}
			else {
				const element = document.getElementById(`n${e.key}`);
				element.classList.remove('active');
			}
		}
	});
}

/**
 * Acts after receiving an operator input, in different situations
 *
 * @param {string} operator - An operator: +, -, *, ÷ or %
 */
function handleOperator(operator) {
	if (storedValue !== undefined && storedValue !== +input && input !== ''
			|| storedValue === +input) {
				// Example: displayed equation is "1 + 2" or "2 + 2" and an operator is clicked
                signNow = operator.textContent;
                storedValue = operate(signThen, storedValue, +input);
                equation.textContent = storedValue + ' ' + signNow + ' ';
                input = '';
                signThen = signNow;
            }
            else if (/[0-9]+ [^0-9] [0-9]+/.test(equation.textContent) && result.textContent !== '') {
				// Example: displayed equation is "3 + 2" and "=" was clicked before the operator
                equation.textContent = result.textContent + ' ' + operator.textContent + ' ';
                storedValue = +result.textContent;
                result.textContent = '';
                signThen = operator.textContent;
            }
            else if (equation.textContent.split(' ')[2] === '') {
				// When the user wants to change the selected operator 
				// Example: displayed equation is "3 + "
                equation.textContent = equation.textContent.replace(/ [^0-9]/, ' ' + operator.textContent);
                signThen = operator.textContent;
            }
            else if (storedValue !== undefined && input === '') {
                signThen = operator.textContent;
                equation.textContent += ' ' + operator.textContent + ' ';
            }
            else {
				// When there's only one number and no operator in the equation
                equation.textContent += ' ' + operator.textContent + ' ';
                storedValue = +input;
                signThen = operator.textContent;
                input = '';
            }
}

/**
 * Captures mouse clicks on operator buttons and passes
 * that data to be handled
 */
function listenForOperatorClick() {
    operators.forEach((operator) => {
        operator.addEventListener('click', () => {
			// Pass the received operator to be handled
            handleOperator(operator);
        })
    });
}

/**
 * Captures operator key presses and passes that data
 * to be handled. Also, it adds styling to pressed keys
 */
function listenForOperatorKeyDown() {
	const currentOperators = ['+', '-', '/', '*', '%'];

	window.addEventListener('keydown', (e) => {
		if (currentOperators.includes(e.key))
		{
			// Create a dummy element and make the operator be its text content,
			// because handleOperator function takes an element as a parameter
			const dummyElement = document.createElement('div');
			if (e.key == '*')
			{
				dummyElement.textContent = '×';

				// Add styling to key when pressed
				const element = document.querySelector('.multiplication');
				element.classList.add('active');
			}
			else if (e.key == '/')
			{
				dummyElement.textContent = '÷';
				const element = document.querySelector('.division');
				element.classList.add('active');
			}
			else if (e.key == '-')
			{
				dummyElement.textContent = '–';
				const element = document.querySelector('.subtraction');
				element.classList.add('active');
			}
			else if (e.key == '%')
			{
				dummyElement.textContent = e.key;
				const element = document.querySelector('.remainder');
				element.classList.add('active');
			}
			else
			{
				dummyElement.textContent = e.key;
				const element = document.querySelector('.addition');
				element.classList.add('active');
			}
			// Pass the received operator to be handled
			handleOperator(dummyElement);
		}
	});
	// Remove styling given to keys when they're released
	window.addEventListener('keyup', (e) => {
		if (e.key == '*')
			{
				const element = document.querySelector('.multiplication');
				element.classList.remove('active');
			}
			else if (e.key == '/')
			{
				const element = document.querySelector('.division');
				element.classList.remove('active');
			}
			else if (e.key == '-')
			{
				const element = document.querySelector('.subtraction');
				element.classList.remove('active');
			}
			else if (e.key == '%')
			{
				const element = document.querySelector('.remainder');
				element.classList.remove('active');
			}
			else if (e.key == '+')
			{
				const element = document.querySelector('.addition');
				element.classList.remove('active');
			}
	});
}

/**
 * Acts after receiving equal sign input, in different situations
 */
function handleEqual() {
	// When the displayed equation is only a number
	if (signThen === undefined && input !== '') {
		storedValue = +input;
		input = '';
	}
	// Do nothing if there's no input
	else if (storedValue !== undefined && input === '') {
		input = '';
	}
	// Do nothing if there's no input and no stored value
	else if (storedValue === undefined && input === '') {
		storedValue = undefined;
	}
	// When the displayed equation looks something like: "2 + 5" and = is pressed
	else {
		result.textContent = operate(signThen, storedValue, +input);
		storedValue = +result.textContent;
		input = '';
	}
}

/**
 * Captures mouse click on = button and calls
 * a function to handle that
 */
function listenForEqualClick() {
    equal.addEventListener('click', () => {
        handleEqual();
    });
}

/**
 * Captures a key press on = key and calls a function
 * to handle that. Also, adds styling to the pressed key
 */
function listenForEqualKeyDown() {
	window.addEventListener('keydown', (e) => {
		if (e.key == '=')
		{
			/* Add styling to equal key when pressed */
			const element = document.querySelector('.equal');
			element.classList.add('active');

			handleEqual();
		}
	});
	/* Remove styling given to equal key when released */
	window.addEventListener('keyup', (e) => {
		const element = document.querySelector('.equal');
		element.classList.remove('active');
	});
}

/**
 * Clears the input when the CE button is clicked or
 * when the delete key is pressed.
 */
function handleCE()
{
	// If = was pressed right before CE and a
	// result is displayed, do thing.
	if (result.textContent !== '') {
        result.textContent = result.textContent;
	// Clear the input
    } else {
        let array = equation.textContent.split(/ /);
        array = array.slice(0, array.length - 1);
        equation.textContent = array.join(' ') + ' ';
        input = '';
    };
}

// Stores the result of an operation on two numbers
let storedValue;
// Stores the recent inserted number
let input = '';
// Located at the top left corner of the display screen
let equation = document.querySelector('.equation');
// Located at the bottom right corner of the display screen
let result = document.querySelector('.result');
// 0 to 9 and .
const numberButtons = document.querySelectorAll('.number');
// %, ×, -, ÷ and +
const operators = document.querySelectorAll('.operator');
// =
const equal = document.querySelector('.equal');
// The previous operator
let signThen;
// The current operator
let signNow;
const ce = document.querySelector('.ce');
const c = document.querySelector('.c');

// Clear the recent input when CE button is clicked
ce.addEventListener('click', () => {
    handleCE();
});

// Clear the recent input when delete key is pressed,
// as well as add styling to the CE button
window.addEventListener('keydown', (e) => {
	if (e.key == 'Delete')
	{
		/* Add styling to CE key when pressed */
		const element = document.querySelector('.ce');
		element.classList.add('active');

		handleCE();
	}
});
// Remove the styling given to CE button when the
// delete key is released
window.addEventListener('keyup', (e) => {
	const element = document.querySelector('.ce');
	element.classList.remove('active');
});

// Clear all data when C button is clicked
c.addEventListener('click', () => {
    input = '';
    result.textContent = '';
    equation.textContent = '';
    storedValue = undefined;
    signThen = undefined;
    signNow = undefined;
});

// Act upon receiving a click on a number button
listenForOperandClick();
// Act upon receiving a number key press
listenForOperandKeyDown();

// Act upon receiving a click on an operator button
listenForOperatorClick();
// Act upon receiving an operator key press
listenForOperatorKeyDown();

// Act upon receiving a click on = button
listenForEqualClick();
// Act upon receiving an = key press
listenForEqualKeyDown();
