import cn from 'classnames'
import Hamburger from 'hamburger-react'
import { CSSProperties, FC, ReactNode, useContext } from 'react'
import { Link } from 'react-router-dom'
import { MenuItem } from '../../../config/menu.config'
import { ROUTING } from '../../../config/routing.config'
import { useResize } from '../../../hooks/useResize'
import { MenuContext } from '../../providers/MenuProvider'
import { NotificationContext } from '../../providers/NotificationProvider'
import { Messages } from '../Messages/Messages'
import styles from './Header.module.scss'

export interface IHeaderProps {
	className?: string
	style?: CSSProperties
	logo?: ReactNode
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	menu?: MenuItem[]
}

export const Header: FC<IHeaderProps> = ({ className, style, logo, menu }) => {
	const { isOpen, setOpen } = useContext(MenuContext)

	const { count } = useContext(NotificationContext)

	return (
		<div className={cn(className, styles.main)} style={style}>
			<div className={styles.top}>
				<div className={styles.logo}>{logo}</div>
				<div className={styles.burgerBtn} onClick={() => setOpen(!isOpen)}>
					<Hamburger />
					{count > 0 && <div className='item-red-round'>{count}</div>}
				</div>
			</div>
			<Navbar menu={menu} isOpen={isOpen} />
		</div>
	)
}

const Navbar: FC<{
	menu?: MenuItem[]
	isOpen: boolean
}> = ({ menu, isOpen }) => {
	const { count } = useContext(NotificationContext)
	return (
		<div className={cn(styles.navbar, isOpen && styles.active)}>
			{useResize().isScreenLg ? (
				<>
					<div className={styles.navbarItemsDesktop}>
						{menu?.map((menuItem: MenuItem, key: number) => {
							if (menuItem.href === ROUTING.MESSAGES) return
							return <NavbarItem key={key} menuItem={menuItem} />
						})}
					</div>
					<Messages />
				</>
			) : (
				<div className={styles.navbarItems}>
					{menu?.map((menuItem: MenuItem, key: number) => {
						let notification = false
						if (menuItem.href === ROUTING.MESSAGES) {
							notification = count > 0
						}

						return (
							<NavbarItemMobile
								key={key}
								menuItem={menuItem}
								notification={notification}
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}

const NavbarItemMobile: FC<{ menuItem: MenuItem; notification?: boolean }> = ({
	menuItem,
	notification,
}) => {
	const { isOpen, setOpen } = useContext(MenuContext)

	return (
		<div onClick={() => setOpen(!isOpen)}>
			<Link to={menuItem.href}>
				<div className={styles.navbarItem}>
					<div className={styles.icon}>{menuItem.icon}</div>
					{notification && <p className='point'></p>}
					{menuItem.title}
				</div>
			</Link>
		</div>
	)
}

const NavbarItem: FC<{ menuItem: MenuItem }> = ({ menuItem }) => {
	return (
		<Link to={menuItem.href}>
			<div className={styles.navbarItemDesktop} title={menuItem.title}>
				<div className={styles.icon}>{menuItem.icon}</div>
			</div>
		</Link>
	)
}
