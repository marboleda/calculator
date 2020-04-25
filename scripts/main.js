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

numButtons.forEach((button) => {
    button.addEventListener("click", (e) =>  {
        if (button.className == "num-button") {
            if (button.id == "zero-button" && currentNum == "" && values[values.length-1] == "÷") {
                alert("You cannot divide by 0!");
                displayValue = displayValue.substr(0, displayValue.length -2);
                values.pop();
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
        } else { // user clicks CE button
            displayValue = "";
            currentNum = "";
            values = [];
        }
        document.querySelector("#display").textContent = displayValue;
    });
});

