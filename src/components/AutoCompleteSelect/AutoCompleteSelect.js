import React from "react";

export default ({ onInput, onSelect, values, placeholder }) => {
  const options = values.map(value => <option key={value} value={value}>{value}</option>);

  return (
    <div>
      <div className="ui input">
        <input type="text" placeholder={`Search for a ${placeholder} ...`} onInput={(e) => onInput(e.target.value)} />
      </div>
      <select placeholder={`Select ${placeholder}`} onSelect={e => onSelect(e.target.value)}>
        <option value="">Select {placeholder}</option>
        {options}
      </select>
    </div>
  );
};
