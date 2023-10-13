// App.jsx
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {Navbar} from './components/Navbar'
import {Loader} from './components/Loader'
import 'materialize-css';
import './App.css'

function App() {
  // to manage user authentication
  const {token, login, logout, userId, ready} = useAuth();
  // check if user is authenticated based on presence of token
  const isAuthenticated = !!token;
  // define the application's routing
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    // display spinner while app is preparing
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      /* wraps app, providing authentication-related data to child components */
      token, login, logout, userId, isAuthenticated
    }}>
      <p>MERN Links App</p>
      <Router>
        { isAuthenticated && <Navbar /> /* display navigation if user is authenticated */}
        <div className="container">
          {/* display app's routes */}
          {routes} 
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
