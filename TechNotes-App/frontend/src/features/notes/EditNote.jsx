// EditNote.jsx
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectNoteById } from './notesApiSlice';
import { selectAllUsers } from '../users/usersApiSlice';
import EditNoteForm from './EditNoteForm';

const EditNote = () => {
	// отримуємо параметр "id" із URL
    const { id } = useParams();
    // вибираємо нотатку за її ID
    const note = useSelector(state => selectNoteById(state, id));
    // вибираємо всіх користувачів
	const users = useSelector(selectAllUsers);

  // перевіряємо, чи є нотатка та користувачі перед відображенням компоненту
    const content = note && users ? <EditNoteForm note={note} users={users} /> : <p>Loading...</p>

  // повертаємо вміст для відображення на сторінці
    return content
}
export default EditNote;
