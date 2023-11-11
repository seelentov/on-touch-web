import cn from 'classnames'
import { doc, setDoc } from 'firebase/firestore'
import { CSSProperties, FC, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ROUTING } from '../../../config/routing.config'
import { useStoreBy } from '../../../hooks/useStoreBy'
import { Dialog } from '../../../model/Messages/Dialog'
import { UserMain } from '../../../model/User/UserMain'
import { db } from '../../../store/api/firebase/firebase.api'
import {
	getData,
	getSomeData,
} from '../../../store/api/firebase/firebase.endpoints'
import { generateId } from '../../../utils/data/generateId'
import { LoadingBlock } from '../../ui/Loading/LoadingBlock'
import { ProfileBio } from '../../ui/Profile/ProfileBio'
import { ProfileData } from '../../ui/Profile/ProfileData'
import styles from './Profile.module.scss'

export interface IProfileProps {
	className?: string
	style?: CSSProperties
}

export const ProfilePage: FC<IProfileProps> = ({ className, style }) => {
	const { id: pageId } = useParams()
	const { id: userId } = useStoreBy('user')

  const navigate = useNavigate()

	const [user, setUser] = useState<UserMain>()
	const [loading, setLoading] = useState<boolean>()
	const [dialogId, setDialogId] = useState<string>()

	useEffect(() => {
		if (!pageId) return
    if(userId === pageId) navigate(ROUTING.PROFILE)
		setLoading(true)
		getData<UserMain>('users', pageId)
			.then((r: UserMain) => setUser(r))
			.catch(console.log)

		getSomeData<Dialog[]>('dialog', ['users', 'array-contains', userId]).then(
			(r: Dialog[]) => {
				const filteredData = r.find(dialog => dialog.users.includes(pageId))

				if (filteredData) {
					setDialogId(filteredData.id)
				} else {
					const newDialogId = generateId()

					setDoc(doc(db, 'dialog', newDialogId), {
						id: newDialogId,
						users: [userId, pageId],
					})

					console.log(newDialogId)
					setDialogId(newDialogId)
				}
				setLoading(false)
			}
		)
	}, [])

	return (
		<>
			{!loading && user ? (
				<div className={cn(className, styles.page)} style={style}>
					<ProfileData user={user} />
					<Link to={ROUTING.DIALOG + dialogId}>
						<button className='button-black'>Войти в диалог</button>
					</Link>
					{user.bio && <ProfileBio userBio={user.bio} />}
				</div>
			) : (
				<LoadingBlock />
			)}
		</>
	)
}
