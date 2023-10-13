// CreatePage.js
import {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'

// This component represents the page for creating new links.
export const CreatePage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const {request} = useHttp();
  const [link, setLink] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        console.log("press Enter");
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        })
        // redirect to detail page for newly created link
        navigate(`/detail/${data.link._id}`);
      } catch (e) {console.log(e)}
    }
  }

  return (
    <>
      <h2>Create Link Modele</h2>
      <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input placeholder="Paste link"
            id="link" type="text" value={link}
            onChange={e => setLink(e.target.value)}
            onKeyDown={pressHandler}
          />
          <label htmlFor="link">Enter link</label>
        </div>
      </div>
      </div>
    </>
  )
}
