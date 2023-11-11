import cn from 'classnames'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTING } from '../../../config/routing.config'
import { UserMain } from '../../../model/User/UserMain'
import { LoadingItem } from '../Loading/LoadingItem'
import styles from './UsersList.module.scss'

interface IUserItemProps {
	user?: UserMain
	className?: string
}

export const UserItem: FC<IUserItemProps> = ({ user, className }) => {
	return (
		<div className={className}>
			<Link to={user ? ROUTING.PROFILE + user.id : ''}>
				<div className={cn(styles.item, 'item-black')}>
					<div className='img-round-70'>
						{user ? <img src={user.img} alt={user.name} /> : <LoadingItem />}
					</div>
					<div>
						{user && (
							<>
								<p className='text-header'>{user.nickname}</p>
								<p className='text-desc'>{user.name}</p>
							</>
						)}
					</div>
				</div>
			</Link>
		</div>
	)
}
