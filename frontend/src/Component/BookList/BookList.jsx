import styles from './BookList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBook } from '../../redux/books/actionCreators';
function BookList() {
  const dispatch = useDispatch();
  // из за того, что мы вызвали внешнюю функцию useSelector
  // react будет выполнять ререндеринг функции BookList
  // при изменении состояния books
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
            <li key={book.id}>
              <div className={styles['book-info']}>
                {++i}. {book.title} by <strong> {book.author}</strong>
              </div>
              <div className={styles['book-actions']}>
                {/* <button onClick={() => console.log(deleteBook(book.id))}></button> */}
                <button onClick={() => dispatch(deleteBook(book.id))}>
                  Delete
                </button>
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
