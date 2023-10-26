// EditUser.jsx
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from './usersApiSlice';
import EditUserForm from './EditUserForm';

const EditUser = () => {
	// отримання параметру `id` з URL
    const { id } = useParams()
  // витягнення даних користувача за його ідентифікатором
    const user = useSelector(state => selectUserById(state, id))
  // визначення вмісту для відображення на сторінці
    const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>

    return content
}
export default EditUser;
