import { useEffect, useState } from "react";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseTable from "./Components/ExpenseTable";
import "./App.css";
import expenseData from "../../expenseData";

function App() {
  const [expenses, setExpenses] = useState(expenseData);
  const [filterOption, setFilterOption] = useState("All");
  const [filteredArray, setFilteredArray] = useState(expenses);
  const [rowId, setRowID] = useState('')
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });

  const [editingRowId, setEditingRowId] = useState('');

  useEffect(() => {
    if (filterOption === "All") {
      setExpenses(expenses);
    }
    if (filterOption !== "") {
      setFilteredArray(expenses.filter((e) => e.category == filterOption));
    } else {
      setFilteredArray(expenses);
    }
  }, [filterOption, expenses]);

  return (
    <>
      <main>
        <h1>Track Your Expense</h1>
        <div className="expense-tracker">
          <ExpenseForm
            expense={expense}
            setExpense={setExpense}
            setExpenses={setExpenses}
            editingRowId={editingRowId}
            setEditingRowId={setEditingRowId}
            />
          <ExpenseTable
            expense={expense}
            setExpense={setExpense}
            filteredArray={filteredArray}
            setFilteredArray={setFilteredArray}
            expenses={expenses}
            setExpenses={setExpenses}
            filterOption={filterOption}
            setFilterOption={setFilterOption}
            editingRowId={editingRowId}
            setEditingRowId={setEditingRowId}
            rowId={rowId}
            setRowID={setRowID}
          />
        </div>
      </main>
    </>
  );
}

export default App;
