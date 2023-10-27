// authSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

// створюємо зріз (slice) для автентифікації 
const authSlice = createSlice({
  // назва зрізу, використовується для автогенерації назви дії
  name: 'auth',
  // початковий стан зрізу
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
	  // отримуємо accessToken з переданої дії
      const { accessToken } = action.payload
	  // зберігаємо accessToken в стані
      state.token = accessToken
    },
    logOut: (state, action) => {
	  // очищаємо accessToken при виході з системи
      state.token = null
    },
  }
});

// експортуємо створені дії
export const { setCredentials, logOut } = authSlice.actions;
// експортуємо редуктор
export default authSlice.reducer;
// створюємо селектор для отримання поточного accessToken зі стану
export const selectCurrentToken = (state) => state.auth.token;
