import React from "react";

function Select({ label, id, name, value, onChange, options, error }) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        // ref={categoryRef}
      >
        <option value="" hidden>
          All
        </option>
        {options.map((option,i) => (
          <option value={option.value} key={i}> {option} </option>
        ))}
      </select>
      <p className="error">{error}</p>
    </div>
  );
}

export default Select;
