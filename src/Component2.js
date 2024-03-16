import { useState, useEffect, useRef, createFactory } from 'react';
import './App.css';

export default function Component2() {
  const [name, setName] = useState(null);
  const guessNameRef = useRef('');

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

  return (
    <div>
        <h1>Привет, а вот и форма!</h1>
        <form class='form'>
          <label>Имя</label>
          <input className='form-input' name='name' id='name' value={name} placeholder='Введите имя' onChange={(e) => handleInputChange(e)}></input>
          <p ref={guessNameRef} className='guessed-name'></p>
          <button type='submit' className='button' onClick={(e) => handleFormButton(e)}></button>
        </form>
      </div>
  )
}