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
import { useParams } from 'react-router-dom'
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
import { millisecToDate } from '../../../utils/date/millisecToDate'
import { MenuContext } from '../../providers/MenuProvider'
import { Form, FormValues } from '../../ui/Form/Form'
import { FormButton } from '../../ui/Form/FormButton'
import { FormInput } from '../../ui/Form/FormInput'
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

				const messages = result.sort(
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					(a: any, b: any) => a.createAt - b.createAt
				)
				const lastMessage = messages[messages.length - 1]
				setMessages(messages)

        
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
	const [input, setInput] = useState({
		message: '',
	})

	const { isOpen } = useContext(MenuContext)
	const { id: user } = useStoreBy('user')

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		if (!input.message || !dialogId) return

		const messageId = generateId()
		const message: Message = new Message({
			id: messageId,
			dialogId: dialogId,
			text: input.message,
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

		setInput({
			message: '',
		})
		await addToData('messages', messageId, message)
		await updateData('dialog', dialogId, {
			lastSenler: user,
			lastUpd: serverTimestamp(),
			lastMessage: input.message,
			new: increment(1),
		})
	}

	return (
		<Form
			values={input}
			setValues={setInput as React.Dispatch<React.SetStateAction<FormValues>>}
			className={styles.input}
			handleSubmit={handleSubmit}
			style={{ paddingRight: isOpen ? '320px' : '0' }}
		>
			<FormInput
				name='message'
				className='input-black'
				wrapperClassName='form__input'
			/>
			<FormButton
				className='button-black'
				disable={!input.message}
				wrapperClassName='form__button'
			>
				{'>'}
			</FormButton>
		</Form>
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
			{messages &&
				messages.map((message: Message, key: number) => (
					<DialogItem
						key={key}
						message={message}
						className={
							message.user === id
								? cn(styles.userItem, 'item-black')
								: cn(styles.compItem, 'item-white')
						}
					/>
				))}
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
