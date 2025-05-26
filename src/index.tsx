import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

/**
 * Точка входа в приложение.
 * Создаёт корневой React-элемент и монтирует в него компонент App.
 *
 * @module index
 */
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);