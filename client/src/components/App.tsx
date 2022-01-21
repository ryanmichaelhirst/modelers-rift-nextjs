import { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import {
  SET_LOL_CHAMPIONS_DATA,
  SET_PATCHES,
  SET_SELECTED_CHAMPION_BASIC_INFO,
  SET_SELECTED_CHAMPION_DETAILED_INFO,
  SET_SELECTED_PATCH,
  useAppContext,
} from '../context'
import { routes } from '../routes'
import { getChampion, getChampions, getPatches } from '../utils'

export const App = () => {
  const element = useRoutes(routes)
  const [{ selectedPatch, lolChampionsData }, dispatch] = useAppContext()

  // load patches from DDRAGON
  useEffect(() => {
    const fetch = async () => {
      const patches = await getPatches()
      dispatch({ type: SET_PATCHES, payload: patches })
      dispatch({ type: SET_SELECTED_PATCH, payload: patches[0] })
    }

    fetch()
  }, [])

  // load detailed champion data from DDRAGON
  useEffect(() => {
    const fetch = async () => {
      if (selectedPatch && Object.keys(lolChampionsData).length === 0) {
        const ddragonChampions = await getChampions(selectedPatch)
        const basicInfo = ddragonChampions['aatrox']
        const detailedInfo = await getChampion(selectedPatch, basicInfo?.name || '')

        dispatch({ type: SET_LOL_CHAMPIONS_DATA, payload: ddragonChampions })
        dispatch({ type: SET_SELECTED_CHAMPION_BASIC_INFO, payload: basicInfo })
        dispatch({ type: SET_SELECTED_CHAMPION_DETAILED_INFO, payload: detailedInfo })
      }
    }

    fetch()
  }, [selectedPatch])

  return <div className='h-screen'>{element}</div>
}
