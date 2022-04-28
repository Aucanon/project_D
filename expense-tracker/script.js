var balance = document.querySelector('#balance')
var moneyInc = document.querySelector('.money-ld')
var moneyExp = document.querySelector('.money-rd')
var list = document.querySelector('#list')
var iptText = document.querySelector('#text')
var iptAmount = document.querySelector('#amount')
var form = document.querySelector('.form')
var localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
var transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function addTransaction(e) {
    e.preventDefault();
    if (iptText.value.trim() === '' || iptAmount.value.trim() === '') {
        alert('please input text and amount!')
    } else {
        var transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(transaction)
        addTransactionDOM(transaction)
        updateValues()
        updateLocalStorage()
        iptText.value = ''
        iptAmount.value = ''
    }
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

function addTransactionDOM(transaction) {
    var sign = transaction.amount < 0 ? '-' : '+'
    var item = document.createElement('li')
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')
    item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span><button id="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`
    list.append(item)
}

function updateValues() {
    var amounts = transactions.map(transaction => transaction.amount)
    var total = amounts.reduce((prevalue, item) => prevalue + item, 0).toFixed(2)
    var income = amounts.filter(item => item > 0).reduce((prevalue, item) => prevalue + item, 0).toFixed(2)
    var expense = (amounts.filter(item => item < 0).reduce((prevalue, item) => prevalue + item, 0) * -1).toFixed(2)
    balance.innerHTML = `$${total}`
    moneyInc.innerHTML = `$${income}`
    moneyExp.innerHTML = `$${expense}`
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id)
    updateLocalStorage()
    init()
}

function init() {
    list.innerHTML = ''
    transactions.forEach(addTransactionDOM)
    updateValues()
}
init()
form.addEventListener('submit', addTransaction)