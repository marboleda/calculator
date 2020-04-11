let displayValue = "";
let currentNum = "";
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
            currentNum += button.textContent;
        } else if (button.className == "operator-button" && button.id != "equals-button") {
            values.push(currentNum);
            values.push(button.textContent);
            currentNum = "";
            displayValue += " " + button.textContent + " ";
        } else if (button.id == "equals-button") {
            console.log(values);
            if (currentNum != "") {
                values.push(currentNum);
            }
            if (values[values.length-1] == "x" ||
                values[values.length-1] == "÷" ||
                values[values.length-1] == "+" ||
                values[values.length-1] == "-" ||
                values.length == 0) {
                    alert("Invalid input!");
            } else {
                currentNum = equalsFunctionality(values);
                values = [currentNum];
                displayValue = currentNum;
                currentNum = "";
                console.log(values);
            }
        } else {
            displayValue = "";
            currentNum = "";
            values = [];
        }
        document.querySelector("#display").textContent = displayValue;
    });
});

