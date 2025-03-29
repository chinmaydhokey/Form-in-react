import { useEffect, useState } from 'react'
import ExpenseForm from './Components/ExpenseForm'
import ExpenseTable from './Components/ExpenseTable'
import './App.css'
import expenseData from '../../expenseData'

function App() {
  const [expenses, setExpenses] = useState(expenseData)  
  const optionsData=["Grocery", "Clothes", "Bills", "Education"]
  const [filterOption, setFilterOption] = useState()
  const [filteredArray, setFilteredArray] = useState(expenses)

  useEffect(()=>{
    console.log("Filter Option:", filterOption);
  console.log("Expenses:", expenses);
    if(filterOption !== ''){
      setFilteredArray(expenses.filter((e)=> e.category == filterOption))
    }else {
      setFilteredArray(expenses)
    }
  },[filterOption,expenses])

  return (
    <>
      <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
      <ExpenseForm setExpenses={setExpenses} />
      <ExpenseTable filteredArray={filteredArray} setExpenses={setExpenses} optionsData={optionsData} filterOption={filterOption} setFilterOption = {setFilterOption} />
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