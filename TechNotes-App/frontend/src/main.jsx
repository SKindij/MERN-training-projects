// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// для налаштування маршрутизації додатку
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

/*
 <Route path="/*" element={<App />} />
 визначає маршрут за замовчуванням (/*), який відповідає компоненту <App />
 компонент <App /> відображатиметься, коли URL не відповідає жодному іншому маршруту
*/
