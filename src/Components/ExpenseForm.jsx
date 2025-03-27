import React, { use, useEffect, useRef, useState } from "react";
import "./../App.css";
import Input from "./Input";
import Select from "./Select";

function ExpenseForm({ setExpenses }) {
  // const [title,setTitle] = useState('')
  // const [category, setCategory] = useState('All')
  // const [amount, setAmount] = useState('')
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
    id: crypto.randomUUID(),
  });

  const [errors, setErrors] = useState({});

  // let myNum = 0
  // let myRef = useRef(myNum)

  // console.log(myRef)

  //--------- Differnce between useRef and useState --------//
  // When the element in useRef is upodated it does not re-render the element whereas useState do //

  // let titleRef = useRef()
  // let categoryRef = useRef()
  // let amountRef = useRef()

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

    const validateResult = validate(expense);
    console.log("Object.keys(validateResult) ", Object.keys(validateResult));

    if (Object.keys(validateResult).length) return;

    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
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

  // useEffect(()=>{
  //   console.log(titleRef)
  //   console.log(amountRef)
  //   console.log(categoryRef)
  // })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const validate = (formData) => {
    let errorData = {};

    if (!formData.title) {
      errorData.title = "Title is required";
    }
    if (!formData.category) {
      errorData.category = "Category is required";
    }
    if (!formData.amount) {
      errorData.amount = "Amount is required";
    }

    console.log("formData ", formData);
    setErrors(errorData);

    return errorData;
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
          options={['Grocery', 'Clothes', 'Bills', 'Education']}
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
        <button className="add-btn">Add</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
