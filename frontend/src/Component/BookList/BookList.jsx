import styles from './BookList.module.css';
import { useSelector, UseSelector } from 'react-redux';
function BookList() {
  // из за того, что мы вызвали внешнюю функцию useSelector
  // react будет выполнять ререндеринг функции BookList
  // при изменении сосстояния books
  const books = useSelector((state) => {
    // обычно эта функция возвращет часть состояния
    return state.books;
    // books - это наш редюсер, который мы подключили к магазину
  });
  return (
    <div className={`${styles['app-block']} ${styles['book-list']}`}>
      <h2>Book List</h2>
      {books.length ? (
        <ul>
          {books.map((book, i) => (
            <li key={i}>
              <div className={styles['book-info']}>
                {++i}. {book.title} by <strong> {book.author}</strong>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
}

export default BookList;
