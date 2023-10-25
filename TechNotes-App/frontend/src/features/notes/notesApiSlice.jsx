// notesApiSlice.jsx
// функції, що дозволяють створити адаптер для роботи із структурованими даними в Redux-сховищі
import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// створення адаптера для управління нотатками
const notesAdapter = createEntityAdapter({
  // сортуємо нотатки за їх статусом "виконано" або "відкрито"
  sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
});

// початковий стан для нотаток, використовуючи адаптер
const initialState = notesAdapter.getInitialState();
/*
  Основна мета цього запису полягає в тому, щоб створити 
  стандартну структуру для даних про нотатки, яку обробляє адаптер. 
    ids: масив, який містить ідентифікатори (ключі) нотаток
	entities: об'єкт, де ключами є ідентифікатори нотаток, а значеннями є об'єкти нотаток
*/

// модуль визначає API-шар для роботи із нотатками в Redux-сховищі
export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
	// визначаємо кінцеву точку для отримання нотаток
    getNotes: builder.query({
      query: () => '/notes', //  вказуєтемо URL для запиту
      validateStatus: (response, result) => {
		// повертає true, якщо статус відповіді 200 і результат не має помилок
        return response.status === 200 && !result.isError
      },
     // дані, які не використовуються 5 хвилин, будуть видалені з кешу
      keepUnusedDataFor: 5,
     // обробляємо відповідь від сервера перед збереженням її в Redux-сховищі
      transformResponse: responseData => {
		// додаємо до кожної нотатки поле id на основі _id
        const loadedNotes = responseData.map(note => {
          note.id = note._id
          return note
        });
		// для збереження цих даних в Redux-сховищі
        return notesAdapter.setAll(initialState, loadedNotes)
      },
      // визначаємо теги для кешування результату запиту
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Note', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Note', id }))
          ]
        } else return [{ type: 'Note', id: 'LIST' }]
      }
    }),
    addNewNote: builder.mutation({
      query: initialNote => ({
          url: '/notes',
          method: 'POST',
          body: {
              ...initialNote,
          }
      }),
      invalidatesTags: [
          { type: 'Note', id: "LIST" }
      ]
    }),
    updateNote: builder.mutation({
      query: initialNote => ({
          url: '/notes',
          method: 'PATCH',
          body: {
              ...initialNote,
          }
      }),
      invalidatesTags: (result, error, arg) => [
          { type: 'Note', id: arg.id }
      ]
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
          url: `/notes`,
          method: 'DELETE',
          body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
          { type: 'Note', id: arg.id }
      ]
    }),
  }),
})

// дозволяє виконувати запити до сервера та отримувати актуальні дані
export const { 
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;
/*
  це можна використовувати у компонентах наступним чином:
    * import { useGetNotesQuery } from './notesApiSlice';
    *виконати запит для отримання нотаток
	  const { data, error, isLoading } = useGetNotesQuery();
	    - дані, які отримано в результаті запиту
		- помилка, якщо запит завершився невдачею
		- показує, чи триває виконання запиту
*/

// дозволяє отримати результати попередніх запитів, які вже збережено в сховищі
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();
/*
  можна використовувати у коді таким чином:
    * import { selectNotesResult } from './notesApiSlice';
	* отримати результат запиту "getNotes"
	const notesResult = selectNotesResult(store.getState());
	* використовувати дані, помилку та інші властивості результату
      const { data, error, isLoading } = notesResult;
*/

// creates memoized selector
const selectNotesData = createSelector(
  // приймаємо дані зі сховища
    selectNotesResult,
  // при повторних викликах з тим же результатом, повертає закешовані дані, не обчислюючи їх знову
    notesResult => notesResult.data
);
/*
  Мемоізований селектор - це функція, яка кешує результати і повертає закешовані дані,
  якщо вхідні параметри не змінилися. Це оптимізує продуктивність додатку.
*/

// створення селекторів для роботи із нотатками за допомогою адаптера
export const {
  selectAll: selectAllNotes, // для отримання всіх нотаток у формі масиву
  selectById: selectNoteById, // для отримання нотатки за її ідентифікатором
  selectIds: selectNoteIds // для отримання всіх ключів нотаток у формі масиву
  // визначає всі селектори та налаштовує їх для використання
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState);
