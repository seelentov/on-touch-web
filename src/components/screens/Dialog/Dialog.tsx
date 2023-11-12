import cn from 'classnames'
import {
	collection,
	increment,
	onSnapshot,
	query,
	serverTimestamp,
	where,
} from 'firebase/firestore'
import {
	CSSProperties,
	FC,
	FormEvent,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import { BiImageAlt, BiSmile } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import { STORAGE_PATH } from '../../../config/storage.config'
import { EMOJI } from '../../../consts/EMOJIES'
import { useStoreBy } from '../../../hooks/useStoreBy'
import { Dialog } from '../../../model/Messages/Dialog'
import { Message } from '../../../model/Messages/Message'
import { UserMain } from '../../../model/User/UserMain'
import { db } from '../../../store/api/firebase/firebase.api'
import {
	addToData,
	getData,
	updateData,
} from '../../../store/api/firebase/firebase.endpoints'
import { generateId } from '../../../utils/data/generateId'
import { uploadImage } from '../../../utils/data/uploadImage'
import { millisecToDate } from '../../../utils/date/millisecToDate'
import { MenuContext } from '../../providers/MenuProvider'
import { LoadingBlock } from '../../ui/Loading/LoadingBlock'
import { UserItem } from '../../ui/UsersList/UserItem'
import styles from './Dialog.module.scss'

export interface IDialogProps {
	className?: string
	style?: CSSProperties
}

export const DialogPage: FC<IDialogProps> = ({ className, style }) => {
	const { id: pageId } = useParams()
	const { id: userId } = useStoreBy('user')

	const [dialog, setDialog] = useState<Dialog>()
	const [messages, setMessages] = useState<Message[]>()
	const [loading, setLoading] = useState<boolean>(true)
	useEffect(() => {
		if (!pageId) return
		setLoading(true)
		getData<Dialog>('dialog', pageId)
			.then((r: Dialog) => {
				setDialog(r)
			})
			.catch(e => {
				console.log(e)
			})

		const unsub = onSnapshot(
			query(collection(db, 'messages'), where('dialogId', '==', pageId)),
			querySnapshot => {
				const result: Message[] = []
				querySnapshot.forEach(doc => {
					result.push(doc.data() as Message)
				})

				const sortedResult = result.sort((a, b) => a.createAt - b.createAt)

				setMessages(sortedResult)

				const lastMessage = sortedResult[sortedResult.length - 1]
				if (lastMessage && lastMessage.user !== userId) {
					updateData('dialog', pageId, {
						new: 0,
					})
				}

				setLoading(false)
			}
		)

		return unsub
	}, [pageId])

	return (
		<div className={cn(className, styles.block)} style={style}>
			<DialogCompanion
				companionId={dialog?.users.find(user => user !== userId)}
			/>
			{!loading && messages ? (
				<DialogList messages={messages} />
			) : (
				<LoadingBlock />
			)}
			<DialogSendInput dialogId={pageId} />
		</div>
	)
}

const DialogCompanion: FC<{ companionId?: string }> = ({ companionId }) => {
	const [companion, setCompanion] = useState<UserMain>()

	useEffect(() => {
		if (!companionId) return
		getData<UserMain>('users', companionId).then((r: UserMain) =>
			setCompanion(r)
		)
	}, [companionId])

	return (
		<>
			<UserItem user={companion && companion} className={styles.companion} />
		</>
	)
}

const DialogSendInput: FC<{ dialogId?: string }> = ({ dialogId }) => {
	const { isOpen } = useContext(MenuContext)
	const { id: user } = useStoreBy('user')

	const [input, setInput] = useState<string>('')
	const [isEmojiOpen, setEmojiOpen] = useState<boolean>(false)

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		if (!input || !dialogId) return

		const messageId = generateId()
		const message: Message = new Message({
			id: messageId,
			dialogId: dialogId,
			text: input,
			createAt: serverTimestamp(),
			user: user,
		})

		await getData<Dialog>('dialog', dialogId).then((r: Dialog) => {
			if (user !== r.lastSenler) {
				updateData('dialog', dialogId, {
					new: 0,
				})
			}
		})

		setInput('')
		await addToData('messages', messageId, message)
		await updateData('dialog', dialogId, {
			lastSenler: user,
			lastUpd: serverTimestamp(),
			lastMessage: input,
			new: increment(1),
		})
	}

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (!event.target.files) return
		const file = event.target.files[0]
		const imageUrl = await uploadImage(file, STORAGE_PATH.MESSAGES)

		if (!dialogId) return

		const messageId = generateId()

		const message: Message = new Message({
			id: messageId,
			dialogId: dialogId,
			text: imageUrl,
			createAt: serverTimestamp(),
			user: user,
			type: 'img',
		})

		await addToData('messages', messageId, message)
		await updateData('dialog', dialogId, {
			lastSenler: user,
			lastUpd: serverTimestamp(),
			lastMessage: 'Изображение',
			new: increment(1),
		})
	}

	return (
		<form
			onSubmit={e => handleSubmit(e)}
			style={{ paddingRight: isOpen ? '320px' : '0' }}
			className={styles.input}
		>
			<input
				type='text'
				className='input-1'
				value={input}
				onChange={e => setInput(e.target.value)}
			/>
			<div
				className={cn('button-1', styles.emojiBtn)}
				style={{ background: isEmojiOpen ? 'rgb(56, 126, 255)' : '' }}
				onClick={() => setEmojiOpen(!isEmojiOpen)}
			>
				<BiSmile />
			</div>
			<div className='file-input-2'>
				<input type='file' id='message-img' onChange={handleFileUpload} />
				<label htmlFor='message-img' className='button-1'>
					<BiImageAlt />
				</label>
			</div>
			{isEmojiOpen && (
				<EmojiList emojiList={EMOJI} state={input} setState={setInput} />
			)}
			<button className='button-1'>{'SND'}</button>
		</form>
	)
}

interface IEmojiListProps {
	state: string
	setState: React.Dispatch<React.SetStateAction<string>>
	emojiList: string[]
}

export const EmojiList: FC<IEmojiListProps> = ({
	state,
	setState,
	emojiList,
}) => {
	const { isOpen } = useContext(MenuContext)

	const EmojiItem: FC<{ emoji: string }> = ({ emoji }) => (
		<div
			className={cn(styles.emojiItem, 'item-1')}
			onClick={() => setState(state + emoji)}
		>
			{emoji}
		</div>
	)

	return (
		<div
			className={cn(styles.emojies, 'item-1')}
			style={{ paddingRight: isOpen ? '320px' : '0px' }}
		>
			{emojiList.map((emoji, key) => (
				<EmojiItem key={key} emoji={emoji} />
			))}
		</div>
	)
}

export const DialogList: FC<{ messages: Message[] }> = ({ messages }) => {
	const { id } = useStoreBy('user')

	const listRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		listRef.current?.scrollIntoView({
			block: 'end',
		})
	}, [messages])

	return (
		<div className={styles.list} ref={listRef}>
			{messages ? (
				messages.map((message: Message, key: number) => {
					if (message.type === 'img') {
						return (
							<DialogItemImg
								key={key}
								message={message}
								className={
									message.user === id
										? cn(styles.userItem, 'item-1')
										: cn(styles.compItem, 'item-2')
								}
							/>
						)
					}

					return (
						<DialogItem
							key={key}
							message={message}
							className={
								message.user === id
									? cn(styles.userItem, 'item-1')
									: cn(styles.compItem, 'item-2')
							}
						/>
					)
				})
			) : (
				<p style={{ textAlign: 'center' }}>Сообщений пока нет!</p>
			)}
		</div>
	)
}

interface IDialogItemProps {
	message: Message
	className: string
}

const DialogItem: FC<IDialogItemProps> = ({ message, className }) => {
	return (
		<div className={cn(className, styles.item)}>
			<p>{message.text}</p>
			<p>
				{message?.createAt ? millisecToDate(message.createAt.seconds) : <br />}
			</p>
		</div>
	)
}

const DialogItemImg: FC<IDialogItemProps> = ({ message, className }) => {
	return (
		<div className={cn(className, styles.item)}>
			<img src={message.text} />
			<p>
				{message?.createAt ? millisecToDate(message.createAt.seconds) : <br />}
			</p>
		</div>
	)
}
