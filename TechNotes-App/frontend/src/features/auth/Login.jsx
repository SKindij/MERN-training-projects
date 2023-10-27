// Login.jsx
import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice'; // дія для зберігання автентифікаційних даних
import { useLoginMutation } from './authApiSlice'; // мутація для логіну

const Login = () => {
    const userRef = useRef(); // посилання на поле вводу користувача
    const errRef = useRef(); // посилання на поле для відображення помилок
    const [username, setUsername] = useState(''); // стан для введеного імені
    const [password, setPassword] = useState(''); // стан для введеного пароля
    const [errMsg, setErrMsg] = useState(''); // стан для повідомлення про помилки

    const navigate = useNavigate(); // хук для навігації між сторінками
    const dispatch = useDispatch(); // хук для використання діспетчера Redux

  // гач для виконання логіну і стан завантаження
    const [login, { isLoading }] = useLoginMutation();
  // встановлюємо фокус на поле вводу користувача при завантаженні компонента
    useEffect(() => {
        userRef.current.focus()
    }, []);
  // очищаємо повідомлення про помилки при зміні введеного користувача або пароля
    useEffect(() => {
        setErrMsg('');
    }, [username, password]);


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken })); // зберігаємо токен в Redux
      setUsername('');
      setPassword('');
      navigate('/dash'); // переходимо до сторінки "dash"
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.status === 401) {
        setErrMsg('Unauthorized');
      } else {
          setErrMsg(err.data?.message);
      }
        errRef.current.focus(); // фокус на поле для відображення помилок
    }
  }

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <p>Loading...</p>

  const content = (
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login">
        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            className="form__input"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            className="form__input"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />
          <button className="form__submit-button">Sign In</button>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  )

    return content
}

export default Login;
