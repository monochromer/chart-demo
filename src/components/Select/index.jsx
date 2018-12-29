import React from 'react';
import './Select.css';

const Select = ({ options, ...restProps }) => {
  return (
    <select className="Select" {...restProps}>
      {options.map((option) => {
        return (
          <option
            key={option.value}
            value={option.value}
          >
            {option.text}
          </option>
        );
      })}
    </select>
  )
}

export default Select;