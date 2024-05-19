import React from 'react';

export default function InputRadio({ value, name, content, color = 'primary' }) {
  return (
    <>
      <input
        type="radio"
        id={value}
        className={`${color == 'primary' ? 'checkRadio' : 'checkRadioSecondary'} hidden `}
        name={name}
        value={value}
      />
      <label htmlFor={value} className="btn-third mr-2 text-base font-black">
        {content}
      </label>
    </>
  );
}
