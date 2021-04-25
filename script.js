const transactionUl = document.querySelector('#transactions') // invoca a class do html
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmout = document.querySelector('#amount')


const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ?  localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => 
        transaction.id !== ID)
    updateLocalStorage()    
    init()
}

const addTransactionIntoDOM = transaction => {
   const operator = transaction.amount < 0? '-' : '+' //if and else
   const CSSClass = transaction.amount < 0? 'minus' : 'plus'
   const amountWithOutOperator = Math.abs(transaction.amount)
   const li = document.createElement('li')

   li.classList.add(CSSClass)
   li.innerHTML = `
   ${transaction.name} 
   <span>${operator} R$ ${amountWithOutOperator.toFixed(2)}</span>
   <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
   `
  transactionUl.append(li)
}
const updateBalanceValues = () =>  {
    const transactionsAmounts = transactions
        .map(transaction => transaction.amount)
    const total =  transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0) // soma o array inteiro
        .toFixed(2) // tofixed define os decimais
    const income = transactionsAmounts
        .filter(value => value > 0)//filtrando o array
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
    const expense = Math.abs(transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2)  

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init  = () => {
    transactionUl.innerHTML = ''     
    transactions.forEach(addTransactionIntoDOM)//adiciona as transacoes
    updateBalanceValues()
} 
init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateId = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmout.value.trim()

    if(transactionName === '' || transactionAmount === ''){
        alert('Caixa Vazia!!\nPor favor, Adicione corretamente os dados nas caixas de texto!!')
        return
    }
    const transaction  = {
        id: generateId(),
        name: transactionName,
        amount: Number(transactionAmount) // converte string para numero
    }

    transactions.push(transaction)
    init()
    updateLocalStorage()

    inputTransactionAmout.value = ''
    inputTransactionName.value = ''

})