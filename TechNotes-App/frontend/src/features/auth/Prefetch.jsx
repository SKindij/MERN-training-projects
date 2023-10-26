// Prefetch.jsx
import { store } from '../../app/store';
import { notesApiSlice } from '../notes/notesApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
  // цей ефект спрацьовує при рендерингу компонента "Prefetch"
  useEffect(() => {
    console.log('subscribing...')
	// ініціюємо запити на отримання даних нотаток та користувачів
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    // виконається після вимикання компонента "Prefetch"
    return () => {	
	  // відписуємося від запитів, щоб уникнути надлишкового обміну даними
        console.log('unsubscribing');
        notes.unsubscribe();
        users.unsubscribe();
    }
  }, [])
    // виводимо результат у дочірні компоненти за допомогою <Outlet />
    return <Outlet />
}
export default Prefetch;
