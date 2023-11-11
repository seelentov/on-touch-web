import { FC } from 'react'
import { UserMain } from '../../../model/User/UserMain'
import { UserItem } from './UserItem'
import styles from './UsersList.module.scss'


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
