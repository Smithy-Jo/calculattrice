document.addEventListener('DOMContentLoaded', function () {
    const screenResult = document.getElementById('screen_result');
    const clearButton = document.getElementById('btn_clear');
    const equalButton = document.getElementById('btn_equal');
    const numberButtons = document.querySelectorAll('.number');
    const operationButtons = document.querySelectorAll('.operation');

    let currentInput = '';
    let previousInput = '';
    let operation = '';

    // Fonction pour mettre à jour l'affichage sur l'écran
    function updateScreen() {
        screenResult.innerText = currentInput || '0';
    }

    // Fonction pour ajouter un chiffre ou un opérateur à l'entrée actuelle
    function appendInput(value) {
        if (value === '.' && currentInput.includes('.')) return;
        currentInput += value;
        updateScreen();
    }

    // Fonction pour effacer l'entrée actuelle
    function clearInput() {
        currentInput = '';
        updateScreen();
    }

    // Fonction pour effectuer le calcul
    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case 'x':
                result = prev * current;
                break;
            case '&divide;':
                if (current === 0) {
                    result = 'Error';
                } else {
                    result = prev / current;
                }
                break;
            default:
                return;
        }
        currentInput = result.toString();
        previousInput = '';
        operation = '';
        updateScreen();
    }

    // Ajouter des écouteurs d'événements pour les boutons de chiffre
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            appendInput(button.innerText);
        });
    });

    // Ajouter des écouteurs d'événements pour les boutons d'opération
    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentInput === '') return;
            if (previousInput !== '') {
                calculate();
            }
            operation = button.innerText;
            previousInput = currentInput;
            currentInput = '';
        });
    });

    // Ajouter un écouteur d'événement pour le bouton "Effacer"
    clearButton.addEventListener('click', clearInput);

    // Ajouter un écouteur d'événement pour le bouton "Égal"
    equalButton.addEventListener('click', calculate);
});
