import { onSnapshot, query, collection, where } from 'firebase/firestore'
import { CSSProperties, FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStoreBy } from '../../../hooks/useStoreBy'
import { Dialog } from '../../../model/Messages/Dialog'
import { Message } from '../../../model/Messages/Message'
import { UserMain } from '../../../model/User/UserMain'
import { db } from '../../../store/api/firebase/firebase.api'
import { getData } from '../../../store/api/firebase/firebase.endpoints'
import { millisecToDate } from '../../../utils/date/millisecToDate'
import { LoadingBlock } from '../Loading/LoadingBlock'
import cn from 'classnames';
import styles from './Messages.module.scss'
import { ROUTING } from '../../../config/routing.config'

export interface IMessagesProps {
	className?: string
	style?: CSSProperties
}

export const Messages: FC<IMessagesProps> = ({ className, style }) => {
	const { id } = useStoreBy('user')

	const [dialogs, setDialogs] = useState<Dialog[] | []>([])
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		setLoading(true)
		const unsub = onSnapshot(
			query(collection(db, 'dialog'), where('users', 'array-contains', id)),
			querySnapshot => {
				const result: Dialog[] = []
				querySnapshot.forEach(doc => {
					result.push(doc.data() as Dialog)
				})
				setDialogs(result.sort((a, b) => b.lastUpd - a.lastUpd))
				setLoading(false)
			}
		)

		return unsub
	}, [id])

	return (
		<>
			{loading ? (
				<LoadingBlock />
			) : dialogs.length > 0 ?(
				<div className={cn(className, styles.block)} style={style}>
					<MessagesList dialogs={dialogs} />
				</div>
			): <MessagesEmpty/>}
		</>
	)
}

export interface IMessagesListProps {
	className?: string
	style?: CSSProperties
	dialogs: Dialog[]
}

export const MessagesList: FC<IMessagesListProps> = ({
	className,
	style,
	dialogs,
}) => {
	return (
		<div className={cn(className, styles.list)} style={style}>
			{dialogs ? (
				dialogs.map((dialog: Dialog, key: number) => (
					<MessagesItem dialog={dialog} key={key} />
				))
			) : (
				<p>Сообщения не найдены</p>
			)}
		</div>
	)
}

const MessagesItem: FC<{ dialog: Dialog }> = ({ dialog }) => {
	const { id } = useStoreBy('user')

	const [companion, setCompanion] = useState<UserMain>()
	const [message, setMessage] = useState<Message>()

	const companionId = dialog.users.find(e => e !== id) || ''

	useEffect(() => {
		if (!companionId || !dialog) return
		getData('users', companionId)
			.then((r: UserMain) => {
				setCompanion(new UserMain(r))
			})
			.catch((e: Error) => {
				console.log(e)
			})

		getData('messages', dialog.lastMessage)
			.then((r: Message) => {
				setMessage(r)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}, [dialog])

	return (
		<Link to={ROUTING.DIALOG + dialog.id}>
			<div className={cn(styles.item, 'item-black')}>
				<div className='img-round-70' >
					<img src={companion?.getImage()} alt={companion?.getNickname()} />
				</div>
				<div className={styles.itemInfo}>
					<div className={styles.itemInfoTop}>
						<p className='text-header'>{companion?.getNickname()}</p>
						<p className='text-desc'>
							{message && millisecToDate(message.createAt)}
						</p>
						<p></p>
					</div>

					<p className='text-desc'>{message?.text}</p>
				</div>
			</div>
		</Link>
	)
}


const MessagesEmpty = () => <div className={styles.empty}><p>Сообщений пока нет</p></div>