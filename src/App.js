import { useState, useEffect, useRef, createFactory } from 'react';
import './App.css';

function App() {
  const [taskNumber, setTaskNumber] = useState(0);
  const [fact, setFact] = useState({});
  const textareaRef = useRef(null);

  const [name, setName] = useState(null);
  const guessNameRef = useRef('');
  let timerId;


  const handleTaskChangeButton = () => {
    setTaskNumber(prevTaskNumber => prevTaskNumber === 0 ? 1 : 0);
  }
  
  const handleButtonClick = async () => {    
    let url = 'https://catfact.ninja/fact';
    const result = await fetch(url).then(data => data.json());
    setFact(result);
  }

  const handleFormButton = async (e) => {
    e.preventDefault();
    await guessAgeByName();
  }

  const handleInputChange = async (e) => {

    e.preventDefault();
    const name = e.target.value;
    setName(name);
    await guessAgeByName();
  }

  const guessAgeByName = async () => {
    const url = 'https://api.agify.io/?name=' + name;

    try {
      const result = await fetch(url).then(data => data.json());
      const age = result.age;
      guessNameRef.current.textContent = age.toString();
    } catch {
      guessNameRef.current.textContent = 'Не получилось найти'
    }
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
          <input className='form-input' name='name' id='name' value={name} placeholder='Введите имя' onChange={(e) => handleInputChange(e)}></input>
          <p ref={guessNameRef} className='guessed-name'></p>
          <button type='submit' className='button' onClick={(e) => handleFormButton(e)}></button>
        </form>
      </div>
    )}
    </>
  );
};

export default App;

