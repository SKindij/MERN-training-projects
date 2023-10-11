// routes.js
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* ensures that only one route is rendered at a time */}
        <Route path="/links" element={<LinksPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
      </Suspense>
    )
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {/* ensures that only one route is rendered at a time */}
      <Route path="/" element={<AuthPage />} />
    </Routes>
    </Suspense>
  )
}
