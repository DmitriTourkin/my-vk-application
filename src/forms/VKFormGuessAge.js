import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { 
  Div, 
  FormField, 
  Button, 
  FormItem, 
  Paragraph, 
  FormLayoutGroup} 
from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const schema = yup.object({
  name: yup.string()
  .matches(/^[a-zA-Z]+$/, "Имя должно содержать только буквы")
}).required();

const VKFormGuessAge= () => {
  const { register, 
    handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema), mode: "all"
  });

  const [name, setName] = useState("");
  const guessNameRef = useRef("");
  const [cachedResponses, setCachedResponses] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [appearance, setAppearance] = useState("accent");
  const [aborted, setAborted] = useState(false);

  let timer;
  let controller = new AbortController();
  let signal = controller.signal;

  const settingLoading = (booleanType) => {
    setIsLoading(booleanType);
  };
  
  useEffect(() => {
    return () => {
      controller.abort();
      controller = new AbortController();
      signal = controller.signal;
    };
  }, []);

  useEffect(() => {
    setFormIsValid(nameIsValid);
  }, [nameIsValid]);

  useEffect(() => {
    if (name.trim() !== "" && nameIsValid) {
      timer = setTimeout(() => {
        if (cachedResponses[name] === undefined) { 
          guessAgeByName();
        } else {
          guessNameRef.current.textContent = cachedResponses[name];
        }
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [name, cachedResponses]);

  const handleInputChange = (e) => {
    abortFetching();
    setIsLoading(false);
    guessNameRef.current.textContent = " ";
    setAppearance("accent");
    setName(e.target.value);
    if (e.target.value.trim() !== "") {
      setNameIsValid(schema.fields.name.isValidSync(e.target.value));
    } else {
      setNameIsValid(false);
    };
  }

  const handleFormButton = (inputInfo) => {
    settingLoading(true);
    if (!errors.name) {
      if (cachedResponses[name] === undefined) {
        guessAgeByName();
      } else {
        setAppearance("neutral");
        guessNameRef.current.textContent = cachedResponses[name];
        setIsLoading(false);
      }
    }
  };

  async function abortFetching() {
    controller.abort();
    controller = new AbortController();
    signal = controller.signal;
  };
 
  const guessAgeByName = async () => {
    const url = 'https://api.agify.io/?name=' + name;
    try {
      const response = await fetch(url, { signal, method: "GET"});
      if (signal.aborted) { 
        return; 
      }
      if (response.ok) {
        const data = await response.json();
        const age = data.age;
        guessNameRef.current.textContent = age.toString();
        setCachedResponses((prevResponses) => ({ ...prevResponses, [name]: age.toString() }));
        settingLoading(false);
        
      } else {
        setIsLoading(false);
        guessNameRef.current.textContent = `Упс! Какая-то ошибка связи с сервером.`;
        throw new Error("Ошибка HTTP: " + response.status);
      }
    } catch (error) {
      guessNameRef.current.textContent = `К сожалению, не получилось что-либо найти с таким именем.`;
      setIsLoading(false);
    }
  }

  return (
    <Div>
      <h1>Привет, а вот и форма!</h1>
        <form onSubmit={handleSubmit(handleFormButton)}>
        <FormLayoutGroup className="form">
          <FormField>
            <FormItem 
              top="Имя"
              htmlFor="name"
              bottom={errors.name? `${errors.name?.message}` : ""}
              >   
              <input
                id="name" 
                type="text" 
                {...register("name")}
                className="form-input"
                name="name"
                value={name} 
                placeholder="Введите имя"
                onChange={(e) => handleInputChange(e)}
              />
            </FormItem>
          </FormField>
          <Button 
                isLoading={isLoading} 
                type="submit"
                className="button"
                disabled={!formIsValid}
                loading={isLoading}
                appearance={appearance}
                rounded={true}
                size={'m'}
              >
                Отправить
            </Button>
          <Div className="answer">
              <Paragraph getRootRef={guessNameRef} className="guessed-name"></Paragraph>
          </Div>
          </FormLayoutGroup>
        </form>
    </Div>
  );
}

export default VKFormGuessAge;
