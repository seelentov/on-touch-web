import {
	FC,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useEffect,
	useState,
} from 'react'

export type ISettings = {
	theme: 'black' | 'white'
	soundNotif: boolean
	inWindowNotif: boolean
	inPageNotif: boolean
}

export interface ISettingsState {
	settings: ISettings
	setSettings: React.Dispatch<SetStateAction<ISettings>>
}

export const SettingsContext = createContext<ISettingsState>(
	{} as ISettingsState
)

export const SettingsProvider: FC<PropsWithChildren> = ({ children }) => {

	const [settings, setSettings] = useState<ISettings>({
		theme: 'black',
		soundNotif: true,
		inPageNotif: true,
		inWindowNotif: false,
	})

  useEffect(() => {
    if(localStorage.getItem('settings')){
      setSettings(JSON.parse(localStorage.getItem('settings')))
    }
  
  }, [])

	return (
		<SettingsContext.Provider value={{ settings, setSettings }}>
			<div className={`theme-${settings.theme}`}>{children}</div>
		</SettingsContext.Provider>
	)
}
