import styles from './BookForm.module.css';
import { useState } from 'react';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const handleSubmit = (event) => {
    // здесь будет действие - будем выполнять операцию dispatch action
    event.preventDefault();
    if (title && author) {
      // dispatch action
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
