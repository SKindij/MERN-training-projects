// AuthPage.js
import {useContext, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/AuthContext';

export const AuthPage = () => {
  // retrieve necessary hooks and context for authentication page
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {loading, request, error, clearError} = useHttp();
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    // handle errors and display messages
    message(error);
    clearError();
  }, [error, message, clearError])

  useEffect(() => {
    // update Materialize CSS text fields
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    // update form state as user enters data in input fields
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      console.log("registerHandler");
      const data = await request('/api/auth/register', 'POST', {...form});
      message(data.message);
    } catch (e) {console.log(e)}
  }

  const loginHandler = async () => {
    try {
      console.log("loginHandler");
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.token, data.userId);
    } catch (e) {console.log(e)}
  }

/*
  component includes input fields for email and password, 
  and buttons for signing in and registration. 
  Disabled status is set during loading of the requests.
*/
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h2>Shorten the Link</h2>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>

              <div className="input-field">
                <input placeholder="enter email"
                  id="email" type="text" name="email"
                  className="yellow-input"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input placeholder="enter пароль"
                  id="password" type="password" name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Password</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4"
              style={{marginRight: 10}}
              disabled={loading}
              onClick={loginHandler}
            >
              Sign In
            </button>
            <button className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
