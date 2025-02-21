function toggleCalculator() {
    const calculator = document.getElementById("calculator");
    calculator.style.display = calculator.style.display === "none" || calculator.style.display === "" ? "block" : "none";
    
    const toggleButton = document.getElementById("chatbot-btn");
    toggleButton.style.display = toggleButton.style.display === "none" || calculator.style.display === "" ? "block" : "none";

    const closeButton = document.getElementById("calc-close-btn");
    closeButton.style.display = closeButton.style.display === "block" ? "none" : "block";

}

function appendCharacter(char) {
    document.getElementById("display").value += char;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function calculateResult() {
    let expression = document.getElementById("display").value;
    document.getElementById("display").value = evaluateExpression(expression);
}

function evaluateExpression(expression) {
    let tokens = expression.match(/\d+|[-+*/]/g);
    if (!tokens) return "Error";
    let values = [], operators = [];
    let precedence = {'+': 1, '-': 1, '*': 2, '/': 2};
    
    function applyOperator() {
        let b = values.pop(), a = values.pop(), op = operators.pop();
        if (op === '+') values.push(a + b);
        if (op === '-') values.push(a - b);
        if (op === '*') values.push(a * b);
        if (op === '/') values.push(b !== 0 ? a / b : 'Error');
    }
    
    for (let token of tokens) {
        if (!isNaN(token)) values.push(parseFloat(token));
        else {
            while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
                applyOperator();
            }
            operators.push(token);
        }
    }
    while (operators.length) applyOperator();
    return values[0];
}

function handleAge() {
    let year = Number(document.getElementById("dob").value.substring(0,4));
    let age = new Date().getFullYear() - year;

    document.getElementById("age").value = age;
}

function showError(message) {
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.innerText = message;

    // Show the error message
    document.getElementById('error-messages').appendChild(errorMessage);

    // Fade in effect
    setTimeout(() => {
        errorMessage.style.display = 'block';
    }, 100);
}

document.getElementById('contactForm').addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault(); // Prevent form submission to check for errors
    
    // Clear any existing error messages
    document.getElementById('error-messages').innerHTML = '';

    const age = document.getElementById('age').value;

    let hasErrors = false;

    // Validation for Age
    if (!age) {
        showError('Age is required.');
        hasErrors = true;
    } else if (isNaN(age) || age <= 0) {
        showError('Please enter a valid age.');
        hasErrors = true;
    }


    if (!hasErrors) {
        alert('Form submitted successfully!');
        event.target.submit();
    }
}
