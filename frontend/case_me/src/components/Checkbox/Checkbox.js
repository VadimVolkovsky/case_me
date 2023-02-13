import React, { useState, useRef } from 'react';
import checkedIcon from '../../img/checkbox-selected.svg';
import uncheckedIcon from '../../img/checkbox-default.svg';
import hoverIcon from '../../img/checkbox-hover.svg';
import './Checkbox.css';

function Checkbox({ id, name, required, onChange }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const checkboxImageContainer = useRef(null);

  const handleClick = (event) => {
    const clickedInside = event.target.closest('.checkbox-image-container') === checkboxImageContainer.current;
    if (clickedInside) {
      setIsChecked(!isChecked);
      if (onChange) {
        onChange(!isChecked);
      }
    }
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleUnhover = () => {
    setIsHovered(false);
  };

  return (
    <label className="registration__checkbox-label" htmlFor={id}>
      <input
        className="registration__checkbox"
        id={id}
        type="checkbox"
        name={name}
        required={required}
        checked={isChecked}
        onChange={handleClick}
      />
      <div
        className="checkbox-image-container"
        ref={checkboxImageContainer}
        onClick={handleClick}
        onMouseEnter={handleHover}
        onMouseLeave={handleUnhover}
      >
        {isChecked ? (
          <img src={checkedIcon} alt="checkbox-is-selected" />
        ) : isHovered ? (
          <img src={hoverIcon} alt="checkbox-is-hovered" onClick={handleClick} />
        ) : (
          <img src={uncheckedIcon} alt="checkbox-is-not-selected" />
        )}
      </div>
    </label>
  );
}

export default Checkbox;
