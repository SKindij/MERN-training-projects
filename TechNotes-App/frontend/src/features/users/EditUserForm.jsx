// EditUserForm.jsx
import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"

// регулярний вираз для перевірки коректності імені та паролю користувача
const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {

  /* Мутації служать для взаємодії з Redux-сховищем і зміни його стану. 
    1. Створення мутації з використанням Redux Toolkit або звичайного Redux.
	2. Виклик цієї мутації, передаючи їй необхідні параметри, такі як дані для зміни стану.
	3. Мутація робить зміни в Redux-сховищі, оновлюючи відповідний стан.
  */

  // використання мутацій для оновлення користувача
  const [updateUser, {
      isLoading, isSuccess,
      isError, error
  }] = useUpdateUserMutation()

  // використання мутації для видалення користувача
  const [deleteUser, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delerror
  }] = useDeleteUserMutation()

  // функція для навігації на інші сторінки
  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  // перевірка коректності імені користувача
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])
  // перевірка коректності паролю
  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])


  // очищення полів та перехід на сторінку користувачів
  useEffect(() => {
    console.log(isSuccess)
    if (isSuccess || isDelSuccess) {
        setUsername('')
        setPassword('')
        setRoles([])
        navigate('/dash/users')
    }

  }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value);
    const onPasswordChanged = e => setPassword(e.target.value);

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

  // зміна статусу активності користувача
  const onActiveChanged = () => setActive(prev => !prev)

  const onSaveUserClicked = async (e) => {
    if (password) {
	  // оновлення користувача із новим паролем
      await updateUser({ id: user.id, username, password, roles, active })
    } else {
	  // оновлення користувача без зміни паролю
      await updateUser({ id: user.id, username, roles, active })
    }
  }
    // видалення користувача
    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

  let canSave;
  if (password) {
	  // перевірка, чи можна зберегти зміни при зміні паролю
    canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
  } else {
	  // перевірка, чи можна зберегти зміни без зміни паролю
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading
  }
  // Клас для відображення повідомлення про помилку
  const errClass = (isError || isDelError) ? "errmsg" : "offscreen";
  // Класи для позначення некоректного імені чи паролю користувача
  const validUserClass = !validUsername ? 'form__input--incomplete' : '';
  const validPwdClass = password && !validPassword ? 'form__input--incomplete' : '';
  // Клас для позначення невибраних ролей
  const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : '';
  // вміст повідомлення про помилку
  const errContent = (error?.data?.message || delerror?.data?.message) ?? '';
  /*
    "error?." - спочатку перевіряється, чи існує об'єкт error
	".data?" - потім чи існує в ньому об'єкт data
	".message" - якщо це правда, то вилучається значення поля message
	"?? ''" - оператор "заповнення за замовчуванням" або "нульовий співставник"
  */

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={e => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit User</h2>
          <div className="form__action-buttons">
              <button
                className="icon-button"
                title="Save"
                onClick={onSaveUserClicked}
                disabled={!canSave}
              >
                <FontAwesomeIcon icon={faSave} />
              </button>
              <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteUserClicked}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
          <label className="form__label" htmlFor="username">
            Username: <span className="nowrap">[3-20 letters]</span>
		  </label>
            <input
              className={`form__input ${validUserClass}`}
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              value={username}
              onChange={onUsernameChanged}
            />

          <label className="form__label" htmlFor="password">
              Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span>
		  </label>
            <input
              className={`form__input ${validPwdClass}`}
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={onPasswordChanged}
            />

                <label className="form__label form__checkbox-container" htmlFor="user-active">
                    ACTIVE:
                    <input
                        className="form__checkbox"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={active}
                        onChange={onActiveChanged}
                    />
                </label>

                <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}
export default EditUserForm
