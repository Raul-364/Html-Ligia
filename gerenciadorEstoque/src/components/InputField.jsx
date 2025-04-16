import React from 'react';

const InputField = ({ id, name, type, placeholder }) => (
  <input
    id={id}
    name={name}
    type={type}
    required
    placeholder={placeholder}
    className="appearance-none relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
  />
);

export default InputField;
