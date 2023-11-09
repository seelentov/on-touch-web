import cn from 'classnames'
import { CSSProperties, FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTING } from '../../../config/routing.config'
import { UserMain } from '../../../model/User/UserMain'
import { getColl } from '../../../store/api/firebase/firebase.endpoints'
import styles from './Search.module.scss'

export interface ISearchProps {
	className?: string
	style?: CSSProperties
}

export const Search: FC<ISearchProps> = ({ className, style }) => {
	const [filterInput, setFilterInput] = useState<string>('')
	const [users, setUsers] = useState<UserMain[]>()

	useEffect(() => {
		getColl('users').then((r: UserMain[]) => setUsers(r))
	}, [])

	const filtredUsers = users?.filter(
		user =>
			user.name.includes(filterInput) || user.nickname.includes(filterInput)
	)

	return (
		<div className={cn(className, styles.block)} style={style}>
			<input
				className='input-black'
				type='text'
				value={filterInput}
				onChange={e => setFilterInput(e.target.value)}
			/>
			{users && <UsersList users={filtredUsers} />}
		</div>
	)
}

export const UsersList: FC<{ users?: UserMain[] | [] }> = ({ users }) => {
	return (
		<div className={styles.list}>
			{users &&
				users.map((user: UserMain, key: number) => (
					<UserItem key={key} user={user} />
				))}
		</div>
	)
}

export const UserItem: FC<{ user: UserMain }> = ({ user }) => {
	return (
		<Link to={ROUTING.DIALOG + user.id}>
			<div className={cn(styles.item, 'item-black')}>
				<div className='img-round-70'>
					<img src={user.img} alt={user.name} />
				</div>
				<div>
					<p className='text-header'>{user.nickname}</p>
					<p className='text-desc'>{user.name}</p>
				</div>
			</div>
		</Link>
	)
}
