// apiSlice.jsx
// необхідні функції та компоненти для створення API-шару
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
 // основний запит для взаємодії з API, встановлюючи базовий URL
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
  // моделі даних, які обробляє цей API-шар, що
  // можуть використовуватися для ідентифікації та кешування даних
    tagTypes: ['Note', 'User'],
  // визначення кінцевих точок API за допомогою builder
    endpoints: builder => ({})
	// кожна кінцева точка визначає окремий запит до сервера
})
