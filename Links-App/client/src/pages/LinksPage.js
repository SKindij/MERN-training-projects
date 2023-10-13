// LinksPage.js
// component represents user's links page, displaying list of their shortened links
import {useCallback, useContext, useEffect, useState} from 'react';
// is used to manage HTTP requests
import {useHttp} from '../hooks/http.hook';
// allows access to authentication context, providing authentication token
import {AuthContext} from '../context/AuthContext';
import {Loader} from '../components/Loader';
import {LinksList} from '../components/LinksList';

export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  // function to fetch and set user's links
  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(fetched)
    } catch (e) {console.log(e)}
  }, [token, request])

  useEffect(() => {
    // fetch user's links when omponent is mounted
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    // display spinner while fetching data
    return <Loader/>
  }

  return (
    <>
    {/* display component when loading has finished and links have been fetched */}
      {!loading && <LinksList links={links} />}
    </>
  )
}
