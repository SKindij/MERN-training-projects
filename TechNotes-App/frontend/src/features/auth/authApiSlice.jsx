// authApiSlice.jsx
import { apiSlice } from "../../app/api/apiSlice"; // зріз для взаємодії з API
import { logOut } from "./authSlice"; // дія для виходу з системи

// створюємо зріз для автентифікації
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
	// мутація для виконання логіну
    login: builder.mutation({
      query: credentials => ({
          url: '/auth', // URL для логіну
          method: 'POST', // HTTP метод для надсилання даних
          body: { ...credentials } // відправляємо автентифікаційні дані на сервер
      })
    }),
	// мутація для виконання виходу з системи
    sendLogout: builder.mutation({
      query: () => ({
          url: '/auth/logout', // URL для виходу з системи
          method: 'POST', // HTTP метод для виходу
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            //const { data } = 
            await queryFulfilled; // очікуємо завершення запиту на вихід
            //console.log(data)
            dispatch(logOut()); // викликаємо дію для виходу з системи
            dispatch(apiSlice.util.resetApiState()); // скидаємо стан API
          } catch (err) {
			// обробляємо помилки, якщо вони виникають
            console.log(err)
          }
      }
    }),
	// мутація для оновлення токену
    refresh: builder.mutation({
        query: () => ({
          url: '/auth/refresh', // URL для оновлення токену
          method: 'GET', // HTTP метод для оновлення
        })
    }),
  })
});

// експортуємо дії та генеровані гачки для взаємодії з автентифікацією
export const {
    useLoginMutation, // гач для виконання логіну
    useSendLogoutMutation, // гач для виконання виходу
    useRefreshMutation, // гач для оновлення токену
} = authApiSlice;
