import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required()
}).required();

export default function Component2() {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [name, setName] = useState('');
  const guessNameRef = useRef('');
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

  useEffect(() => {
    if (name.trim() !== '') {
      timer = setTimeout(() => {
        guessAgeByName();
        console.log('в useEffect вызов функции')
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [name]);

  const handleFormButton = (e) => {
    e.preventDefault();
    if (!cachedResponses[name]) {
      guessAgeByName();
    } else {
      guessNameRef.current.textContent = cachedResponses[name];
    }
  };

  const guessAgeByName = async () => {
    const url = 'https://api.agify.io/?name=' + name;
    try {
      const response = await fetch(url, { signal }, {method: 'GET'});
      if (response.ok) {
        const data = await response.json();
        const age = data.age;
        guessNameRef.current.textContent = age.toString();
        setCachedResponses((prevResponses) => ({ ...prevResponses, [name]: age.toString() }));
      } else {
        throw new Error('Ошибка HTTP: ' + response.status);
      }
    } catch (error) {
      guessNameRef.current.textContent = 'Не получилось найти. Проблема связи с сервером';
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Привет, а вот и форма!</h1>
      <form className='form'>
        <label>Имя</label>
        <input className='form-input' name='name' value={name} placeholder='Введите имя' onChange={(e) => setName(e.target.value)}></input>
        <p className='error-message'>{errors.firstName?.message}</p>
        <p ref={guessNameRef} className='guessed-name'></p>
        <button type='submit' className='button' onClick={handleFormButton}>Отправить</button>
      </form>
    </div>
  );
}
