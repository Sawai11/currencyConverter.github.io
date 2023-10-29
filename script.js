const currencyOneElement = document.getElementById('currency-one');
const amountOneElement = document.getElementById('amount-one');
const currencyTwoElement = document.getElementById('currency-two');
const amountTwoElement = document.getElementById('amount-two');
const rateElement = document.getElementById('rate');
const swapButton = document.getElementById('swap');

function calculate() {
    const currency_one = currencyOneElement.value;
    const currency_two = currencyTwoElement.value;

    // Add loading state
    rateElement.innerText = 'Calculating...';

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currency_two];

            // Add a delay for a more natural effect
            setTimeout(() => {
                rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
                amountTwoElement.value = (amountOneElement.value * rate).toFixed(2); // Limit to two decimal places
            }, 500); // Delay for 500 milliseconds
        });
}

function swap() {
    // Add a swap animation effect
    currencyOneElement.style.transform = 'scale(1.1)';
    currencyTwoElement.style.transform = 'scale(1.1)';

    const temp = currencyOneElement.value;
    currencyOneElement.value = currencyTwoElement.value;
    currencyTwoElement.value = temp;

    // Reset the scale after a short delay
    setTimeout(() => {
        currencyOneElement.style.transform = 'scale(1)';
        currencyTwoElement.style.transform = 'scale(1)';
    }, 300); // Reset scale after 300 milliseconds

    calculate();
}

currencyOneElement.addEventListener('change', calculate);
amountOneElement.addEventListener('input', calculate);
currencyTwoElement.addEventListener('change', calculate);
amountTwoElement.addEventListener('input', calculate);
swapButton.addEventListener('click', swap);