import React, { useState } from "react";
import "./../App.css";
import Input from "./Input";
import Select from "./Select";

function ExpenseForm({ expense, setExpense, setExpenses, editingRowId, setEditingRowId }) {
  const [errors, setErrors] = useState({});
  console.log(editingRowId)

  const validateConfig = {
    title: [
      { required: true, message: "Please enter title" },
      { minLength: 5, message: "Title should be at least 5 characters Long" },
    ],
    category: [{ required: true, message: "Please enter category" }],
    amount: [{ required: true, message: "Please enter amount" }],
  };

  const validate = (formData) => {
    let errorData = {};

    Object.entries(formData).forEach(([key, value]) => {
      // console.log("validateConfig[key]", validateConfig[key]);
      validateConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorData[key] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < 5) {
          errorData[key] = rule.message;
          return true;
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errorData[key] = rule.message;
          return true;
        }
      });
    });
    setErrors(errorData);

    return errorData;
  };

  const handleChange = (e) => {
    const { name } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateResult = validate(expense);
    if (Object.keys(validateResult).length) return;

    if(editingRowId){
      setExpenses((prevState)=>
        prevState.map((prevExpense)=>{
          if(expense.id === editingRowId){
            // console.log(expense)
              return {...expense, id:editingRowId}
          }
          return prevExpense
        })
      )
      setExpense({
        title: "",
        category: "",
        amount: "",
      })
      setEditingRowId('')
      return
    }

    setExpenses((prevState) => 
      [...prevState,
      { id: crypto.randomUUID(), ...expense },]

    );
    setExpense({
      title: "",
      category: "",
      amount: "",
    })
  };

  return (
    <div>
      <form className="expense-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <Input
            label="Title"
            id="title"
            name="title"
            value={expense.title}
            onChange={handleChange}
            error={errors.title}
          />
        </div>
        <div className="input-container">
          <Select
            label="Category"
            id="category"
            name="category"
            value={expense.category}
            onChange={handleChange}
            options={["Grocery", "Clothes", "Bills", "Education"]}
            defaultOption="Select Category"
            error={errors.category}
          />
        </div>
        <div className="input-container">
          <Input
            label="Amount"
            id="amount"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            error={errors.amount}
          />
        </div>
        <button className="add-btn">{editingRowId ? 'Save' : 'Add'}</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
