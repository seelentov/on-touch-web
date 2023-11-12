import {
	FC,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useState,
} from 'react'

type ISettings = {
	theme: 'black' | 'white'
	soundNotif: boolean
	inWindowNotif: boolean
	inPageNotif: boolean
}

interface ISettingsState {
	settings: ISettings
	SetSettings: React.Dispatch<SetStateAction<ISettings>>
}

export const SettingsContext = createContext<ISettingsState>({} as ISettingsState)

export const SettingsProvider: FC<PropsWithChildren> = ({ children }) => {
	const [settings, SetSettings] = useState<ISettings>({
		theme: 'black',
		soundNotif: true,
		inPageNotif: true,
		inWindowNotif: false,
	})

	return (
		<SettingsContext.Provider value={{ settings, SetSettings }}>
			<div className={`theme-${settings.theme}`}>{children}</div>
		</SettingsContext.Provider>
	)
}
