# Использование React-приложения. Профильное задание

Поскольку при клонировании репозитория файлы node_modules не переходят в проект, 
необходимо выполнить команду `npm install` — чтобы установить зависимости, описанные в package.json

# Версия Node.js 
Проект был написан на версии v14.21.3
К сожалению, пакеты npm были обновлены автоматически. После обновления NodeJS до версии v20.5.0,
а npm с версией v10.2.4, проект снова запускается. 

Если у Вас не совместим новый npm и NodeJS, необходимо сделать следующее:
1. Открыть проект в среде разработки
2. Открыть терминал. 
3. Установить новую версию NodeJS `nvm install 20.5.0`
4. Начать использовать новую версию NodeJS `nvm use 20.5.0`
5. Попробуйте npm install
6. Если возникла ошибка `must provide string spec (npm ERR!)`, а версии NodeJS и NPM -- необходимо 
7. **Переустановка зависимостей проекта**: удалить папку node_modules и файл package-lock.json, а затем установить зависимости заново:
   используя команду `rm -rf node_modules package-lock.json npm install`




### `npm start`
Чтобы запустить проект, нужно перейти в папку клонированного проекта, открыть терминал, ввести команду `npm start`

Приложение открывается, используя порт 5001. Его можно изменить в файле `package.json`.

Проект создан при помощи `npx create-react-app my-vk-application`
- vk-ui импортирован с помощью `npm i --save @vkontakte/vkui`
- yup установлен с помощью команды `npm i yup`
- Хук useForm установлен с помощью`npm install react-hook-form`
