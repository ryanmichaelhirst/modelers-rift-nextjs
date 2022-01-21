import { MenuBar } from '@components/MenuBar'
import type { RouteObject } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import { Interactive } from './Interactive'
import { ItemBuilder } from './ItemBuilder'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MenuBar />,
    children: [
      {
        index: true,
        path: '/dashboard',
        element: <Dashboard />,
      },
      { path: '/interactive', element: <Interactive /> },
      {
        path: '/item_builder',
        element: <ItemBuilder />,
      },
    ],
  },
]
