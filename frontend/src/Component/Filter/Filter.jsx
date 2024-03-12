import styles from './Filter.module.css';

function Filter() {
  return (
    <div className={`${styles['app-block']} ${styles.filter}`}>
      <h2>Filters</h2>
    </div>
  );
}

export default Filter;
