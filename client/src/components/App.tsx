import { MenuBar } from '@components/MenuBar'
import { useEffect } from 'react'
import type { RouteObject } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import {
  SET_LOL_CHAMPIONS_DATA,
  SET_SELECTED_CHAMPION_BASIC_INFO,
  SET_SELECTED_CHAMPION_DETAILED_INFO,
  useAppContext,
} from '../context'
import { Dashboard } from '../routes/Dashboard'
import { Interactive } from '../routes/Interactive'
import { getChampion, getChampions } from '../utils'
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
  const [{ selectedPatch, lolChampionsData }, dispatch] = useAppContext()

  useEffect(() => {
    // load detailed champion data from DDRAGON
    const fetch = async () => {
      if (selectedPatch && Object.keys(lolChampionsData).length === 0) {
        const ddragonChampions = await getChampions(selectedPatch)
        const basicInfo = ddragonChampions['Aatrox']
        const detailedInfo = await getChampion(selectedPatch, basicInfo.name)

        dispatch({ type: SET_LOL_CHAMPIONS_DATA, payload: ddragonChampions })
        dispatch({ type: SET_SELECTED_CHAMPION_BASIC_INFO, payload: basicInfo })
        dispatch({ type: SET_SELECTED_CHAMPION_DETAILED_INFO, payload: detailedInfo })
      }
    }

    fetch()
  }, [selectedPatch])

  return <div className='h-screen'>{element}</div>
}
