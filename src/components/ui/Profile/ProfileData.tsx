import cn from 'classnames'
import { FC, useState } from 'react'
import { BiSolidEditAlt } from 'react-icons/bi'
import { UserMain } from '../../../model/User/UserMain'
import { updateData } from '../../../store/api/firebase/firebase.endpoints'

import { STORAGE_PATH } from '../../../config/storage.config'
import { uploadImage } from '../../../utils/data/uploadImage'
import { LoadingItem } from '../Loading/LoadingItem'
import styles from './Profile.module.scss'

type EditableData = {
	[key: string]: {
		value: string
		edit: boolean
	}
}

export const ProfileData: FC<{ user: UserMain; editable?: boolean }> = ({
	user,
	editable,
}) => {
	const [editableData, setEditableData] = useState<EditableData>({
		name: {
			value: user.name,
			edit: false,
		},
		nickname: {
			value: user.nickname,
			edit: false,
		},
		birth: {
			value: user.birth,
			edit: false,
		},
	})

	return (
		<div className={styles.data}>
			{editable ? (
				<EditableImage user={user} />
			) : (
				<div className={cn(styles.img, 'item-1')}>
					<img src={user.img} alt={user.name} />
				</div>
			)}

			<div className={cn(styles.info, 'item-1')}>
				<table>
					<tbody>
						<tr>
							<td>ID</td>

							<td>{user.id}</td>
						</tr>
						<tr>
							<td>Имя</td>
							<td>
								{editable ? (
									<EditableField
										editableData={editableData}
										setEditableData={setEditableData}
										userId={user.id}
										fieldname='name'
									/>
								) : (
									<td>{user.name}</td>
								)}
							</td>
						</tr>
						<tr>
							<td>Логин</td>
							{editable ? (
								<EditableField
									editableData={editableData}
									setEditableData={setEditableData}
									userId={user.id}
									fieldname='nickname'
								/>
							) : (
								<td>{user.nickname}</td>
							)}
						</tr>
						<tr>
							<td>E-mail</td>
							<td>{user.email}</td>
						</tr>
						<tr>
							<td>Дата рождения:</td>
							<td>{user.birth}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

interface IEditableFieldProps {
	editableData: EditableData
	setEditableData: React.Dispatch<React.SetStateAction<EditableData>>
	fieldname: string
	userId: string
}

const EditableField: FC<IEditableFieldProps> = ({
	editableData,
	setEditableData,
	fieldname,
	userId,
}) => {
	const handleChange = (fieldname: string) => {
		updateData('users', userId, {
			[fieldname]: editableData[fieldname].value,
		})
		setEditableData({
			...editableData,
			[fieldname]: {
				value: editableData[fieldname].value,
				edit: false,
			},
		})
	}

	const handleClick = (fieldname: string) => {
		setEditableData({
			...editableData,
			[fieldname]: {
				value: editableData[fieldname].value,
				edit: true,
			},
		})
	}

	return (
		<td>
			{editableData[fieldname].edit ? (
				<div className={styles.editable}>
					<input
						className='input-1'
						type='text'
						name={fieldname}
						value={editableData[fieldname].value}
						onChange={e =>
							setEditableData({
								...editableData,
								[fieldname]: { value: e.target.value, edit: true },
							})
						}
						onBlur={() => handleChange(fieldname)}
					/>
					<button className='button-1' onClick={() => handleChange(fieldname)}>
						save
					</button>
				</div>
			) : (
				<>
					<p onClick={() => handleClick(fieldname)}>
						{editableData[fieldname].value}
					</p>
					<p className='text-mini'>Нажмите, что бы редактировать</p>
				</>
			)}
		</td>
	)
}

interface IEditableImageProps {
	user: UserMain
}

export const EditableImage: FC<IEditableImageProps> = ({ user }) => {
	const [image, setImage] = useState<string>(user.img)
	const [loading, setLoading] = useState<boolean>(false)

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (!event.target.files) return
		setLoading(true)
		const file = event.target.files[0]
		const imageUrl = await uploadImage(file, STORAGE_PATH.USERS)
		setImage(imageUrl)
		updateData('users', user.id, {
			img: imageUrl,
		})
		setLoading(false)
	}

	return (
		<div className={cn(styles.img, 'item-1')}>
			<div className={styles.imgEditIcon}>
				<div className='file-input-wrapper'>
					<input type='file' id='profile-image' onChange={handleFileUpload} />
					<label htmlFor='profile-image'>
						<BiSolidEditAlt />
					</label>
				</div>
			</div>
			{loading ? <LoadingItem /> : <img src={image} alt={user.name} />}
		</div>
	)
}
