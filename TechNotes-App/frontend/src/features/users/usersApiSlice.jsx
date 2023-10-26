// usersApiSlice.jsx
import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// створення адаптера для нормалізації даних користувачів
const usersAdapter = createEntityAdapter({});
  // створення початкового стану для адаптера
  const initialState = usersAdapter.getInitialState();

// створення засобу для керування даними користувачів з використанням apiSlice
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
	// запит для отримання списку користувачів
    getUsers: builder.query({
      query: () => '/users',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      keepUnusedDataFor: 5,
	  // отримані дані нормалізуються і зберігаються з використанням адаптера
      transformResponse: responseData => {
        const loadedUsers = responseData.map(user => {
          user.id = user._id
          return user
        });
        return usersAdapter.setAll(initialState, loadedUsers)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'User', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'User', id }))
          ]
        } else return [{ type: 'User', id: 'LIST' }]
      }
    }),
	// запит для створення нового користувача
    addNewUser: builder.mutation({
      query: initialUserData => ({
        url: '/users',
        method: 'POST',
        body: {
            ...initialUserData,
        }
      }),
      invalidatesTags: [
        { type: 'User', id: "LIST" }
      ]
    }),
	// запит для оновлення існуючого користувача
    updateUser: builder.mutation({
      query: initialUserData => ({
        url: '/users',
        method: 'PATCH',
        body: {
            ...initialUserData,
        }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id }
      ]
    }),
	// запит для видалення користувача
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id }
      ]
    }),
  }),
});

// експорт готових гуків для взаємодії з цими запитами та мутаціями
export const {
  useGetUsersQuery, useAddNewUserMutation,
  useUpdateUserMutation, useDeleteUserMutation,
} = usersApiSlice;

// вибір результатів запиту для відображення
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// створення селектора для отримання даних користувачів
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
);

// створення селекторів для отримання різних частин даних користувачів
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds  
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);
