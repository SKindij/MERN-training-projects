// http.hook.jsx
import {useState, useCallback} from 'react'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // function allows making asynchronous HTTP requests
  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    // to indicate request is in progress
    setLoading(true)
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }
      // send the request
      const response = await fetch(url, {method, body, headers})
      // parse the response data
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }
      // once the request is completed
      setLoading(false)
      // return the parsed data
      return data
    } catch (e) {
      setLoading(false);
      setError(e.message);
      // rethrow error for handling in higher-level components
      throw e;
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}
