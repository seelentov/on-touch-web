import cn from 'classnames'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { CSSProperties, FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTING } from '../../../config/routing.config'
import { useStoreBy } from '../../../hooks/useStoreBy'
import { Dialog } from '../../../model/Messages/Dialog'
import { UserMain } from '../../../model/User/UserMain'
import { db } from '../../../store/api/firebase/firebase.api'
import { getData } from '../../../store/api/firebase/firebase.endpoints'
import { millisecToDate } from '../../../utils/date/millisecToDate'
import { LoadingBlock } from '../Loading/LoadingBlock'
import { LoadingItem } from '../Loading/LoadingItem'
import styles from './Messages.module.scss'

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

				const dialogs = result
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
					.sort((a: any, b: any) => b.lastUpd - a.lastUpd)
					
					.filter(dialog => dialog.lastMessage)
				setDialogs(dialogs)
				setLoading(false)
			}
		)

		return unsub
	}, [id])

	return (
		<>
			{loading ? (
				<LoadingBlock />
			) : dialogs.length > 0 ? (
				<div className={cn(className, styles.block)} style={style}>
					<MessagesList dialogs={dialogs} />
				</div>
			) : (
				<MessagesEmpty />
			)}
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

	const companionId = dialog.users.find(e => e !== id) || ''

	useEffect(() => {
		if (!companionId || !dialog) return
		getData<UserMain>('users', companionId)
			.then((r: UserMain) => {
				setCompanion(new UserMain(r))
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}, [dialog])

	return (
		<>
			{dialog && (
				<Link to={ROUTING.DIALOG + dialog.id}>
					<div className={cn(styles.item, 'item-black')}>
						<div className='img-round-70'>
							{companion ? (
								<img
									src={companion?.getImage()}
									alt={companion?.getNickname()}
								/>
							) : (
								<LoadingItem />
							)}
						</div>
						<div className={styles.itemInfo}>
							<div className={styles.itemInfoTop}>
								{!!dialog.new && dialog.lastSenler !== id && dialog.new > 0 && (
									<div className='item-red-round'>{dialog.new}</div>
								)}
								<p className='text-header'>{companion?.getNickname()}</p>

								<p className='text-desc'>
									{dialog?.lastUpd && millisecToDate(dialog.lastUpd.seconds)}
								</p>
							</div>

							<p className='text-desc'>
								{dialog && dialog.lastMessage ? dialog.lastMessage : ''}
							</p>
						</div>
					</div>
				</Link>
			)}
		</>
	)
}

const MessagesEmpty = () => (
	<div className='empty'>
		<p>Сообщений пока нет</p>
	</div>
)
