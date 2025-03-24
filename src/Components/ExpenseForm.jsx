import React, { use, useState } from "react";
import "./../App.css";

function ExpenseForm({ setExpenses }) {
  // const [title,setTitle] = useState('')
  // const [category, setCategory] = useState('All')
  // const [amount, setAmount] = useState('')
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //---------------------------------------------
    // setExpense((prev)=>[...prev, {...getFormData(e.target),id:crypto.randomUUID()}])
    // e.target.reset()
    //---------------------------------------------

    //---------------------------------------------
    // console.log(title, category,amount)
    // setExpense((prev)=>[...prev, {...getFormData(e.target),id:crypto.randomUUID()}])
    // e.target.reset()
    //---------------------------------------------

    setExpenses((prevState) => [
      [...prevState,{...expense, id: crypto.randomUUID()}]
    ]);
  };

  const getFormData = (form) => {
    const data = new FormData(form);
    for (const [key, value] of data.entries()) {
      console.log(key, value);
      data[key] = value;
    }
    return data;
  };

  return (
    <div>
      <form className="expense-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label for="title">Title</label>
          <input
            id="title"
            name="title"
            value={expense.title}
            onChange={(e) =>
              setExpense((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
          />
        </div>
        <div className="input-container">
          <label for="category">Category</label>
          <select
            id="category"
            name="category"
            value={expense.category}
            onChange={(e) =>
              setExpense((prevState) => ({
                ...prevState,
                category: e.target.value,
              }))
            }
          >
            <option value="" hidden>
              All
            </option>
            <option value="grocery">Grocery</option>
            <option value="clothes">Clothes</option>
            <option value="bills">Bills</option>
            <option value="education">Education</option>
            <option value="medicine">Medicine</option>
          </select>
        </div>
        <div className="input-container">
          <label for="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            value={expense.amount}
            onChange={(e) =>
              setExpense((prevState) => ({
                ...prevState,
                amount: e.target.value,
              }))
            }
          />
        </div>
        <button className="add-btn">Add</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
