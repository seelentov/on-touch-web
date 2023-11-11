import cn from 'classnames'
import { CSSProperties, FC, useEffect, useState } from 'react'
import { useActions } from '../../../hooks/useActions'
import { useStoreBy } from '../../../hooks/useStoreBy'
import { UserMain } from '../../../model/User/UserMain'
import { getData } from '../../../store/api/firebase/firebase.endpoints'
import { LoadingBlock } from '../../ui/Loading/LoadingBlock'
import { ProfileBio } from '../../ui/Profile/ProfileBio'
import { ProfileData } from '../../ui/Profile/ProfileData'
import styles from './Account.module.scss'

export interface IAccountProps {
	className?: string
	style?: CSSProperties
}

export const Account: FC<IAccountProps> = ({ className, style }) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [user, setUser] = useState<UserMain>()

	const { logout } = useActions()

	const { id: userId } = useStoreBy('user')
	useEffect(() => {
		setLoading(true)
		getData<UserMain>('users', userId)
			.then((r: UserMain) => setUser(r))
			.then(() => setLoading(false))
			.catch(console.log)
	}, [])

	return (
		<>
			{!loading && user ? (
				<div className={cn(className, styles.page)} style={style}>
					<ProfileData user={user} editable />
					<button onClick={() => logout()} className='button-red'>
						Выйти из аккаунта
					</button>
					<ProfileBio userBio={user?.bio} editable userId={user.id} />
				</div>
			) : (
				<LoadingBlock />
			)}
		</>
	)
}
