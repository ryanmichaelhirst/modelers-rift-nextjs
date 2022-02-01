import { MenuBar } from '@components/menu-bar'
import type { RouteObject } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import { Home } from './Home'
import { Interactive } from './Interactive'
import { ItemBuilder } from './ItemBuilder'
import { Model } from './Model'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MenuBar />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/model',
        element: <Model />,
      },
      { path: '/interactive', element: <Interactive /> },
      {
        path: '/item_builder',
        element: <ItemBuilder />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]
