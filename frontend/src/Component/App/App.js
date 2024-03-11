import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles['app-header']}>
        <h1>Book Library App</h1>
      </header>
    </div>
  );
}

export default App;
