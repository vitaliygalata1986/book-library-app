import styles from './BookForm.module.css';
import { createBookWidthId } from '../../utils/createBookWithId';
import { useDispatch } from 'react-redux';
import { setError } from '../../redux/slices/errorSlice';
// import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import booksData from '../../data/books.json';
import { addBook, fetchBooks } from '../../redux/slices/bookSlice';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length); // получим случайное число от 0 до длины массива
    // const randomBook = booksData.find((book, index) => index === randomIndex);
    const randomBook = booksData[randomIndex]; // в итоге randomBook будет одним объектом из массива booksData
    dispatch(addBook(createBookWidthId(randomBook, 'random')));
    /*
    const randomBookWidthId = {
      ...randomBook, // разделим на свойства объект randomBook
      isFavorite:false,
      id: uuidv4(),
    };
    dispatch(addBook(randomBookWidthId));
    */
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title && author) {
      dispatch(addBook(createBookWidthId({ title, author }, 'manual')));
      setTitle('');
      setAuthor('');
    } else {
      dispatch(setError('Please fill title and author'));
    }
  };

  const handleRandomViaApi = () => {
    dispatch(fetchBooks('http://localhost:4000/random-book')); // перадем в dispatch функцию fetchBooks
  };

  return (
    <div className={`${styles['app-block']} ${styles['book-form']}`}>
      <h2>Add new book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random
        </button>
        <button type="button" onClick={handleRandomViaApi}>
          Add Random via API
        </button>
      </form>
    </div>
  );
}
export default BookForm;
