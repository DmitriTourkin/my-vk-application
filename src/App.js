import { useState, useEffect, useRef, createFactory } from 'react';
import './App.css';
import Component1 from './Component1';
import Component2 from './Component2';

function App() {
  const [taskNumber, setTaskNumber] = useState(0);
  
  const handleTaskChangeButton = () => {
    setTaskNumber(prevTaskNumber => prevTaskNumber === 0 ? 1 : 0);
  }

  return (
    <>
      <button className='button' onClick={handleTaskChangeButton}>Сменить задание</button>
      {!taskNumber ? (<Component1/> ) : (<Component2/>)}
    </>
  );
};

export default App;
