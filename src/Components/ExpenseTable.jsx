import React, { useState } from "react";
import "./../App.css";
import ContextMenu from "./ContextMenu";

function ExpenseTable({
  filteredArray,
  setFilteredArray,
  filterOption,
  setFilterOption,
  expense,
  setExpense,
  expenses,
  rowId,
  setRowID,
  setExpenses,
  editingRowId,
  setEditingRowId,
}) {
  const handleOptionChange = (e) => {
    setFilterOption(e.target.value);
  };

  const optionsData = ["Grocery", "Clothes", "Bills", "Education"];
  let total = filteredArray.reduce((acc, amt) => acc + Number(amt.amount), 0);

  let [position, setPosition] = useState({});
  const [sortCallback, setSortCallback] = useState(() => () => {});

  console.log(sortCallback);

  return (
    <>
      <ContextMenu
        editingRowId={editingRowId}
        expense={expense}
        setExpense={setExpense}
        position={position}
        setPostion={setPosition}
        expenses={expenses}
        setExpenses={setExpenses}
        rowId={rowId}
        setRowID={setRowID}
        setEditingRowId={setEditingRowId}
      />
      <table
        className="expense-table"
        onClick={() => {
          if (position.left || position.top) {
            setPosition({});
          }
        }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>
              <select value={filterOption} onChange={handleOptionChange}>
                <option value="">All</option>
                {optionsData.map((option, i) => (
                  <option value={option} key={i}>
                    {option}
                  </option>
                ))}
              </select>
            </th>
            <th className="amount-column">
              <div>
                <span>Amount</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={() => {
                    setSortCallback(() => (a, b) => a.amount - b.amount);
                  }}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={() => {
                    setSortCallback(() => (a, b) => b.amount - a.amount);
                  }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredArray
            .sort(sortCallback)
            .map(({ id, title, category, amount }) => (
              <tr
                key={id}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setPosition({ left: e.clientX, right: e.clientY });
                  setRowID(id);
                }}
              >
                <td>{title}</td>
                <td>{category}</td>
                <td>{amount}</td>
              </tr>
            ))}
          <tr>
            <th>Total</th>
            <th
              className="clear-sort"
              onClick={() => {
                setSortCallback(() => () => {});
              }}
            >
              Clear Sort
            </th>

            <th>{total}</th>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ExpenseTable;
