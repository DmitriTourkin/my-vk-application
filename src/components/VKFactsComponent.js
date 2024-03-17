import { useState, useEffect, useRef } from 'react';
import '../app_versions/app-styles/App.css';
import { Div, Textarea, Button, FormItem} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';


const VKFactsComponent = () => {
  const [fact, setFact] = useState({});
  const textareaRef = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const errorRef = useRef(null);

  const handleButtonClick = async () => {    
    let url = 'https://catfact.ninja/fact';
    setLoading(true);
    try {
      let result = await fetch(url).then(data => data.json());
      errorRef.current.textContent = ''
      setFact(result)
      setLoading(false);
    } catch {
      errorRef.current.textContent = 'Проблема подключения к серверу.'
      setLoading(false);
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
      <Div>
      <h1>Нажми на кнопку, взберись на сопку!</h1>
        <FormItem top="Интересный факт">
          <Textarea 
            getRef={textareaRef} 
            onResize={textareaRef} 
            grow={false} 
            className="fact-text"
            aria-placeholder="Здесь будет ваша цитата дня"
            defaultValue={fact.fact}>
          </Textarea><br/>
          <Button 
            stretched={true}
            className="button"
            loading={isLoading} 
            rounded={true}
            size={'m'}
            onClick={handleButtonClick}>Получить факт
          </Button>
          <p ref={errorRef}></p>
        </FormItem>
      </Div>
  );
}

export default VKFactsComponent;