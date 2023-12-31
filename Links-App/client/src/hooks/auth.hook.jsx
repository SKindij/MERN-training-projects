// auth.hook.jsx
import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);
    // store user data in local storage as JSON string
    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName)
  }, [])

  // to load user data from local storage when component is mounted
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      // automatically log in user if token is found
      login(data.token, data.userId)
    }
    // to indicate that authentication data has been loaded
    setReady(true);
  }, [login])


  return { login, logout, token, userId, ready }
}
