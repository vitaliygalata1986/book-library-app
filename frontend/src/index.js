import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import store from './redux/store';
import './index.css';
import App from './Component/App/App';
const root = ReactDOM.createRoot(document.getElementById('root'));

// таким образом, мы предоставим доступ всем компонентам нашего приложения к магазину redux
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
