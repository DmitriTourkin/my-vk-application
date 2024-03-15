import { useState, useEffect, useRef, createFactory } from 'react';
import './App.css';

function App() {
  const [taskNumber, setTaskNumber] = useState(0);
  const [fact, setFact] = useState({});
  const textareaRef = useRef(null);

  const handleTaskChangeButton = () => {
    setTaskNumber(prevTaskNumber => prevTaskNumber === 0 ? 1 : 0);
  }
  
  const handleButtonClick = async () => {    
    let url = 'https://catfact.ninja/fact';
    
    const result = await fetch(url).then(data => data.json());
    setFact(result);
  }

  const handleFormButton = () => {
    console.log('Нажато');
  }

  const handleInputChange = () => {
    console.log('hi');
  }

  useEffect(() => {
    if (fact.fact) {
      textareaRef.current.focus();
      const firstWordEndIndex = fact.fact.indexOf(' ');
      textareaRef.current.setSelectionRange(firstWordEndIndex, firstWordEndIndex);
    }
  }, [fact]);

  return (
    <>
    <button className='button' onClick={handleTaskChangeButton}>Сменить задание</button>
    {!taskNumber ? (
    <div>
      <h1>Нажми на кнопку, взберись на сопку!</h1>
      <textarea ref={textareaRef} className='fact-text' value={fact.fact} ></textarea><br/>
      <button className='button' onClick={handleButtonClick}>Получить факт</button>
    </div>
    ) : (
      <div>
        <h1>Привет, а вот и форма!</h1>
        <form class='form'>
          <label>Имя</label>
          <input className='form-input' placeholder='Введите имя' onChange={handleInputChange}></input>
          <button type='submit' className='button' onClick={handleFormButton}></button>
        </form>
      </div>
    )}
    </>
  );
};

export default App;

