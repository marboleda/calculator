let displayValue = "";
let currentNumDisplayValue = "";
let values = [];

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
            break;
    }
}

function equalsFunctionality(numsAndOperators) {
    let result;
    let highestPrecedenceIndex = 0;
    let currentPrecedenceValue = 0;
    console.log(numsAndOperators);
    while (numsAndOperators.length != 1) {

        for (let i = 0; i < numsAndOperators.length; i++) {
            if (numsAndOperators[i] == "x" || numsAndOperators[i] == "÷") {
                if (currentPrecedenceValue < 14) {
                    currentPrecedenceValue = 14;
                    highestPrecedenceIndex = i;
                }
            } else {
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
        console.log(numsAndOperators);
    }
    return result;
}

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
            values.push(currentNumDisplayValue);
            currentNumDisplayValue = equalsFunctionality(values);
            values = [currentNumDisplayValue];
            displayValue = currentNumDisplayValue;
        } else {
            displayValue = "";
        }
        document.querySelector("#display").textContent = displayValue;
    });
});

