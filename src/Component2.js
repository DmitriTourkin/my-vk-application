import { useState, useEffect, useRef, createFactory } from 'react';
import { useForm } from 'react-hook-form';

import './App.css';

export default function Component2() {
  const [name, setName] = useState('');
  const guessNameRef = useRef('');
  const [isTyping, setIsTyping] = useState(false);
  let timer;

  const handleInputChange = (e) => {
    setName(e.target.value);
    setIsTyping(true);
    clearTimeout(timer);
    timer = setTimeout(() => {
      setIsTyping(false);
      setName(e.target.value);
      guessAgeByName();
    }, 3000);
  };

  const handleFormButton = (e) => {
    e.preventDefault();
    guessAgeByName();
  };

  const guessAgeByName = async () => {
    if (!isTyping) {
      console.log('Пользователь закончил ввод');
      const url = 'https://api.agify.io/?name=' + name;
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          const age = data.age;
          guessNameRef.current.textContent = age.toString();
        } else {
          throw new Error('Ошибка HTTP: ' + response.status);
        }
      } catch (error) {
        guessNameRef.current.textContent = 'Не получилось найти';
        console.error(error);
      }
    }
  }

  return (
    <div>
      <h1>Привет, а вот и форма!</h1>
      <form className='form'>
        <label>Имя</label>
        <input className='form-input' name='name' value={name} placeholder='Введите имя' onChange={handleInputChange}></input>
        <p ref={guessNameRef} className='guessed-name'></p>
        <button type='submit' className='button' onClick={handleFormButton}>Отправить</button>
      </form>
    </div>
  );
}
