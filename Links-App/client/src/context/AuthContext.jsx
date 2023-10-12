// AuthContext.jsx
import {createContext} from 'react'

/*
  define placeholder function "noop" (no operation)
  This function does nothing and serves as default value 
  for the login and logout properties in the context.
*/
function noop() {}

// create an authentication context
// it is meant to manage authentication-related data and functions
export const AuthContext = createContext({
  token: null, // token for user authentication
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false // flag indicating whether user is authenticated
})
