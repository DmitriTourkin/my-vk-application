import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().matches(/^[a-zA-Z]+$/, 'Имя должно содержать только буквы')
    .min(1, 'Имя должно состоять как минимум из одного символа')
    .required('Поле обязательно к заполнению')
}).required();

const FormGuessAgeClassic = ()=> {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema), mode: 'onBlur'
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
        if (cachedResponses[name] === undefined) { 
          guessAgeByName();
        } else {
          guessNameRef.current.textContent = cachedResponses[name];
        }
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [name]);

  const handleFormButton = (e) => {
    e.preventDefault();
    if (!errors.name) {
      if (cachedResponses[name] === undefined) {
        guessAgeByName();
      } else {
        guessNameRef.current.textContent = cachedResponses[name];
      }
    }
  };

  const guessAgeByName = async () => {
    const url = 'https://api.agify.io/?name=' + name;
    try {
      const response = await fetch(url, { signal }, {method: 'GET'});
      if (signal.aborted) { //Пропуск обработки ответа, если запрос был прерван
        return; 
      }
      if (response.ok) {
        const data = await response.json();
        const age = data.age;
        guessNameRef.current.textContent = age.toString();
        setCachedResponses((prevResponses) => ({ ...prevResponses, [name]: age.toString() }));
      } else {
        throw new Error('Ошибка HTTP: ' + response.status);
      }
    } catch (error) {
      guessNameRef.current.textContent = 'Не получилось найти. Кажется проблема связи с сервером';
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Привет, а вот и форма!</h1>
      <form className='form' onSubmit={handleSubmit(handleFormButton)}>
        <label>Имя</label>
        <input 
        {...register("name")}
            className='form-input' name='name' value={name} placeholder='Введите имя' onChange={(e) => setName(e.target.value)}></input>
        {errors?.name && <p>{errors?.name?.message}</p>}
        <p ref={guessNameRef} className='guessed-name'></p>
        <button type='submit' className='button' onClick={handleFormButton}>Отправить</button>
      </form>
    </div>
  );
}

export default FormGuessAgeClassic;
