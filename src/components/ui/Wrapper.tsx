import { FC, PropsWithChildren } from 'react'

export const Wrapper: FC<PropsWithChildren> = ({ children }) => {

	return <div className='wrapper'>{children}</div>
}
