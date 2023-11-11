import { FC, PropsWithChildren, createContext, useEffect, useState } from 'react'
import { useResize } from '../../hooks/useResize'

interface IMenuContext {
	isOpen: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MenuContext = createContext<IMenuContext>({} as IMenuContext)

export const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isOpen, setOpen] = useState<boolean>(false)
  const isDesktop = useResize().isScreenLg
  useEffect(() => {
    setOpen(isDesktop)
  }, [isDesktop])

	return (
		<MenuContext.Provider value={{ isOpen, setOpen }}>
			{children}
		</MenuContext.Provider>
	)
}
