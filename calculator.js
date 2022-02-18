// List of HTML queryselectors. Num displays, Opr displays, Reset Button, Top and Main display. 
const displayValue = document.querySelector('#input');
const topDisplayValue = document.querySelector('#top-input');
const numButtons = document.querySelectorAll('.button-number');
const oprButtons = document.querySelectorAll('.button-symbol');
const resetButton = document.querySelector('#reset');



// Step 1: Create functions for the Add, Subtract, Divide, Multiply and test them in your browser’s console.
// paresInt turn the string values into number values.
let sum = 0;

const addfunction = (a,b) => {
    sum =  parseInt(a) + parseInt(b);
    return sum
};
const subtractFunction = (a,b) => {
    sum =  parseInt(a) - parseInt(b);
    return sum;
};
const divisionFunction = (a,b) => {
    sum =  parseInt(a) / parseInt(b);
    return sum
};
const multiplyFunction = (a,b) => {
    sum =  parseInt(a) * parseInt(b);
    return sum
};

// Step 2: Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.
// newOpr function: Resets oprClicked flag. Returns the sum as the new 'initial value' (firstNum). Clears the second num so user can input new num in the operate() function.
const newOpr = () => {
    oprClicked = false;
    oprStorage = '';
    firstNum = sum;
    secondNum = '';
};

const operator = (opr, num1, num2) => {
    switch (opr) {
        case '+':
            addfunction(num1, num2);
            newOpr();
            break;
        case '-':
            subtractFunction(num1, num2);
            newOpr();
            break;
        case '/':
            divisionFunction(num1, num2);
            newOpr();
            break;
        case 'x':
            multiplyFunction(num1, num2);
            newOpr();
    }
};

// Step 3: Create the functions that populate the display when you click the number buttons… you should be storing the ‘display value’ in a variable somewhere for use in the next step.
// Using the forEach method on numButtons in order to apply event listeners on the number displays.
// Initialized firstNum, secondNum, oprStorage. initalVal will be used later on in the oprButtons event listener. 

let oprClicked = false;
let oprStorage = '';
let firstNum = '';
let secondNum = '';
let initialVal = '';

numButtons.forEach(digit => {
    digit.addEventListener('click', function(){
        if (oprStorage === '' ) {
            firstNum += digit.value;
            return displayValue.textContent = firstNum;  
        } else 
            secondNum += digit.value;
            displayValue.textContent = secondNum;
                console.log('The second num is: ' + secondNum);
            topDisplayValue.textContent = `${initialVal} ${oprStorage} ${secondNum}`
    })
});

// Step 4:  You’ll need to store the first number that is input into the calculator when a user presses an operator, and also save which operation has been chosen and then operate() 
// on them when the user presses the “=” key.

oprButtons.forEach(operators => {
    operators.addEventListener('click', function() {
        if (operators.value !== '=') {
           operator(oprStorage, initialVal, secondNum);
           oprClicked = true;
           initialVal = firstNum;
            console.log(`The inital value is: ${initialVal}`);
           oprStorage = operators.value;
            console.log(`The first operator is: ${oprStorage}`);
            
            topDisplayValue.textContent = `${initialVal} ${oprStorage} ${secondNum}`;           

           
        } else if (operators.value === '=')
            operator(oprStorage, initialVal, secondNum);
            if (sum === Infinity){
                return displayValue.textContent = "Divide by 0? Nope!"            
            }
            displayValue.textContent = round(sum);
            secondNum = '';
            if (secondNum === '') {
                displayValue.textContent = round(sum);
                console.log(`The sum is: ${sum}`);
                return console.log('The initial value is ' + initialVal);
            }; 
            
    })
});


// Clear display function and initializes everything. Click listener for AC button. 

const clearDisplay = () => {
    document.getElementById('input').textContent= ''; 
    topDisplayValue.textContent = '';
    oprClicked = false;
    oprStorage = '';
    firstNum = '';
    secondNum = '';
    initialVal = '';
    sum = 0;
};

resetButton.addEventListener('click',clearDisplay);

// For users trying to divide by zero. Not complete.


// You should round answers with long decimals so that they don’t overflow the screen.

const round = (num) => {
    return +(Math.round(num + "e+2")  + "e-2");
}
