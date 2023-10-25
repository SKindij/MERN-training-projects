// User.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectUserById } from './usersApiSlice';

const User = ({ userId }) => {
  // отримання даних про користувача за ідентифікатором з Redux-сховища
  const user = useSelector(state => selectUserById(state, userId));
  // отримання функції для переходу на сторінку редагування користувача
  const navigate = useNavigate();
  
  if (user) {
	// обробник для переходу на сторінку редагування користувача
    const handleEdit = () => navigate(`/dash/users/${userId}`);
	// формування рядка з ролями користувача, розділеними комами
    const userRolesString = user.roles.toString().replaceAll(',', ', ');
    // визначення класу для статусу користувача (активний або неактивний)
    const cellStatus = user.active ? '' : 'table__cell--inactive';

    return (
	  // відображення даних про користувача в таблиці
      <tr className="table__row user">
        <td className={`table__cell ${cellStatus}`}>{user.username}</td>
        <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
        <td className={`table__cell ${cellStatus}`}>
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
export default User;
