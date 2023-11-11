import cn from 'classnames'
import { FC, useState } from 'react'
import { updateData } from '../../../store/api/firebase/firebase.endpoints'
import styles from './Profile.module.scss'

export const ProfileBio: FC<{
	userBio: string
	userId?: string
	editable?: boolean
}> = ({ userBio, userId, editable }) => {
	const [input, setInput] = useState<string>(userBio)
	const [edit, setEdit] = useState<boolean>(false)

	const handleChange = () => {
		if (!userId) return
		updateData('users', userId, {
			bio: input,
		})
		setEdit(false)
	}

	return (
		<div className={cn(styles.bio, 'item-black')}>
			{editable ? (
				edit ? (
					<div className={styles.editableBio}>
						<textarea
							className='input-black'
							name={'bio'}
							value={input}
							onChange={e => setInput(e.target.value)}
							onBlur={() => handleChange()}
						/>
						<button className='button-black' onClick={() => handleChange()}>
							save
						</button>
					</div>
				) : (
					<p onClick={() => setEdit(!edit)}>{input}</p>
				)
			) : (
				input
			)}
		</div>
	)
}
