import { useDispatch, useSelector } from 'react-redux';
import {
  setTitleFilter,
  selectTitleFilter,
} from '../../redux/slices/filterSlice';
import styles from './Filter.module.css';

function Filter() {
  const dispatch = useDispatch();
  //useSelector будет использоваться, чтобы подписаться на изменение состояния
  const titleFilter = useSelector(selectTitleFilter); // подпишемся на изменение состояния
  const handleTitleFilterChnage = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  return (
    <div className={`${styles['app-block']} ${styles.filter}`}>
      <div className={`${styles['filter-group']}`}>
        <input
          onChange={handleTitleFilterChnage}
          type="text"
          placeholder="Filter by title..."
          value={titleFilter}
        />
      </div>
    </div>
  );
}

export default Filter;
