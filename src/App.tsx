import { useNavigate, useRoutes } from 'react-router'
import { Suspense, useEffect } from 'react'
import { useAppDataStore } from './store'
import NotFound from './views/not-found'
import { routes } from './routes/route'

function App() {
  const navigate = useNavigate()
  const isAuth = useAppDataStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (!isAuth) navigate('/login', { replace: true })
  }, [])

  const route = useRoutes(routes) || <NotFound />

  return (
    <Suspense fallback={<p>{'Loading'}</p>}>
      <main>{route}</main>
    </Suspense>
  )
}

export default App
