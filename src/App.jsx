import { useState } from 'react'
import ExpenseForm from './Components/ExpenseForm'
import ExpenseTable from './Components/ExpenseTable'

import './App.css'
import expenseData from '../../expenseData'

function App() {
  const [expenses, setExpenses] = useState(expenseData)
  console.log(expenses)

  return (
    <>
      <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
      <ExpenseForm setExpenses={setExpenses}/>
      <ExpenseTable expenses={expenses} setExpenses={setExpenses}/>
        <div className="context-menu">
            <div>Edit</div>
            <div>Delete</div>
        </div>
      </div>
    </main>
    </>
  )
}

export default App
