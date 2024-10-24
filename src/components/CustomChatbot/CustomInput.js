import React, { useState } from 'react';

const CustomInput = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== '') {
      // Process user input and generate reply
      const replyMessage = `You entered: ${inputValue}`;
      onSubmit(replyMessage);
      // Clear input field after submitting
      setInputValue('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CustomInput;
