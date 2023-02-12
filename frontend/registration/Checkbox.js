import React, { useState } from 'react';
import checkedIcon from './reg-images/checkbox-selected.svg';
import uncheckedIcon from './reg-images/checkbox-default.svg';

function Checkbox() {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked);
  }

  return (
    <div onClick={handleClick}>
      {isChecked ? (
        <img src={checkedIcon} alt="checked" />
      ) : (
        <img src={uncheckedIcon} alt="unchecked" />
      )}
    </div>
  );
}

export default Checkbox;