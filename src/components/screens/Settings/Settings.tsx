import cn from 'classnames'
import { CSSProperties, FC, useContext } from 'react'
import Switch from 'react-switch'
import { uploadLocalStorage } from '../../../utils/localStorage/uploadLocalStorage'
import { ISettings, SettingsContext } from '../../providers/SettingsProvider'
import styles from './Settings.module.scss'

export interface ISettingsProps {
	className?: string
	style?: CSSProperties
}

export const Settings: FC<ISettingsProps> = ({ className, style }) => {
	const { settings, setSettings } = useContext(SettingsContext)

	const handleChange = (newState: ISettings) => {
		uploadLocalStorage('settings', newState)
		setSettings(newState)
	}

	return (
		<div className={cn(className, styles.page)} style={style}>
			<h2>Тема</h2>
			<div className={styles.theme}>
				<p
					onClick={() => handleChange({ ...settings, theme: 'white' })}
					className={settings.theme === 'white' ? styles.active : ''}
				>
					Светлая
				</p>
				<p
					onClick={() => handleChange({ ...settings, theme: 'black' })}
					className={settings.theme === 'black' ? styles.active : ''}
				>
					Темная
				</p>
			</div>

			<h2>Уведомления</h2>
			<div className={styles.row}>
				<p>Звуковые уведомления</p>{' '}
				<Switch
					onChange={() =>
						handleChange({ ...settings, soundNotif: !settings.soundNotif })
					}
					checked={settings.soundNotif}
				/>
			</div>
			<div className={styles.row}>
				<p>Push-уведомления на странице </p>
				<Switch
					onChange={() =>
						handleChange({ ...settings, inPageNotif: !settings.inPageNotif })
					}
					checked={settings.inPageNotif}
				/>
			</div>
			<div className={styles.row}>
				<p>Push-уведомления в браузере</p>{' '}
				<Switch
					onChange={() =>
						handleChange({
							...settings,
							inWindowNotif: !settings.inWindowNotif,
						})
					}
					checked={settings.inWindowNotif}
				/>
			</div>
		</div>
	)
}
