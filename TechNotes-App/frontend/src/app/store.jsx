// store.jsx
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './api/apiSlice';

// створення Redux-сховища з допомогою Redux Toolkit
export const store = configureStore({
  // визначення редукторів, які оброблятимуть стан додатку
    reducer: {
	  // використовуємо дані як ключ та як значення
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
  // для обробки асинхронних запитів за допомогою Redux Toolkit
  // допомагає управляти запитами до API та оновлювати стан на основі відповідей API
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
	// активація інструментів розробника Redux DevTools у веб-браузері
    devTools: true
})
