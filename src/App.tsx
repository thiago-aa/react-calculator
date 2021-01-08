import React, { useState, useEffect } from 'react';
import './App.css';
import { getTsBuildInfoEmitOutputFilePath, isFunctionOrConstructorTypeNode } from 'typescript';


function App() {
  const [display, setDisplay] = useState <string>('');
  const [error, setError] = useState <string>('');

  const keys: any[] = [ 
                'C', 'Del', '/', '*',
                7, 8, 9, '+',
                4, 5, 6, '-',
                1, 2, 3, '.',
                0, '='
              ]

  useEffect( () => 
  {
    if(error){
      setError('');
    }
  }, [display]);

  function doTheMath() {
    let result: number;
    try{
      setDisplay(`${eval(display)}`);
    }catch(err) {
     setError(`Invalid expression: ${err.message}`);
    }  
  }
  
  function handleClick (value: any) {
    switch (value) {
      case 'C':
        setDisplay('');
        break;
      case 'Del':
        setDisplay(display.slice(0, display.length-1));
        break;
      case '=':
        doTheMath();
        break;
      default:
        setDisplay(`${display}${value}`); 
    }
  }
  
  function addButtons(keys: any[]) {
    return keys.map(value => {
      let classe: string;
      classe = "button-number";
      if(isNaN(value)) {
        classe = "button";
      }else if(value === 0) {
        classe = "button-zero";
      }
      return <button 
        className={classe}
        key={value} 
        onClick={() =>handleClick(value)}
      >{value}</button>
    }) 
  }

  return (
   <div className="container">
      <div className="calculator">
        <div className="title">
          Calculator
        </div>
        <div className="display">
            <input 
              type="text" 
              className="display" 
              value={display}
              onChange={text =>
                setDisplay(text.target.value)
              }
              onKeyPress={value => {
                if(value.key === 'Enter') {
                  doTheMath();
                }
              }}
            />
        </div>
        {error && (
          <p className="error">{error}</p>
        )}
        <div className="keyboard">
          {addButtons(keys)}
        </div>
      </div>
   </div>
  );
}

export default App;