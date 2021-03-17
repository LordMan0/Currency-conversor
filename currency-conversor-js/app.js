const currencyOneSelector = document.querySelector('[data-js="currency-one"]')

const apiKey = '8a4f7eac12f86a8d5f9b0db8'
const baseUrl = currency => 
    `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}`

const addOption = currency => 
    currencyOneSelector.innerHTML += 
        `<option value="${currency}">${currency}</option>`

addOption('USD')
addOption('BRL')
addOption('ADN')

currencyOneSelector.addEventListener('input', e => {
    console.log(e.target.value)
})
