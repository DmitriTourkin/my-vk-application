import React, { useState, useEffect } from 'react';

export default function Component3() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  let timerId = null;

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);

    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fetchAge(newName);
    }, 3000);
  };

  const fetchAge = async (name) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.agify.io/?name=${name}`);
      const data = await response.json();
      setAge(data.age);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name"
      />
      {loading ? <p>Loading...</p> : <p>Age: {age}</p>}
    </div>
  );
};
