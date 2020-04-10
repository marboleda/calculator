function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operation, num1, num2) {
    switch(operation) {
        case "add":
            return add(num1,num2);
            break;
        case "subtract":
            return subtract(num1,num2);
            break;
        case "multiply":
            return multiply(num1,num2);
            break;
        case "divide":
            return divide(num1,num2);
            break;
        default:
            console.log("Invalid operation");
    }
}

function equalsFunctionality(numsAndOperators) {
    let result;
    let indexOfOperatorWithHighestPrecedence = 0;
    let currentPrecedenceValue = 0;
    while (numsAndOperators.length != 0) {
        for (let i = 0; i < numsAndOperators.length; i++) {
            if (numsAndOperators[i] == "x" || numsAndOperators[i] == "÷") {
                if (currentPrecedenceValue < 14) {
                    currentPrecedenceValue = 14;
                    indexOfOperatorWithHighestPrecedence = i;
                }
            } else {
                if (currentPrecedenceValue < 13) {
                    currentPrecedneceValue = 13;
                    indexOfOperatorWithHighestPrecedence = i;
                }
            }
        }
    }
}

let displayValue = "";
let currentNumDisplayValue = "";
let values = [];

const numButtons = document.querySelectorAll("button");

numButtons.forEach((button) => {
    button.addEventListener("click", (e) =>  {
        if (button.id != "clear" && button.className == "num-button") {
            displayValue += button.textContent;
            currentNumDisplayValue += button.textContent;
        } else if (button.className == "operator-button" && button.id != "equals-button") {
            values.push(currentNumDisplayValue);
            values.push(button.textContent);
            currentNumDisplayValue = "";
            displayValue += " " + button.textContent + " ";
        } else if (button.id == "equals-button") {

        } else {
            displayValue = "";
        }
        document.querySelector("#display").textContent = displayValue;
    });
});

