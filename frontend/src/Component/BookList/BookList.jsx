import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import styles from './BookList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteBook,
  toggleFavorite,
  selectAllBooks,
} from '../../redux/slices/bookSlice';

import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from '../../redux/slices/filterSlice';
function BookList() {
  const dispatch = useDispatch();
  // из за того, что мы вызвали внешнюю функцию useSelector
  // react будет выполнять ререндеринг функции BookList
  // при изменении состояния books

  // const titleFilter = useSelector((state) => state.filter.title);
  // или такой вариант

  const books = useSelector(selectAllBooks);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter); // функцию selectAuthorFilter вызывать не нужно, это коллбэк функция, которая вызывается внутри useSelector (это внешняя функция, и благодаря этому реакт выполняет ререндеринг всего компонента, когда у нас меняется соответствующая часть состояния - state.filter.author)
  const onlyFavorityFilter = useSelector(selectOnlyFavoriteFilter);
  // console.log(onlyFavority); // изначально все false

  /*
  const books = useSelector((state) => {
    // обычно эта функция возвращет часть состояния
    return state.books;
    // books - это наш редюсер, который мы подключили к магазину
  });
  */

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
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
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    const matchesFavority = onlyFavorityFilter ? book.isFavorite : true;

    return matchesTitle && matchesAuthor && matchesFavority;
  });

  const highlightMatch = (text, filter) => {
    // console.log('text=>', text, 'filter=>', filter); // text=> King Lear filter=> Ki
    if (!filter) return text; // если фильтр не применен, то вернем текст без изменений
    // то мы не будем применять фон к тексту
    // иначе нужно разбить строку на строки и для некоторых добавить класс
    const regex = new RegExp(`(${filter})`, 'gi');
    // console.log(regex); // /(the)/gi    /(gi)/gi
    // console.log(text.split(regex)); // возвращает массив строк  ['', 'Ki', 'ng Lear']
    return text.split(regex).map((substring, i) => {
      // console.log(substring); // Ja cques the Fatalist
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className={`${styles['highlight']}`}>
            {substring}
          </span>
        );
      }
      return substring;
    });
  };
  return (
    <div className={`${styles['app-block']} ${styles['book-list']}`}>
      <h2>Book List</h2>
      {filteredBooks.length ? (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={book.id}>
              <div className={styles['book-info']}>
                {/* {++i}. {book.title} by <strong> {book.author}</strong> */}
                {++i}. {highlightMatch(book.title, titleFilter)} by
                <strong> {highlightMatch(book.author, authorFilter)}</strong> (
                {book.source})
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
