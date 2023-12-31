// Note.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectNoteById } from './notesApiSlice';

// компонент отримує ідентифікатор нотатки як пропс
const Note = ({ noteId }) => {
  // вибірка інфо про нотатку зі стану Redux за її ідентифікатором
  const note = useSelector(state => selectNoteById(state, noteId));

  const navigate = useNavigate();

  if (note) {
	// форматування дати створення та оновлення нотатки
    const created = new Date(note.createdAt).toLocaleString('en-US', { day:'numeric', month:'long' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day:'numeric', month:'long' })
    // функція для переходу до сторінки редагування нотатки
    const handleEdit = () => navigate(`/dash/notes/${noteId}`)

    return (
	  // відображення інформації про нотатку та кнопки для редагування
      <tr className="table__row">
        <td className="table__cell note__status">
          {note.completed
            ? <span className="note__status--completed">Completed</span>
            : <span className="note__status--open">Open</span>
          }
        </td>
        <td className="table__cell note__created">{created}</td>
        <td className="table__cell note__updated">{updated}</td>
        <td className="table__cell note__title">{note.title}</td>
        <td className="table__cell note__username">{note.username}</td>

        <td className="table__cell">
          <button
            className="icon-button table__button"
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
        )

    } else return null
}
export default Note
