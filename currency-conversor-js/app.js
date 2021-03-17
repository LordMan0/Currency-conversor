const currencyOneSelector = document.querySelector('[data-js="currency-one"]')
const currencyTwoSelector = document.querySelector('[data-js="currency-two"]')
const currencyTimes = document.querySelector('[data-js="currency-times"]')
const convertedValueEl = document.querySelector('[data-js="converted-value"]')

const apiKey = '8a4f7eac12f86a8d5f9b0db8'
const baseUrl = currency => 
    `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}`

const fetchExchangeRate = async (currency) => {
    try {
        const response = await fetch(baseUrl(currency))
        return response.json()
    } catch ({ name, message }) {
        alert(`${name}: ${message}`)
    }
}
    
const selectACurrency = (currency, selectedCurrency) =>     
    currency === selectedCurrency ? 'selected' : ''

const addOption = (selector, currency, selectedCurrency) => {
    selector.innerHTML +=
        `<option value="${currency}"${selectACurrency(currency, selectedCurrency)}>${currency}</option>`
}


const init = async () => {
    const exchangeRateData = await fetchExchangeRate('USD')

    const getOptionsFromData = (selector, selectedCurrency) => 
        Object.keys(exchangeRateData.conversion_rates)
        .map(currency => addOption(selector, currency, selectedCurrency))

    getOptionsFromData(currencyOneSelector, 'USD')
    getOptionsFromData(currencyTwoSelector, 'BRL')

    convertedValueEl.textContent = exchangeRateData.conversion_rates.BRL.toFixed(2)
    console.log(currencyOneSelector.value)
}

init()