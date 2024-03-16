import { useState, useEffect, useRef, createFactory } from 'react';
import './App.css';


export default function Component1() {
  const [fact, setFact] = useState({});
  const textareaRef = useRef(null);

  const handleButtonClick = async () => {    
    let url = 'https://catfact.ninja/fact';
    const result = await fetch(url).then(data => data.json());
    setFact(result);
  }

  useEffect(() => {
    if (fact.fact) {
      textareaRef.current.focus();
      const firstWordEndIndex = fact.fact.indexOf(' ');
      textareaRef.current.setSelectionRange(firstWordEndIndex, firstWordEndIndex);
    }
  }, [fact]);

  return (
    <div>
      <h1>Нажми на кнопку, взберись на сопку!</h1>
      <textarea ref={textareaRef} className='fact-text' value={fact.fact} ></textarea><br/>
      <button className='button' onClick={handleButtonClick}>Получить факт</button>
    </div>
  )

}