// store.jsx
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './api/apiSlice';
import { setupListeners } from "@reduxjs/toolkit/query";

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

/*
  програма може відправляти запити до сервера за допомогою Redux Toolkit Query
  setupListeners встановлює підписку на їх відповіді та інші події
  Коли результати запитів повертаються з сервера, setupListeners автоматично обробляє ці результати
  та оновлює стан Redux-сховища відповідно до специфікації запитів
*/
setupListeners(store.dispatch);

/*
  Коли стан Redux-сховища оновлюється через обробку результатів запитів, 
  це викликає перерендеринг компонентів, які використовують ці дані. 
  Ось де реактивність приходить у гру. 
  Компоненти, які залежать від даних з Redux-сховища, будуть автоматично оновлені при зміні даних.
*/
