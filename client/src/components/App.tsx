import { MenuBar } from '@components/MenuBar'
import { fetchChampions, fetchPatches, selectSelectedPatch } from '@store/slices/championSlice'
import { fetchItems } from '@store/slices/itemSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RouteObject } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import { Dashboard } from '../routes/Dashboard'
import { Interactive } from '../routes/Interactive'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MenuBar />,
    children: [
      { index: true, element: <Interactive /> },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]

export const App = () => {
  const element = useRoutes(routes)
  const dispatch = useDispatch()
  const selectedPatch = useSelector(selectSelectedPatch)

  useEffect(() => {
    dispatch(fetchPatches())
  }, [])

  useEffect(() => {
    if (selectedPatch) {
      dispatch(fetchItems())
      dispatch(fetchChampions())
    }
  }, [selectedPatch])

  return <div className='h-screen'>{element}</div>
}
