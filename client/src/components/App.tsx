import FuschiaSwirl from '@assets/fuschia_swirl.jpg'
import { FETCH_LOL_INFO } from '@customtypes/index'
import { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { useAppContext } from '../context'
import { routes } from '../routes'

export const App = () => {
  const [{ selectedPatch, patches }, dispatch] = useAppContext()
  const element = useRoutes(routes)

  useEffect(() => {
    dispatch({ type: FETCH_LOL_INFO })
  }, [])

  return (
    <div
      className='h-full min-h-screen bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${FuschiaSwirl})` }}
    >
      {element}
    </div>
  )
}
