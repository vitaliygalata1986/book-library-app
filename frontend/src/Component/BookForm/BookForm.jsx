import styles from './BookForm.module.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addBook } from '../../redux/books/actionCreators';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    // здесь будет действие - будем выполнять операцию dispatch action
    event.preventDefault();
    if (title && author) {
      // dispatch action
      const book = {
        title,
        author,
      };
      console.log(addBook(book));
      dispatch(addBook(book)); // вызвав addBook мы получим объект с type/payload
      // этот объект мы передаем в функцию dispatch
      setTitle('');
      setAuthor('');
    }
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
      </form>
    </div>
  );
}
{
}
export default BookForm;
