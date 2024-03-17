import { useState, useEffect, useRef, createFactory } from 'react';
import './App.css';
import Component1 from '../components/FactsComponentsClassic';
import Component2 from '../forms/GuessAgeFormClassic';
import FactsComponentClassic from '../components/FactsComponentsClassic';
import FormGuessAgeClassic from '../forms/GuessAgeFormClassic';

function App() {
  const [taskNumber, setTaskNumber] = useState(0);
  
  const handleTaskChangeButton = () => {
    setTaskNumber(prevTaskNumber => prevTaskNumber === 0 ? 1 : 0);
  }

  return (
    <>
      <button className='button' onClick={handleTaskChangeButton}>Сменить задание</button>
      {!taskNumber ? (<FactsComponentClassic/>) : (<FormGuessAgeClassic/>)}
    </>
  );
};

export default App;
