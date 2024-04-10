const express = require('express');
const cors = require('cors');
const booksData = require('./data/books.json');

const app = express(); // создаем приложение, вызывая функцию express()

app.use(cors()); // применяем cors, чтобы не возникало ошибок cross origin resource sharing при обращении реакт приложения на бек-енд сервис, так как фроент-енд и бек-енд будет работать на разных адрессах и мы их запустим на разных портах

app.get('/random-book', (req, res) => {
  // обрабатываем запрос по такому пути: /random-book
  const randomIndex = Math.floor(Math.random() * booksData.length);
  const randmBook = booksData[randomIndex];
  res.json(randmBook); // для объекта res вызываем метод json() и передаем в него объект, который будет отправлен клиенту
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
