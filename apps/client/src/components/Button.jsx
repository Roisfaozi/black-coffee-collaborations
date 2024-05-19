import React from 'react';

export default function Button({ content, color = 'primary' }) {
  return (
    <button
      type="submit"
      className={`${color == 'primary' ? 'bg-primary' : 'bg-secondary'} w-full ${color == 'primary' ? 'text-white' : 'text-primary'} rounded-xl py-5 text-xl font-bold`}
    >
      {content}
    </button>
  );
}
