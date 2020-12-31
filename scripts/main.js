let displayValue = "";
let currentNum = "";
let values = [];
const numButtons = document.querySelectorAll("button");


function add(num1, num2) {
    return (+num1) + (+num2);
}

function subtract(num1, num2) {
    return (+num1) - (+num2);
}

function multiply(num1, num2) {
    return (+num1) * (+num2);
}

function divide(num1, num2) {
        return (+num1) / (+num2);
}

function operate(operation, num1, num2) {
    switch(operation) {
        case "+":
            return add(num1,num2);
            break;
        case "-":
            return subtract(num1,num2);
            break;
        case "x":
            return multiply(num1,num2);
            break;
        case "÷":
            return divide(num1,num2);
            break;
        default:
            console.log("Invalid operation");
            return null;
            break;
    }
}

function isOperator(str) {
     return (str == "+" || str == "-" || str == "x" || str == "÷");
}

function equalsFunctionality(numsAndOperators) {
    let result;
    let highestPrecedenceIndex = 0;
    let currentPrecedenceValue = 0;
    while (numsAndOperators.length != 1) {

        for (let i = 0; i < numsAndOperators.length; i++) {
            if (numsAndOperators[i] == "x" || numsAndOperators[i] == "÷") {
                if (currentPrecedenceValue < 14) {
                    currentPrecedenceValue = 14;
                    highestPrecedenceIndex = i;
                }
            } else if (numsAndOperators[i] == "+" || numsAndOperators[i] == "-") {
                if (currentPrecedenceValue < 13) {
                    currentPrecedenceValue = 13;
                    highestPrecedenceIndex = i;
                }
            }
        }
        result = operate(numsAndOperators[highestPrecedenceIndex],
                         numsAndOperators[highestPrecedenceIndex-1],
                         numsAndOperators[highestPrecedenceIndex+1]);
   
        values[highestPrecedenceIndex+1] = result;
        values.splice(highestPrecedenceIndex-1, 2);
    }
    return Number(result.toFixed(2));
}

function decimalAlreadyPresent() {
    return currentNum.includes('.');
}

function divisionByZeroResponse() {
    alert("You cannot divide by 0!");
    displayValue = displayValue.substr(0, displayValue.length -2);
    values.pop();
}

function equalsButtonHandler() {
    if (currentNum != "") {
        values.push(currentNum);
    }
    if (isOperator(values[values.length-1]) ||
        values.length == 0) {
            alert("Invalid input!");
    } else {
        currentNum = equalsFunctionality(values);
        values = [currentNum];
        displayValue = currentNum;
        currentNum = "";
    }    
}

numButtons.forEach((button) => {
    button.addEventListener("click", (e) =>  {
        if (button.className == "num-button") {
            if (button.id == "zero-button" && currentNum == "" && values[values.length-1] == "÷") {
                divisionByZeroResponse();
            } else if (button.id == "decimal-button" && decimalAlreadyPresent()) {
                alert("Your current number already has a '.'!");
            } else {
                displayValue += button.textContent;
                currentNum += button.textContent;
            }
        } else if (button.className == "operator-button" && button.id != "equals-button") {
            if (currentNum != "") {
               values.push(currentNum);
            }
            values.push(button.textContent);
            currentNum = "";
            displayValue += " " + button.textContent + " ";
        } else if (button.id == "equals-button") {
            equalsButtonHandler();
        } else { // user clicks CE button
            displayValue = "";
            currentNum = "";
            values = [];
        }
        document.querySelector("#display").textContent = displayValue;
    });
});

//Add keyboard support
window.addEventListener('keydown', (e) => {
    const validNumberKeys= ['1','2','3','4','5','6','7','8','9','0'];
    const validOperationKeys = ['+','-','*','/'];

    if (e.key == '0' && currentNum == "" && values[values.length-1] == '÷') {
        divisionByZeroResponse();  
    } else if (e.key == '.' && decimalAlreadyPresent()) {
        alert("Your current number already has a '.'!");       
    } else if (validNumberKeys.includes(e.key)) {
        displayValue += e.key;
        currentNum += e.key;
    } else if (validOperationKeys.includes(e.key)) {
        if (currentNum != "") {
            values.push(currentNum);
        }
        let keyTranslation;
        if (e.key === '*') {
            keyTranslation = 'x';
        } else if (e.key === '/') {
            keyTranslation = '÷';
        } else {
            keyTranslation = e.key;
        }
        values.push(keyTranslation);
        currentNum = "";
        displayValue += " " + keyTranslation + " ";     
    } else if (e.key == '=' || e.key == 'Enter') {
        equalsButtonHandler();
    }
    document.querySelector("#display").textContent = displayValue;
});
