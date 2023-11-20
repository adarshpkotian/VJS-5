let billInput = document.querySelector('.bill-input');
let peopleInput = document.querySelector('.people-input');
let customInput = document.querySelector('.custom');
let buttons = document.querySelectorAll('.button');
let activeButton = null;
let resetButton = document.querySelector('.reset-button');
let tipPercentage;
let billAmount;
let numberOfPeople;
let finalTip = document.querySelector('#tip-amount');
let finalTotal = document.querySelector('#total');

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    let thisTarget = event.target;
    if (activeButton) {
        activeButton.classList.remove('active-button');
        customInput.value = '';
    }
    thisTarget.classList.add('active-button');
    activeButton = thisTarget;
    tipPercentage = activeButton.id;
    splitBill(billAmount, numberOfPeople, tipPercentage);
  });
});

let customButton = document.querySelector('.custom');

customButton.addEventListener('input', () => {
  buttons.forEach((button) => {
    resetButton.classList.add('reset-active');
    button.classList.remove('active-button');
    tipPercentage = customButton.value;
    splitBill(billAmount, numberOfPeople, tipPercentage);
  });
  
});

[billInput, peopleInput].forEach((input) => {
    input.addEventListener('input', () => {
      if (billInput.value.trim() !== '' || peopleInput.value.trim() !== '') {
        resetButton.classList.add('reset-active');
      }
    });
  });

resetButton.addEventListener('click', () => {
    billInput.value = '';
    peopleInput.value = '';
    billWarning.classList.add('hidden');
    peopleWarning.classList.add('hidden');
    activeButton = null;
    tipPercentage = null;
    billAmount = null;
    numberOfPeople = null;
    finalTip.innerHTML = "$0.00";
    finalTotal.innerHTML = "$0.00";
    customButton.value = null;
});

let billWarning = document.querySelector('.bill-warning');
let peopleWarning = document.querySelector('.people-warning');

billInput.addEventListener('input', function() {
    if (isNaN(billInput.value) || billInput.value == 0){
      billWarning.classList.remove('hidden');
      billInput.classList.add('.warning-border');
    } else {
      billWarning.classList.add('hidden');
      billInput.classList.add('.warning-border');
    }  
    billAmount = billInput.value;
    splitBill(billAmount, numberOfPeople, tipPercentage);
});

peopleInput.addEventListener('input', function() {
    if (isNaN(peopleInput.value) || peopleInput.value == 0){
      peopleWarning.classList.remove('hidden');
      peopleInput.classList.add('.warning-border');
    } else {
      peopleWarning.classList.add('hidden');
      peopleInput.classList.add('.warning-border');
    }  
    numberOfPeople = peopleInput.value;
    
splitBill(billAmount, numberOfPeople, tipPercentage);
});

function splitBill(bA, nOP, tP) {
  if (bA && nOP && tP) {
    let totalTip = bA * (tP / 100);
    let tipPerPerson = totalTip / nOP;
    let amountPerPerson = bA / nOP;
    finalTip.innerHTML = "$" + tipPerPerson.toFixed(2);
    finalTotal.innerHTML = "$" + (amountPerPerson + tipPerPerson).toFixed(2);
  }
}
