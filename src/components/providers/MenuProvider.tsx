import { FC, PropsWithChildren, createContext, useState } from 'react'

interface IMenuContext {
	isOpen: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MenuContext = createContext<IMenuContext>()

export const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isOpen, setOpen] = useState<boolean>(false)

	return (
		<MenuContext.Provider value={{ isOpen, setOpen }}>
			{children}
		</MenuContext.Provider>
	)
}
