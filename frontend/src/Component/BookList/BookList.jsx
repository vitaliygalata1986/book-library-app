import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import styles from './BookList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBook, toggleFaforite } from '../../redux/books/actionCreators';
import {
  selectTitleFilter,
  selectAuthorFilter,
} from '../../redux/slices/filterSlice';
function BookList() {
  const dispatch = useDispatch();
  // из за того, что мы вызвали внешнюю функцию useSelector
  // react будет выполнять ререндеринг функции BookList
  // при изменении состояния books

  // const titleFilter = useSelector((state) => state.filter.title);
  // или такой вариант
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter); // функцию selectAuthorFilter вызывать не нужно, это коллбэк функция, которая вызывается внутри useSelector (это внешняя функция, и благодаря этому реакт выполняет ререндеринг всего компонента, когда у нас меняется соответствующая часть состояния - state.filter.author)

  const books = useSelector((state) => {
    // обычно эта функция возвращет часть состояния
    return state.books;
    // books - это наш редюсер, который мы подключили к магазину
  });

  const handleToggleFavorite = (id) => {
    dispatch(toggleFaforite(id));
  };

  // метод includes всегда возвращает true, если мы ищем пустую строку в любой строке
  // получим новый массив отфильтрованных книг

  // const filteredBooks = books.filter(
  //   (book) =>
  //     book.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
  //     book.author.toLowerCase().includes(authorFilter.toLowerCase())
  // );

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    console.log(titleFilter);
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    return matchesTitle && matchesAuthor;
  });

  return (
    <div className={`${styles['app-block']} ${styles['book-list']}`}>
      <h2>Book List</h2>
      {filteredBooks.length ? (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={book.id}>
              <div className={styles['book-info']}>
                {++i}. {book.title} by <strong> {book.author}</strong>
              </div>
              <div className={styles['book-actions']}>
                <span onClick={() => handleToggleFavorite(book.id)}>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className={`${styles['star-icon']}`} />
                  ) : (
                    <BsBookmarkStar className={`${styles['star-icon']}`} />
                  )}
                </span>
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
