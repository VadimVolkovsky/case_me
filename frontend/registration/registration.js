/* 1 вариант кода, который относится к стилям в registration.css */
import React, { useState } from 'react';

const Checkbox = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(prevChecked => !prevChecked);
  };

  return (
    <div className="checkbox-container">
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <span className={`checkmark ${checked ? 'checked' : ''}`} />
    </div>
  );
};

export default Checkbox;

