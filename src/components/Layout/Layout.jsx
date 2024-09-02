import { Suspense } from 'react'
import Loader from '../Loader/Loader'

const Layout = ({children}) => {
  return (
    <div>
      
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  )
}

export default Layout