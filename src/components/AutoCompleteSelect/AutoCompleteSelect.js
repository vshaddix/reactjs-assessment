import React from "react";

export default ({ onInput, onSelect, values, placeholder }) => {
  if (! values) return '';

  const options = values.map(value => <option key={value.id} value={value.id}>{value.text}</option>);

  return (
    <div>
      <div className="ui input">
        <input type="text" placeholder={`Search for a ${placeholder} ...`} onInput={(e) => onInput(e.target.value)} />
      </div>
      <select placeholder={`Select ${placeholder}`} onChange={e => onSelect(e.target.value)}>
        <option value="">Select {placeholder}</option>
        {options}
      </select>
    </div>
  );
};
