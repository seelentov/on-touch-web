import { ReactNode } from 'react'
import { ROUTING } from './routing.config'

import {
	BiLoader,
	BiMessageSquareDetail,
	BiSearchAlt,
	BiSolidHappyAlt,
} from 'react-icons/bi'

export type MenuItem = {
	href: ROUTING
	title: string
	icon: ReactNode
}

export const HEADER_MENU: MenuItem[] = [
	{
		href: ROUTING.MESSAGES,
		title: 'Сообщения',
		icon: <BiMessageSquareDetail />,
	},
	{ href: ROUTING.SEARCH, title: 'Поиск', icon: <BiSearchAlt /> },
	{ href: ROUTING.PROFILE, title: 'Профиль', icon: <BiSolidHappyAlt /> },
	{ href: ROUTING.SETTINGS, title: 'Настройки', icon: <BiLoader /> },
] as const

export type HEADER = (typeof HEADER_MENU)[keyof typeof HEADER_MENU]
