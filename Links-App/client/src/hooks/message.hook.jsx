// message.hook.jsx
import {useCallback} from 'react'

// define hook, which allows displaying toast messages
export const useMessage = () => {
  return useCallback(text => {
    // check if Materialize CSS library is available and if 'text' is provided.
    if (window.M && text) {
      // display toast message using Materialize CSS
      window.M.toast({ html: text })
    }
  }, [])
}
// to show user-friendly notifications or messages in application
