import { ReactNode } from 'react'
import { ROUTING } from './routing.config'

import {
	BiLoader,
	BiMessageSquareDetail,
	BiSearchAlt,
	BiSolidUserAccount,
} from 'react-icons/bi'

export type MenuItem = {
  readonly href: ROUTING
  readonly title: string
  readonly icon: ReactNode
}

export const HEADER_MENU: MenuItem[] = [
  {
    href: ROUTING.MESSAGES,
    title: 'Сообщения',
    icon: <BiMessageSquareDetail />,
  },
  { href: ROUTING.SEARCH, title: 'Поиск', icon: <BiSearchAlt /> },
  { href: ROUTING.PROFILE, title: 'Профиль', icon: <BiSolidUserAccount /> },
  { href: ROUTING.SETTINGS, title: 'Настройки', icon: <BiLoader /> },
]

export type HEADER_MENU = (typeof HEADER_MENU)[keyof typeof HEADER_MENU]