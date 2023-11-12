import { CSSProperties, FC, useEffect, useState } from 'react'
import { UserMain } from '../../../model/User/UserMain'
import { getColl } from '../../../store/api/firebase/firebase.endpoints'
import { LoadingBlock } from '../../ui/Loading/LoadingBlock'
import { UsersList } from '../../ui/UsersList/UsersList'

export interface ISearchProps {
	className?: string
	style?: CSSProperties
}

export const Search: FC<ISearchProps> = ({ className, style }) => {
	const [filterInput, setFilterInput] = useState<string>('')
	const [users, setUsers] = useState<UserMain[]>()
	const [loading, setLoading] = useState<boolean>()
	useEffect(() => {
		setLoading(true)
		getColl<UserMain>('users')
			.then((r: UserMain[]) => setUsers(r))
			.then(() => setLoading(false))
			.catch(console.log)
	}, [])

	const filtredUsers = users?.filter(
		user =>
			user.name?.includes(filterInput) || user.nickname?.includes(filterInput)
	)

	return (
		<>
			{loading ? (
				<LoadingBlock />
			) : (
				<div className={className} style={style}>
					<input
						className='input-1'
						type='text'
						value={filterInput}
						onChange={e => setFilterInput(e.target.value)}
					/>
					{users && <UsersList users={filtredUsers} />}
				</div>
			)}
		</>
	)
}
