import styles from './BookList.module.css';
function BookList() {
  return (
    <div className={`${styles['app-block']} ${styles['book-list']}`}>
      <h2>Book List</h2>
    </div>
  );
}

export default BookList;
