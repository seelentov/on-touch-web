import cn from 'classnames'
import Hamburger from 'hamburger-react'
import { CSSProperties, FC, ReactNode, useContext } from 'react'
import { Link } from 'react-router-dom'
import { MenuItem } from '../../../config/menu.config'
import { useResize } from '../../../hooks/useResize'
import { MenuContext } from '../../providers/MenuContextProvider'
import styles from './Header.module.scss'

export interface IHeaderProps {
	className?: string
	style?: CSSProperties
	logo?: ReactNode
	menu?: MenuItem[]
}

export const Header: FC<IHeaderProps> = ({ className, style, logo, menu }) => {
	const { isOpen, setOpen } = useContext(MenuContext)

	return (
		<div className={cn(className, styles.main)} style={style}>
			<div className={styles.top}>
				<div className={styles.logo}>{logo}</div>
				<div className={styles.burgerBtn} onClick={() => setOpen(!isOpen)}>
					<Hamburger />
				</div>
			</div>
			<Navbar menu={menu && menu} isOpen={isOpen} />
		</div>
	)
}

const Navbar: FC<{
	menu?: MenuItem[]
	isOpen: boolean
}> = ({ menu, isOpen }) => {
	return (
		<div className={cn(styles.navbar, isOpen && styles.active)}>
			{useResize().isScreenLg ? (
				<div className={styles.navbarItemsDesktop}>
					{menu?.map((menuItem: MenuItem, key: number) => (
						<NavbarItem key={key} menuItem={menuItem} />
					))}
				</div>
			) : (
				<div className={styles.navbarItems}>
					{menu?.map((menuItem: MenuItem, key: number) => (
						<NavbarItemMobile key={key} menuItem={menuItem} />
					))}
				</div>
			)}
		</div>
	)
}

const NavbarItemMobile: FC<{ menuItem: MenuItem }> = ({ menuItem }) => {
	return (
		<Link to={menuItem.href}>
			<div className={styles.navbarItem}>
				<div className={styles.icon}>{menuItem.icon}</div>
				{menuItem.title}
			</div>
		</Link>
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
