/* 2-й вариант кода для чекбокса

To use the Checkbox component in another file, you'll need to import it. For example, if you have a file named App.js, you can use the Checkbox component like this:
*/

import React from 'react';
import Checkbox from './Checkbox';

function App() {
  return (
    <div className="App">
      <Checkbox />
    </div>
  );
}

export default App;

/*

To connect the CSS styles, you can either include them in a separate CSS file and import that file in your React component file, or you can include the styles in a style tag within the component file. Here's an example of the latter:

*/

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
      <style>
        {`
          .checkbox-container {
            display: inline-block;
            position: relative;
            padding-left: 35px;
            margin-bottom: 12px;
            cursor: pointer;
            font-size: 22px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }

          .checkbox-container input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }

          .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 25px;
            width: 25px;
            background-color: #eee;
            border-radius: 5px;
          }

          .checkbox-container:hover input ~ .checkmark {
            background-color: #ccc;
          }

          .checkbox-container input:checked ~ .checkmark {
            background-color: #2196F3;
          }

          .checkmark:after {
            content: "";
            position: absolute;
            display: none;
          }

          .checkbox-container input:checked ~ .checkmark:after {
            display: block;
          }

          .checkbox-container .checkmark:after {
            left: 9px;
            top: 5px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
          }
        `}
      </style>
    </div>
  );
};

export default Checkbox;
