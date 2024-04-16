import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearError, selectErrorMessage } from '../../redux/slices/errorSlice';

function Error() {
  // toast.info('Test');
  const errorMessage = useSelector(selectErrorMessage); // получаем из стейта актуальное сообщение об ошибке в виде строки
  // console.log(errorMessage); // Please fill title and author
  const dispatch = useDispatch();
  useEffect(() => {
    if (errorMessage) {
      // если errorMessage не пустая строка
      toast.info(errorMessage);
      dispatch(clearError()); // действие об очистке ошибки в состоянии приложения
    }
  }, [errorMessage, dispatch]); // каждый раз, когда будет меняться errorMessage, мы будем вызывать toast.info
  return <ToastContainer position="top-right" autoClose={2000} />;
}

export default Error;
