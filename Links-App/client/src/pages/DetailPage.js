// DetailPage.js
// component represents the detail page for a specific link
import {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
// to manage HTTP requests
import {useHttp} from '../hooks/http.hook'
// allows access to authentication context, providing authentication token
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinkCard} from '../components/LinkCard'

export const DetailPage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [link, setLink] = useState(null)
  const linkId = useParams().id

  // function to retrieve link details
  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLink(fetched)
    } catch (e) {console.log(e)}
  }, [token, linkId, request])

  useEffect(() => {
    // fetch link details when component is mounted
    getLink()
  }, [getLink])

  if (loading) {
    // display spinner while fetching data
    return <Loader />
  }

  return (
    <>
    {/* display link card when loading has finished and link has been fetched */}
      { !loading && link && <LinkCard link={link} /> }
    </>
  )
}
