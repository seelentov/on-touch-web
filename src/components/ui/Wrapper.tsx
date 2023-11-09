import { FC, PropsWithChildren, useContext } from 'react'
import { MenuContext } from '../providers/MenuProvider'

export const Wrapper: FC<PropsWithChildren> = ({ children }) => {
	const { isOpen } = useContext(MenuContext)

	return (
		<div
			className='wrapper'
			style={{
				paddingLeft: isOpen ? '320px' : '0px'
			}}
		>
			{children}
		</div>
	)
}
