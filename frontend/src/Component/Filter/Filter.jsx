import { useDispatch, useSelector } from 'react-redux';
import {
  setTitleFilter,
  selectTitleFilter,
  resetFilters,
} from '../../redux/slices/filterSlice';
import styles from './Filter.module.css';

function Filter() {
  const dispatch = useDispatch();
  //useSelector будет использоваться, чтобы подписаться на изменение состояния
  const titleFilter = useSelector(selectTitleFilter); // подпишемся на изменение состояния
  const handleTitleFilterChnage = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters()); // отправим действие для очистки всего состояния фильтров
  };

  return (
    <div className={`${styles['app-block']} ${styles.filter}`}>
      <div className={`${styles['filter-row']}`}>
        <div className={`${styles['filter-group']}`}>
          <input
            onChange={handleTitleFilterChnage}
            type="text"
            placeholder="Filter by title..."
            value={titleFilter}
          />
        </div>
        <button type="button" onClick={handleResetFilters}>Reset filters</button>
      </div>
    </div>
  );
}

export default Filter;
