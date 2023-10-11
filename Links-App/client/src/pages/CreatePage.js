// CreatePage.js
import {useContext, useEffect, useState} from 'react'


export const CreatePage = () => {


  const [link, setLink] = useState('')

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        console.log("after press Enter:", link)
      } catch (e) {console.log(e)}
    }
  }

  return (
    <>
      <h2>Create Link Modele</h2>
      <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input
            placeholder="Paste link"
            id="link" type="text" value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Enter link</label>
        </div>
      </div>
      </div>
    </>
  )
}
