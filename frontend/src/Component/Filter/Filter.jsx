import { useDispatch, useSelector } from 'react-redux';
import {
  setTitleFilter,
  setAuthorFilter,
  selectAuthorFilter,
  selectTitleFilter,
  setOnlyFavoriteFilter,
  selectOnlyFavoriteFilter,
  resetFilters,
} from '../../redux/slices/filterSlice';
import styles from './Filter.module.css';

function Filter() {
  const dispatch = useDispatch();
  //useSelector будет использоваться, чтобы подписаться на изменение состояния
  const titleFilter = useSelector(selectTitleFilter); // подпишемся на изменение состояния
  const authorFilter = useSelector(selectAuthorFilter); // подпишемся на изменение состояния
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleAuthorFilterChnage = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const handleOnlyFavoriteFilterChange = () => {
    dispatch(setOnlyFavoriteFilter());
  };

  const handleResetFilters = () => {
    dispatch(resetFilters()); // отправим действие для очистки всего состояния фильтров
  };

  return (
    <div className={`${styles['app-block']} ${styles.filter}`}>
      <div className={`${styles['filter-row']}`}>
        <div className={`${styles['filter-group']}`}>
          <input
            onChange={handleTitleFilterChange}
            type="text"
            placeholder="Filter by title..."
            value={titleFilter}
          />
        </div>
        <div className={`${styles['filter-group']}`}>
          <input
            onChange={handleAuthorFilterChnage}
            type="text"
            placeholder="Filter by author..."
            value={authorFilter}
          />
        </div>
        <div className={`${styles['filter-group']}`}>
          <label>
            <input
              onChange={handleOnlyFavoriteFilterChange}
              type="checkbox"
              checked={onlyFavoriteFilter}
            />
            Only Favorite
          </label>
        </div>
        <button type="button" onClick={handleResetFilters}>
          Reset filters
        </button>
      </div>
    </div>
  );
}

export default Filter;
