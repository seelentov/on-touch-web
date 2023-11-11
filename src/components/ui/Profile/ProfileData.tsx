import cn from 'classnames'
import { FC, useState } from 'react'
import { BiSolidEditAlt } from 'react-icons/bi'
import { UserMain } from '../../../model/User/UserMain'
import { updateData } from '../../../store/api/firebase/firebase.endpoints'

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
				<div className={cn(styles.img, 'item-black')}>
					<img src={user.img} alt={user.name} />
				</div>
			)}

			<div className={cn(styles.info, 'item-black')}>
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
						className='input-black'
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
					<button
						className='button-black'
						onClick={() => handleChange(fieldname)}
					>
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
	const [edit, setEdit] = useState<boolean>(false)

	return (
		<div
			className={cn(styles.img, 'item-black')}
		>
			{edit ? (
				<div className={styles.imgEditIcon}>
					<BiSolidEditAlt />
				</div>
			) : (
				<div className={styles.imgEditIcon} onClick={() => setEdit(true)}>
					<BiSolidEditAlt />
				</div>
			)}
			<img src={user.img} alt={user.name} />
		</div>
	)
}
