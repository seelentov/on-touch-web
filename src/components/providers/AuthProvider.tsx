import { FC, PropsWithChildren, useEffect } from 'react'
import { useStoreBy } from '../../hooks/useStoreBy'
import { LoginPage } from '../screens/LoginPage/LoginPage'

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const user = useStoreBy('user')

	useEffect(() => {}, [user])

	return <>{user ? children : <LoginPage />}</>
}
