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