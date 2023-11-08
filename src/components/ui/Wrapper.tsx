import { FC, PropsWithChildren, useContext } from 'react'
import { MenuContext } from '../providers/MenuContextProvider'

export const Wrapper: FC<PropsWithChildren> = ({ children }) => {
	const { isOpen } = useContext(MenuContext)
  
	return (
		<div
			className='wrapper'
			style={{
				paddingLeft: isOpen ? '320px' : '0px',
				pointerEvents: isOpen ? 'none' : 'all',
			}}
		>
			{children}
		</div>
	)
}
