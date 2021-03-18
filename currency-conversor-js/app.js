const currencyOneSelector = document.querySelector('[data-js="currency-one"]')
const currencyTwoSelector = document.querySelector('[data-js="currency-two"]')
const numberTimesCurrency = document.querySelector('[data-js="currency-one-times"]')
const convertedValueEl = document.querySelector('[data-js="converted-value"]')
const conversionPrecisionEl = document.querySelector('[data-js="conversion-precision"]')

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


const showExchageRate = async (currencyOne, currencyTwo) => {
    const exchangeRateData = await fetchExchangeRate(currencyOne)
    const currencyList = exchangeRateData.conversion_rates
    const exchangeRate = currencyList[currencyTwo]
    
    const getOptionsFromData = (selector, selectedCurrency) => 
        Object.keys(currencyList)
            .map(currency => addOption(selector, currency, selectedCurrency))
    
    getOptionsFromData(currencyOneSelector, currencyOne)
    getOptionsFromData(currencyTwoSelector, currencyTwo)
    

    convertedValueEl.textContent = exchangeRate.toFixed(2)

    numberTimesCurrency.addEventListener('input', e => {
        const inputValue = e.target.value

        if (inputValue > 0) {
            convertedValueEl.textContent = (inputValue * exchangeRate)
                .toFixed(2)
        }
    })

    conversionPrecisionEl.textContent = 
        `1 ${currencyOne} = ${exchangeRate} ${currencyTwo}`
}

const startDefaultExchange = () => {
    const defaultCurrencyOne = 'USD'
    const defaultCurrencyTwo = 'BRL'

    showExchageRate(defaultCurrencyOne, defaultCurrencyTwo)
}

startDefaultExchange()

currencyOneSelector.addEventListener('input', e => {
    const currencyTwo = currencyTwoSelector
        .options[currencyTwoSelector.selectedIndex].value
    showExchageRate(e.target.value, currencyTwo)
})

currencyTwoSelector.addEventListener('input', e => {
    const currencyOne = currencyOneSelector
        .options[currencyOneSelector.selectedIndex].value
    showExchageRate(currencyOne, e.target.value)
})
