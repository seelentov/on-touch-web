import { collection, onSnapshot, query, where } from 'firebase/firestore'
import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useStoreBy } from '../../hooks/useStoreBy'
import { Dialog } from '../../model/Messages/Dialog'
import { UserMain } from '../../model/User/UserMain'
import { db } from '../../store/api/firebase/firebase.api'
import { getData } from '../../store/api/firebase/firebase.endpoints'
import { soundNotification } from '../../utils/notifications/soundNotification'
import { ROUTING } from '../../config/routing.config'

interface INotificationContext {
	count: number
	setCount: React.Dispatch<React.SetStateAction<number>>
}

export const NotificationContext = createContext<INotificationContext>(
	{} as INotificationContext
)

export type Notification = {
	header: string
	text: string
	href: string
}

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
	const [count, setCount] = useState<number>(0)
	const [notification, setNotification] = useState<Notification | null>(null)

	const { id } = useStoreBy('user')
	useEffect(() => {
		const unsub = onSnapshot(
			query(collection(db, 'dialog'), where('users', 'array-contains', id)),
			querySnapshot => {
				const result: Dialog[] = []
				querySnapshot.forEach(doc => {
					result.push(doc.data() as Dialog)
				})
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const newDialogs = result.filter(dialog => dialog.new && dialog.new > 0)
				const sortNewDialogs = newDialogs.sort((a, b) => b.lastUpd - a.lastUpd)
				const lastNewDialog = sortNewDialogs[0]
				const myNewDialogs = newDialogs.filter(
					dialog => dialog?.lastSenler && dialog.lastSenler !== id
				)

				setCount(myNewDialogs.length)

				if (lastNewDialog.lastSenler !== id) {
					soundNotification()
					getData<UserMain>('users', lastNewDialog.lastSenler).then(
						(r: UserMain) => {
							setNotification({
								header: r.nickname,
								text: lastNewDialog.lastMessage,
								href: lastNewDialog.id,
							})
							setTimeout(() => {
								setNotification(null)
							}, 5000)
						}
					)
				}
			}
		)

		return unsub
	}, [])

	return (
		<NotificationContext.Provider value={{ count, setCount }}>
			{children}
			{notification && (
				<NotificationItem
					notification={notification}
					setNotification={setNotification}
				/>
			)}
		</NotificationContext.Provider>
	)
}

export const NotificationItem: FC<{
	notification: Notification
	setNotification: React.Dispatch<React.SetStateAction<Notification | null>>
}> = ({ notification, setNotification }) => {
	const navigate = useNavigate()

	const handleClose = () => {
    setNotification(null)
		navigate(ROUTING.DIALOG + notification.href)
	}

	return (
		<div className='notification notification-black' onClick={()=>handleClose()}>
			<p className='text-header'>{notification.header}</p>
			<p className='text-desc'>{notification.text}</p>
		</div>
	)
}
