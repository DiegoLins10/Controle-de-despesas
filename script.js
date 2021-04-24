const dummyTransactions = [ //criar array
    {id: 1, name: 'Bolo de brigadeiro', amount: -20},
    {id: 2, name: 'Salario', amount: 300},
    {id: 3, name: 'Torta de Frango', amount: -10},
    {id: 4, name: 'Violão', amount: 150}
]

const addTransactionIntoDOM = transaction => {
   const operator = transaction.amount < 0? '-' : '+' //if and else
   const CSSClass = transaction.amount < 0? 'minus' : 'plus'
   const li = document.createElement('li')

   li.classList.add(CSSClass)
   li.innerHTML = `
   ${transaction.name} <span>${operator} R$ ${transaction.amount}</span><button class="delete-btn">x</button>
   `
   console.log(li)
  
}

addTransactionIntoDOM(dummyTransactions[1])