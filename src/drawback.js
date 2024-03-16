const guessAgeByName = async () => {
  if (!fullName === false) {
    console.log('nothing');
  } else {
    setTimeout(() => {

      setFullName(name);
      const url = 'https://api.agify.io/?name=' + fullName;

      try {
        const result = fetch(url).then(data => data.json());
        const age = result.age;
        guessNameRef.current.textContent = age.toString();
      } catch {
        guessNameRef.current.textContent = 'Не получилось найти'
      }
    }, 3000)
  }
}


import { useState, useEffect, useRef } from 'react';

export default function Component2() {
  const [name, setName] = useState('Jackie');
  const guessNameRef = useRef('');
  const [isTyping, setIsTyping] = useState(false);
  const [cachedResponses, setCachedResponses] = useState({});

  let timer;
  let controller = new AbortController();
  let signal = controller.signal;

  useEffect(() => {
    return () => {
      controller.abort();
      controller = new AbortController();
      signal = controller.signal;
    };
  }, []);

  const handleInputChange = (e) => {
    setName(e.target.value);
    setIsTyping(true);
    clearTimeout(timer);
    timer = setTimeout(() => {
      setIsTyping(false);
      if (!cachedResponses[name]) {
        guessAgeByName();
      } else {
        guessNameRef.current.textContent = cachedResponses[name];
      }
    }, 3000);
  };

  const handleFormButton = (e) => {
    e.preventDefault();
    if (!cachedResponses[name]) {
      guessAgeByName();
    } else {
      guessNameRef.current.textContent = cachedResponses[name];
    }
  };

  const guessAgeByName = async () => {
    try {
      if (!isTyping) {
        console.log('Пользователь закончил ввод');
        const url = 'https://api.agify.io?name=' + name;
      
        const response = await fetch(url, { signal });
        if (response.ok) {
          const data = await response.json();
          const age = data.age;
          guessNameRef.current.textContent = age.toString();
          setCachedResponses((prevResponses) => ({ ...prevResponses, [name]: age.toString() }));
        } else {
          throw new Error('Ошибка HTTP: ' + response.status);
        }
      }
    } catch (error) {
      guessNameRef.current.textContent = 'Не получилось найти';
      console.error(error);
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